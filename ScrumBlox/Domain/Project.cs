using System;

namespace ScrumBlox
{
	public class Project
	{

		public List<Story> Stories { get; set; }
		public Project ()
		{
			Stories = new List<Story>();
		}

	}
}

