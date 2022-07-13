using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentEmail.Mailgun;
using FluentEmail;
using Microsoft.Extensions.Configuration;
using FluentEmail.Core;

namespace Infrastructure.Email
{
  public class EmailSender
  {
    private readonly IConfiguration _config;
    public EmailSender(IConfiguration config)
    {
      _config = config;

    }

    public async Task SendEmailAsync(string userEmail, string emailSubject, string msg)
    {
      var sender = new MailgunSender(
        _config["MailGun:Domain"], // Mailgun Domain
        _config["MailGun:ApiKey"] // Mailgun API Key
      );

      var email = FluentEmail.Core.Email
        .From(_config["MailGun:Sender"])
        .To(userEmail)
        .Subject(emailSubject)
        .Body(msg, true);

      email.Sender = sender;

      await email.SendAsync();
    }
  }
}