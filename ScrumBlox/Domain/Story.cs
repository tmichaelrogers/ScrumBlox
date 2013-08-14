using System;
using System.Collections.Generic;

using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

namespace ScrumBlox.Domain
{
	public class Story
	{
		public Story ()
		{
			SubStories = new List<Story>();
			AcceptanceCriteria = new List<String>();

		}

		[BsonId(IdGenerator = typeof(GuidGenerator))]
		public Guid Id { get; set; }
		public string UserStory { get; set; }
		public string Tags { get; set; }
		public string AssignedTo { get; set; }
		public string CreatedBy { get; set; }
		public int StoryPoints { get; set; }
		public List<Story> SubStories { get; set; }
		public List<String> AcceptanceCriteria { get; set; }
	}
}

