using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseAPIController
    {
        private readonly DataContext _dbContet;
        public ActivitiesController(DataContext dbContet)
        {
            _dbContet = dbContet;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await _dbContet.Activities.ToListAsync();
        }

        [HttpGet("({id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await _dbContet.Activities.FindAsync(id);
        }
    }
}