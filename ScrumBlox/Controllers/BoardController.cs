using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using ScrumBlox.Repositories;
using ScrumBlox.Domain;

namespace ScrumBlox.Controllers
{
    public class BoardController : Controller
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
		public bool Save (Board board)
		{
			Boards boards = new Boards();
			boards.Save(board);

			return true;
		}
    }
}
