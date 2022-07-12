using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
  public class ListActivities
  {
    public class Query : IRequest<Result<PagedList<UserActivityDto>>>
    {
      public string Username { get; set; }
      public ActivityParams Params { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PagedList<UserActivityDto>>>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;
      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;
        _context = context;
      }

      public async Task<Result<PagedList<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var query = _context
            .Activities
            .Where(x => x.Attendees.Any(x => x.AppUser.UserName == request.Username))
            .OrderBy(x => x.Date)
            .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider, new { username = request.Username })
            .AsQueryable();

        if (request.Params.IsPast)
        {
          query = query.Where(x => x.Date < DateTime.UtcNow);
        }
        if (request.Params.IsFuture)
        {
          query = query.Where(x => x.Date > DateTime.UtcNow);
        }
        if (request.Params.IsHost)
        {
          query = query.Where(x => x.HostUsername == request.Username);
        }

        return Result<PagedList<UserActivityDto>>.Success(
            await PagedList<UserActivityDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
        );
      }
    }
  }
}