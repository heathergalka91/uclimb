using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
  public class Interest
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Image { get; set; }
    public ICollection<AppUser> Users { get; set; }

  }
}