using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.Profiles
{
    public class ProfileDto
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Pronouns { get; set; }
        public string Gender { get; set; }
        public ICollection<Interest> Interests {get; set;}
        public string Image { get; set; }
        public bool Following { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}