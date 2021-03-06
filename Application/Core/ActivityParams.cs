using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class ActivityParams : PagingParams
    {
        public bool IsGoing { get; set; }
        public bool IsHost { get; set; }
        public bool IsPast { get; set; }
        public bool IsFuture { get; set; }
        public DateTime StartDate  { get; set; } = DateTime.UtcNow;
    }
}