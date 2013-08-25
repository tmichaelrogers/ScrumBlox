window.scrumbloxapi = new function () {
    this.getAllStories = function (callback) {
            	$.ajax({
            	    url: 'http://127.0.0.1:8080/Stories',
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
	                'http://127.0.0.1:8080/Stories/' + story.Id,
	                story,
	                function (data) 
	                { 
	                	if (callback) callback(data); 
	                },
	                "json"
                );
    };

	this.updateSequence = function (storyId, newSequence, currentStatus, callback) {
            	$.post(
	                'http://127.0.0.1:8080/Stories/' + storyId + '/Sequence',
	                { Sequence: newSequence, Status : currentStatus },
	                function (data) 
	                { 
	                	if (callback) callback(data); 
	                },
	                "json"
                );		
	};
};
