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

		[HttpPost]
		public bool Save (Story story)
		{
			Stories stories = new Stories();
			stories.Save(story);

			return true;
		}
    }
}
