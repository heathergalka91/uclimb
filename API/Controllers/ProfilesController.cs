using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ProfilesController : BaseAPIController
  {
    [HttpGet("{username}")]
    public async Task<IActionResult> GetProfile(string username)
    {
      return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
    }

    [HttpPost("{username}")]
    public async Task<IActionResult> EditProfile(ProfileDto profile)
    {
      return HandleResult(await Mediator.Send(new Edit.Command { Profile = profile }));
    }

    [HttpGet("{username}/activities")]
    public async Task<IActionResult> GetActivities([FromQuery] ActivityParams param, string username)
    {
      return HandleResult(await Mediator.Send(new ListActivities.Query { Params = param, Username= username}));
    }
  }
}