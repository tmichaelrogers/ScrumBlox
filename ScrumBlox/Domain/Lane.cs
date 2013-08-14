using System;
using System.Collections.Generic;

namespace ScrumBlox.Domain
{
	public class Lane
	{
		public Lane ()
		{
		}

		public String Name { get; set; }
		public IList<Story> Stories { get; set; }
	}
}

