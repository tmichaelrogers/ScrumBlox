using System;
using System.Collections.Generic;

using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

namespace ScrumBlox.Domain
{
	public enum STORY_STATUS { Backlog, ToDo, Doing, Done, Tested, Released }
	public class Story
	{
		public Story ()
		{
			SubStories = new List<Guid>();
			AcceptanceCriteria = new List<String>();

		}

		[BsonId(IdGenerator = typeof(GuidGenerator))]
		public Guid Id { get; set; }
		public string Title { get; set; }
		public string UserStory { get; set; }
		public string Tags { get; set; }
		public string AssignedTo { get; set; }
		public string CreatedBy { get; set; }
		public string StoryType { get; set; }
		public string ReleasedIn { get; set; }
		public int StoryPoints { get; set; }
		public int Sequence { get; set; }
		public STORY_STATUS Status {get;set;}
		public bool Blocked {get;set;}
		public bool Archived {get;set;}

		public List<Guid> SubStories { get; set; }
		public List<String> AcceptanceCriteria { get; set; }
	}
}

