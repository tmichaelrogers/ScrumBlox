using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using ScrumBlox.Repositories;
using ScrumBlox.Domain;

namespace ScrumBlox.Controllers
{
    public class StoryController : Controller
    {
        public ActionResult Index()
        {
            return View ();
        }

		[HttpGet]
		public JsonResult All ()
		{
			Stories stories = new Stories();

			return this.Json(stories.GetAll().ToList(), JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Get (string id)
		{
			Stories stories = new Stories();
			return this.Json ( stories.Load (new Guid(id)) );
		}

		[HttpGet]
		public JsonResult GetSubstories (string id)
		{
			Stories stories = new Stories();
			Story myStory = stories.Load (new Guid(id));
			return this.Json( stories.GetSubStories (myStory).ToList());
		}

		[HttpPost]
		public JsonResult Save (Story story)
		{
			Stories stories = new Stories();
			stories.Save(story);

			return this.Json(story.Id);
		}
    }
}
