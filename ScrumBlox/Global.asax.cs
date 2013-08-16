
﻿
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ScrumBlox
{
	public class MvcApplication : System.Web.HttpApplication
	{
		public static void RegisterRoutes (RouteCollection routes)
		{
			routes.IgnoreRoute ("{resource}.axd/{*pathInfo}");

			routes.MapRoute (
                "Default",
                "{controller}/{action}/{id}",
                new { controller = "Home", action = "Index", id = "" }
			);

			routes.MapRoute (
				"Get Story",
				"Stories/{id}",
				new { controller = "Story", action = "Get" }
			);
			
			routes.MapRoute (
				"Stories API",
				"Stories/{id}/substories",
				new { controller = "Story", action = "GetSubStories" }
			);

		}

		protected void Application_Start ()
		{
			AreaRegistration.RegisterAllAreas ();
			RegisterRoutes (RouteTable.Routes);
		}
	}
}
