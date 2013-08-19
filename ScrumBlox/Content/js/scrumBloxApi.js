window.scrumbloxapi = new function () {
    this.getAllStories = function (callback) {
            	$.ajax({
            	    url: 'http://localhost:54781/Stories',
	                dataType: "json",
	                headers: {'Accept':'application/json'},
	                success: function (data) 
	                { callback(data); },
	                error: function (xhr,status,error)
	                { alert(error); }
                });
    };

    this.saveStory = function (story, callback) {
            	$.post(
	                'http://localhost:54781/Stories/' + story.Id,
	                story,
	                function (data) 
	                { 
	                	if (callback) callback(data); 
	                },
	                "json"
                );
    };

};
