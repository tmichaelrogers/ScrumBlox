using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

using ScrumBlox.Repositories;
using ScrumBlox.Domain;

namespace ScrumBlox.Controllers
{
    public class StoryController : ApiController
    {

		[HttpGet]
		public Story[] All()
		{
			Stories stories = new Stories();

			return stories.GetAll().ToArray();
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
		[ActionName("SingleStory")]
		public string Save (Story story)
		{
			Stories stories = new Stories();
			stories.Save(story);

			return story.Id.ToString();
		}
    }
}
