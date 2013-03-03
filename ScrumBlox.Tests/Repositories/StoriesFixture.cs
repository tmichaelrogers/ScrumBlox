using System;
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

			Assert.AreEqual(0,stories.Count);
			
			stories.Add(newStory);
			
			Assert.AreEqual(1,stories.Count);
		}

		[Test]
		public void CanAddTask ()
		{
			Stories stories = new Stories();
			
			Story newStory = new Story();
			
			newStory.UserStory= "As a user I want to perform an action so that I can blah.";

			Task task = new Task();

			task.AssignedTo="mrogers@brainloaf.com";
			task.Title="Edit CSS";

			newStory.Tasks.Add (task);

			stories.Add(newStory);

			Story fromDb = stories.Load(newStory.Id);

			Assert.AreEqual(1, fromDb.Tasks.Count);

		}


	}
}

