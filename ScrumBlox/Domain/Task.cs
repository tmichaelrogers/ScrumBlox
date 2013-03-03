using System;

using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

namespace ScrumBlox.Domain
{
	public class Task
	{
		[BsonId(IdGenerator = typeof(GuidGenerator))]
		public Guid Id { get; set; }
		public string Title { get; set; }
		public string AssignedTo { get; set; }
		public bool Done { get; set; }

		public Task ()
		{

		}
	}
}

