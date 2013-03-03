using System;
using System.Collections.Generic;

using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

using ScrumBlox.Domain;

namespace ScrumBlox.Repositories
{
	public class Stories
	{
		private MongoClient client;
		private MongoCollection collection;
		

		public Stories()
		{

			var connectionString = "mongodb://localhost";
			client = new MongoClient(connectionString);
			var server = client.GetServer();
			var database = server.GetDatabase("scrumBlox");
			collection = database.GetCollection<Story>("stories");
		}

		public long Count { get { return collection.Count(); } }
		
		public void Remove ()
		{
			collection.RemoveAll ();
		}
		
		public void Add (Story story)
		{
			collection.Insert(story);
		}
		
		public void Save (Story story)
		{
			collection.Save (story);
		}

		public Story Load (Guid id)
		{
			var query = Query.EQ("_id", id);
			return collection.FindOneAs<Story>(query);
		}

		public MongoCursor<Story> GetAll()
		{
			return collection.FindAllAs<Story>();
		}
		/*public Story GetByEmail (string email)
		{
			var query = Query.EQ("Email", email);
			return collection.FindOneAs<Story>(query);
		}*/

	}

}

