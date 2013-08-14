using System;
using System.Collections.Generic;

using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

using ScrumBlox.Domain;

namespace ScrumBlox.Repositories
{
	public class Boards
	{
		private MongoClient client;
		private MongoCollection collection;

		public Boards()
		{
			var connectionString = "mongodb://localhost";
			client = new MongoClient(connectionString);
			var server = client.GetServer();
			var database = server.GetDatabase("scrumBlox");
			collection = database.GetCollection<Story>("boards");
		}

		public long Count { get { return collection.Count(); } }
		
		public void Remove ()
		{
			collection.RemoveAll ();
		}
		
		public void Add (Board board)
		{
			collection.Insert(board);
		}
		
		public void Save (Board board)
		{
			collection.Save (board);
		}

		public Board Load (Guid id)
		{
			var query = Query.EQ("_id", id);
			return collection.FindOneAs<Board>(query);
		}

		public MongoCursor<Board> GetAll()
		{
			return collection.FindAllAs<Board>();
		}
		/*public Story GetByEmail (string email)
		{
			var query = Query.EQ("Email", email);
			return collection.FindOneAs<Story>(query);
		}*/

	}

}

