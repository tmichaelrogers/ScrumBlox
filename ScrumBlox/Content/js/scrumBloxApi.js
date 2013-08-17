window.scrumbloxapi = new function () {
    this.getAllStories = function (callback) {
            	$.ajax({
	                url: 'http://127.0.0.1:8080/Story/All',
	                dataType: "json",
	                success: function (data) 
	                { callback(data); },
	                error: function (xhr,status,error)
	                { alert(error); }
                });
    };

    this.saveStory = function (story, callback) {
            	$.post(
	                'http://127.0.0.1:8080/Story/Save',
	                story,
	                function (data) 
	                { 
	                	callback(data); 
	                },
	                "json"
                );
    };

};
