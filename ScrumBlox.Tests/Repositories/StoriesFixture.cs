using System;
using System.Collections.Generic;

using NUnit.Framework;

using ScrumBlox.Domain;
using ScrumBlox.Repositories;

namespace ScrumBlox.Tests
{
	[TestFixture]
	public class StoriesFixture
	{
		public StoriesFixture ()
		{

		}

		[SetUp]
		public void SetUp ()
		{
			Stories stories = new Stories();
			stories.Remove();
		}
		
		[Test]
		public void CanAddNewStory ()
		{
			Stories stories = new Stories();
			
			Story newStory = new Story();
			
			newStory.UserStory= "As a user I want to perform an action so that I can blah.";
			newStory.Status = STORY_STATUS.Doing;

			Assert.AreEqual(0,stories.Count);
			
			stories.Add(newStory);
			
			Assert.AreEqual(1,stories.Count);
		}

		[Test]
		public void CanAddSubStory ()
		{
			Stories stories = new Stories();
			
			Story newStory = new Story();
			
			newStory.UserStory= "As a user I want to perform an action so that I can blah.";

			Story subStory = new Story();

			subStory.AssignedTo = "mrogers@brainloaf.com";

			stories.Save (subStory);

			newStory.SubStories.Add (subStory.Id);

			stories.Add(newStory);

			Story fromDb = stories.Load(newStory.Id);

			Assert.AreEqual(1, fromDb.SubStories.Count);

		}

		[Test]
		public void CanGetSubStories()
		{
			Stories stories = new Stories();

			Story newStory = new Story();

			newStory.UserStory= "As a user I want to perform an action so that I can blah.";

			Story subStory = new Story();

			subStory.AssignedTo = "mrogers@brainloaf.com";

			stories.Save (subStory);

			newStory.SubStories.Add (subStory.Id);

			stories.Add(newStory);

			var substories = stories.GetSubStories (newStory);

			Assert.AreEqual (1, substories.Count());

		}



	}
}

