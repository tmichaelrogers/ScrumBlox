using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

using ScrumBlox.Repositories;
using ScrumBlox.Domain;
using ScrumBlox.Models;

namespace ScrumBlox.Controllers
{
    public class StoryController :System.Web.Http.ApiController
	{

		[HttpGet]
		public Story[] All([FromUri] SearchViewModel search)
		{
			Stories stories = new Stories ();
			if (search.tags!=null && search.tags.Length > 0) {
				return stories.GetByTags (search.tags).ToArray();
			} else {
				return stories.GetAll().ToArray();
			}
		}

		[HttpGet]
		[ActionName("SingleStory")]
		public Story Get (string id)
		{
			Stories stories = new Stories();
			return stories.Load (new Guid(id));
		}

		[HttpGet]
		public Story[] GetSubstories (string id)
		{
			Stories stories = new Stories();
			Story myStory = stories.Load (new Guid(id));
			return stories.GetSubStories (myStory).ToArray();
		}

		[HttpPost]
		public bool UpdateSequence (string id, [FromBody] Story story)
		{
			Stories stories = new Stories();
			stories.UpdateSequence (new Guid(id), story.Sequence, (STORY_STATUS)story.Status);

			return true;
		}

		[HttpPost]
		[ActionName("SingleStory")]
		public string Save (Story story)
		{
            return SaveStory(story);
		}

        private static string SaveStory(Story story)
        {
            Stories stories = new Stories();
            stories.Save(story);

            return story.Id.ToString();
        }

        [HttpPost]
        [ActionName("All")]
        public string Create(Story story)
        {
            return SaveStory(story);
        }

    }
}
