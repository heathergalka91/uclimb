using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Profiles;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
  public class List
  {
    public class Query : IRequest<Result<List<Profiles.ProfileDto>>>
    {
      public string Predicate { get; set; }
      public string Username { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<Profiles.ProfileDto>>>
    {
      private readonly IMapper _mapper;
      private readonly DataContext _dataContext;
      private readonly IUserAccessor _userAccessor;
      public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;
        _dataContext = dataContext;
        _mapper = mapper;
      }

      public async Task<Result<List<Profiles.ProfileDto>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var profiles = new List<Profiles.ProfileDto>();

        switch (request.Predicate)
        {
          case "followers":
            profiles = await _dataContext.UserFollowings.Where(x => x.Target.UserName == request.Username)
            .Select(u => u.Observer)
            .ProjectTo<Profiles.ProfileDto>(_mapper.ConfigurationProvider, new {username = _userAccessor.GetUsername()})
            .ToListAsync();
            break;
          case "following":
            profiles = await _dataContext.UserFollowings.Where(x => x.Observer.UserName == request.Username)
            .Select(u => u.Target)
            .ProjectTo<Profiles.ProfileDto>(_mapper.ConfigurationProvider, new {username = _userAccessor.GetUsername()})
            .ToListAsync();
            break;
        }
        return Result<List<Profiles.ProfileDto>>.Success(profiles);
      }
    }
  }
}