using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
namespace ScrumBlox.Controllers
{
	public class HomeController : ApiController
	{
		public ActionResult Index ()
		{
			ViewData ["Message"] = "Welcome to ASP.NET MVC on Mono!";
			return View ();
		}
	}
}

