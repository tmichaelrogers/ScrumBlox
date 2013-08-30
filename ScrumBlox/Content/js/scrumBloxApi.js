window.scrumbloxapi = new function () {
    this.getAllStories = function (tagArray, callback) {
    			var parameters='';
    			
    			if (tagArray.length!=0)
    			{
    				parameters = '?tags='+encodeURIComponent(tagArray.toString())
    			}
            	$.ajax({
            	    url: '/Stories'+parameters,
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
	                '/Stories/' + story.Id,
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
	                '/Stories/' + storyId + '/Sequence',
	                { Sequence: newSequence, Status : currentStatus },
	                function (data) 
	                { 
	                	if (callback) callback(data); 
	                },
	                "json"
                );		
	};
};
