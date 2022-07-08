using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Followers;

namespace API.Controllers
{
  public class FollowController : BaseAPIController
  {
    [HttpPost("{username}")]
    public async Task<IActionResult> Follow(string userName)
    {
      return HandleResult(await Mediator.Send(new FollowToggle.Command { TargetUsername = userName }));
    }
    [HttpGet("{username}")]
    public async Task<IActionResult> GetFollowings(string username, string predicate)
    {
      return HandleResult(await Mediator.Send(new List.Query { Username = username, Predicate = predicate }));
    }

  }
}