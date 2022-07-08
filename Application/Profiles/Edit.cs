using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Profiles
{
  public class Edit
  {
    public class Command : IRequest<Result<Unit>>
    {
      public Profile Profile { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(x => x.Profile).SetValidator(new ProfileValidator());
      }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly IUserAccessor _userAccessor;
      private readonly UserManager<AppUser> _userManager;
      public Handler(DataContext context, UserManager<AppUser> userManager, IUserAccessor userAccessor)
      {
        _userManager = userManager;
        _userAccessor = userAccessor;
      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var user = _userManager.Users.FirstOrDefault(f => f.UserName == _userAccessor.GetUsername());

        if (user == null) return null;

        user.Bio = request.Profile.Bio;
        user.DisplayName = request.Profile.DisplayName;

        var result = await _userManager.UpdateAsync(user);

        if (result.Succeeded) return Result<Unit>.Success(Unit.Value);

        return Result<Unit>.Failure("Failed to oupdate Profile");
      }
    }
  }
}