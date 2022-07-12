using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Comments;
using Application.Profiles;
using AutoMapper;
using Domain;

namespace Application.Core
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
      string username = null;
      CreateMap<Activity, Activity>();
      CreateMap<Activity, ActivityDto>()
          .ForMember(d => d.HostUsername, o => o.MapFrom(u => u.Attendees
            .FirstOrDefault(x => x.IsHost).AppUser.UserName));

      CreateMap<ActivityAttendee, AttendeeDto>()
        .ForMember(d => d.DisplayName, o => o
          .MapFrom(s => s.AppUser.DisplayName))
        .ForMember(d => d.Username, o => o
          .MapFrom(s => s.AppUser.UserName))
        .ForMember(d => d.Bio, o => o
          .MapFrom(s => s.AppUser.Bio))
        .ForMember(a => a.Image, o => o
          .MapFrom(s => s.AppUser.Photos
            .FirstOrDefault(x => x.IsMain).Url))
                .ForMember(a => a.FollowersCount, o => o.MapFrom(s => s.AppUser.Followers.Count))
        .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.AppUser.Followings.Count))
        .ForMember(d => d.Following,
          o => o.MapFrom(s => s.AppUser.Followers.Any(x => x.Observer.UserName == username)));

      CreateMap<AppUser, Profiles.ProfileDto>()
        .ForMember(a => a.Image, o => o
          .MapFrom(s => s.Photos
            .FirstOrDefault(x => x.IsMain).Url))
        .ForMember(a => a.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
        .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
        .ForMember(d => d.Following,
          o => o.MapFrom(s => s.Followers.Any(x => x.Observer.UserName == username)));

      CreateMap<Comment, CommentDto>()
              .ForMember(d => d.DisplayName, o => o
          .MapFrom(s => s.Author.DisplayName))
        .ForMember(d => d.Username, o => o
          .MapFrom(s => s.Author.UserName))
        .ForMember(a => a.Image, o => o
          .MapFrom(s => s.Author.Photos
            .FirstOrDefault(x => x.IsMain).Url));

      CreateMap<Activity, UserActivityDto>()
        .ForMember(d => d.HostUsername, o => o
          .MapFrom(s => s.Attendees.First(x => x.IsHost).AppUser.UserName))
        .ForMember(d => d.Category, o => o
          .MapFrom(s => s.Category))
        .ForMember(d => d.ActivityId, o => o
          .MapFrom(s => s.Id))
        .ForMember(d => d.Title, o => o
          .MapFrom(s => s.Title))
        .ForMember(d => d.Date, o => o
          .MapFrom(s => s.Date));
    }
  }
}