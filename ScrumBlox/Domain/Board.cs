using System;
using System.Collections.Generic;

using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

namespace ScrumBlox.Domain
{
	public class Board
	{
		public Board ()
		{
			Lanes = new List<Lane>();

		}

		[BsonId(IdGenerator = typeof(GuidGenerator))]
		public Guid Id { get; set; }
		public List<Lane> Lanes { get; set; }
	}
}

