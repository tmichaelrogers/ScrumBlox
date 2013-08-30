
﻿
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Http;

namespace ScrumBlox
{
	public class MvcApplication : System.Web.HttpApplication
	{
		public static void RegisterRoutes(HttpConfiguration configuration)
		{

			configuration.Routes.MapHttpRoute (
				"All Story",
				"Stories",
				new { controller = "Story", action = "All" }
			);

			configuration.Routes.MapHttpRoute (
				"Single Story",
				"Stories/{id}",
				new { controller = "Story", action = "SingleStory" }
			);

			configuration.Routes.MapHttpRoute (
				"Update Sequence",
				"Stories/{id}/Sequence",
				new { controller = "Story", action = "UpdateSequence" }
			);

			configuration.Routes.MapHttpRoute (
				"Stories API",
				"Stories/{id}/substories",
				new { controller = "Story", action = "GetSubStories" }
			);
		}

		protected void Application_Start ()
		{
			AreaRegistration.RegisterAllAreas ();
			RegisterRoutes (GlobalConfiguration.Configuration);
		}
	}
}
