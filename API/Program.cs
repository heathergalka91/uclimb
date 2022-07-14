using Application.Activities;

var builder = WebApplication.CreateBuilder(args);

//add Services to container
builder.Services.AddControllers(opt =>
{
  var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
  opt.Filters.Add(new AuthorizeFilter(policy));
})
.AddFluentValidation(config =>
{
  config.RegisterValidatorsFromAssemblyContaining<Create>();
});

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

//configure the http request pipeline
var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();

app.UseXContentTypeOptions();
app.UseReferrerPolicy(opt => opt.NoReferrer());
app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
app.UseXfo(opt => opt.Deny());
app.UseCsp(opt => opt
  .BlockAllMixedContent()
  .StyleSources(s => s.Self().CustomSources(
    "https://fonts.googleapis.com",
    "https://cdn.jsdelivr.net",
    "https://www.facebook.com",
    "sha256-yChqzBduCCi4o4xdbXRXh4U/t1rP4UUUMJt+rB+ylUI=",
    "sha256-yR2gSI6BIICdRRE2IbNP1SJXeA5NYPbaM32i/Y8eS9o="))
  .FontSources(s => s.Self().CustomSources(
    "https://fonts.gstatic.com",
    "https://cdn.jsdelivr.net",
    "data:"))
  .FormActions(s => s.Self())
  .FrameAncestors(s => s.Self())
  .ImageSources(s => s.Self().CustomSources(
    "https://res.cloudinary.com",
    "https://www.facebook.com",
    "data:",
    "https://platform-lookaside.fbsbx.com"))
  .ScriptSources(s => s.Self().CustomSources(
    "sha256-c3WD0pwpDoMzew+bMDkFm4XwgR2Y8Rd23PL2PuWBfTw=",
    "https://connect.facebook.net",
    "sha256-yChqzBduCCi4o4xdbXRXh4U/t1rP4UUUMJt+rB+ylUI=",
    "sha256-xQtx8YdB8MoaP9vd8kwuk8DZHppMQlDmVG1C/bgas4k="))
);

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
}
else
{
  app.Use(async (context, next) =>
  {
    context.Response.Headers.Add("Strict-Transport-Security", "max-age=31566000");
    await next.Invoke();
  });
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();
app.MapHub<ChatHub>("/chat");
app.MapFallbackToController("Index", "Fallback");


using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;

try
{
  var context = services.GetRequiredService<DataContext>();
  var userManager = services.GetRequiredService<UserManager<AppUser>>();
  context.Database.Migrate();
  await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
  var logger = services.GetRequiredService<ILogger<Program>>();
  logger.LogError(ex, "An error occured during migration");
}

await app.RunAsync();