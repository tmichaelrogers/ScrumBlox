using System;
using System.Collections.Generic;
using System.Linq;

using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;

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

		public void UpdateSequence(string id, int seq, STORY_STATUS status)
		{
			// Don't update the sequence of archived cards
			var query = Query.And 
				(
					Query.EQ ("Status", status),
					Query.EQ ("Archived", false),
					Query.GTE ("Sequence", seq)
				);

			var update = Update.Inc ("Sequence", 1);
			var soryBy = SortBy.Ascending("Sequence");

			collection.FindAndModify (query, soryBy, update);

			query = Query.EQ ("_id",new ObjectId(id));
			update = Update.Set ("Sequence", seq).Set("Status",status);
			collection.FindAndModify (query, soryBy, update);

		}

		public Story Load (string id)
		{
			var query = Query.EQ("_id", new ObjectId(id));
			return collection.FindOneAs<Story>(query);
		}

		public MongoCursor<Story> GetAll()
		{
			var sort = SortBy.Ascending ("Status","Sequence");
			return collection.FindAllAs<Story>().SetSortOrder(sort);
		}
		/*public Story GetByEmail (string email)
		{
			var query = Query.EQ("Email", email);
			return collection.FindOneAs<Story>(query);
		}*/

//		public MongoCursor<Story> GetSubStories(Story story)
//		{
//			return collection.FindAs<Story>(Query.In ("_id", new BsonArray(story.SubStories)));
//		}

		public MongoCursor<Story> GetByTags(string tags)
		{
			List<string> atags= tags.Split(',').ToList();
			//BsonArray batags = new  BsonArray (atags);


			List<IMongoQuery> myarray = new List<IMongoQuery>();
			foreach(string t in atags)
			{
				myarray.Add(Query.Matches("Tags", t));
			}

			return collection.FindAs<Story>(Query.Or(myarray));
		}

	}

}

