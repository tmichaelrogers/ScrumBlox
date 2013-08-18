// The view model holds all the state we're working with. It also has methods that can edit it, and it uses
// computed observables to calculate more state in terms of the underlying data
// --
// The view (i.e., the HTML UI) binds to this using data-bind attributes, so it always stays up-to-date with
// the view model, even though the view model does not know or care about any view that binds to it
//var stories = [{"Id":"5117babc375e4fe1abe5445b","UserStory":"As a user I want to perform an action so that I can blah.","Tags":null,"AssignedTo":null,"CreatedBy":null,"StoryPoints":0,"Tasks":[{"Id":"5117babc375e4fe1abe5445a","Title":"Edit CSS","AssignedTo":"mrogers@brainloaf.com","Done":false}],"AcceptanceCriteria":[]}];

(function(ko, $, undefined) {
ko.bindingHandlers.flash = {
    init: function(element) {
        $(element).hide();
    },
    update: function(element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        if (value) {
            $(element).stop().hide().text(value).fadeIn(function() {
                clearTimeout($(element).data("timeout"));
                $(element).data("timeout", setTimeout(function() {
                    $(element).fadeOut();
                    valueAccessor()(null);
                }, 3000));
            });
        }
    },
    timeout: null
};

var StoryModel = function( story )
{
	var self = this;
	
	self.Id = ko.observable(story.Id);
	self.Title = ko.observable(story.Title);
	self.UserStory = ko.observable(story.UserStory);
	self.Tags = ko.observable(story.Tags);
	self.Status = ko.observable(story.Status);
	self.StoryPoints = ko.observable(story.StoryPoints);
	self.StoryType = ko.observable(story.StoryType);
	self.ReleasedIn = ko.observable(story.ReleasedIn);
	self.Blocked = ko.observable(story.Blocked);
	self.TagsOutput = ko.computed(function() {
		if (self.Tags() != null)
		{
			return self.Tags().split(",");
		}
		else return [];
	});
	

	
	self.storyTypeClass = function(){ //change color of card
		return self.StoryType() ? self.StoryType().toLowerCase().replace(' ','-') : "";
	}
	
}

var StoryListModel = function() {

	var self = this;
	
    self.currentStories = ko.observableArray([]);
    
    /* Lane Observables */
    self.backlog = ko.observableArray([]);
    self.todo = ko.observableArray([]);
    self.doing = ko.observableArray([]);
    self.done = ko.observableArray([]);
    self.tested = ko.observableArray([]);
    self.released = ko.observableArray([]);
    
    /* Editing Fields */
    self.editStoryId = ko.observable("");
    self.editStoryTitle = ko.observable("");
    self.editStoryText = ko.observable("");
    self.editStoryType = ko.observable("");
    self.editStoryPoints = ko.observable("");
	self.editStoryTags = ko.observable("");
  	self.editStoryVisible = ko.observable(false);
  	self.editReleasedIn = ko.observable("");
  	self.editBlocked = ko.observable(false);
  	self.editStatus = ko.observable(0);
  	
  	self.storyBeingEdited = ko.observable();
  	
  	self.blockedButton = ko.computed( function () {
		if (self.editBlocked())
			return "Blocked";
		else
			return "Block";
	});
	
	self.blockedClass = ko.computed( function () {
		if (self.editBlocked())
			return "btn-danger";
	});
  	
  	self.toggleBlocked = function() {
  		self.editBlocked(!self.editBlocked());
  	}
  	
  	/* Lane Functions */
  	
  	self.isBacklogVisible = ko.observable(true);
  	self.isTodoVisible = ko.observable(true);
  	self.isDoingVisible = ko.observable(true);
  	self.isDoneVisible = ko.observable(true);
  	self.isTestedVisible = ko.observable(true);
  	self.isReleasedVisible = ko.observable(true);
  	
  	self.laneFilterClick = function (arg, event) {
  		var label = event.currentTarget.innerText;
  		
  		if (label=="Backlog")
  			self.isBacklogVisible(!self.isBacklogVisible());
  		if (label=="To Do")
  			self.isTodoVisible(!self.isTodoVisible());
  		if (label=="Doing")
  			self.isDoingVisible(!self.isDoingVisible());
  		if (label=="Done")
  			self.isDoneVisible(!self.isDoneVisible());
  		if (label=="Tested")
  			self.isTestedVisible(!self.isTestedVisible());
  		if (label=="Released")
  			self.isReleasedVisible(!self.isReleasedVisible());
  	};
  	
  	self.numLanesVisible = ko.computed(function (){
  		var ct = 0;
  		
  		if (self.isBacklogVisible())
  			ct++;
  		if (self.isTodoVisible())
  			ct++;
  		if (self.isDoingVisible())
  			ct++;
  		if (self.isDoneVisible())
  			ct++;
  		if (self.isTestedVisible())
  			ct++;
  		if (self.isReleasedVisible())
  			ct++;
  			
  		return ct;
  			
  	});
  	
  	self.laneSpanCss = ko.computed(function (){
  		switch ( self.numLanesVisible())
  		{
  			case 1:
  				return "span12";
  			case 2:
  				return "span6"; 
  			case 3:
  				return "span4"; 
  			case 4:
  				return "span3"; 
  			case 5:
  				return "span2"; 
  			case 6:
  				return "span2"; 
  			default:
  				return "span2";
  		}
  	});
  	
  	self.getLaneTotal = function (arr)
  	{
  		var total = 0;
  		
  		for (var i=0; i<arr().length; i++)
  		{
  			total += arr()[i].StoryPoints();	
  		}
  		return total;
  	};
  	
  	
  	self.backlogTotal = ko.computed( function () {
  		return self.getLaneTotal(self.backlog);
  	});

   	self.todoTotal = ko.computed( function () {
  		return self.getLaneTotal(self.todo);
  	});
 	
   	self.doingTotal = ko.computed( function () {
  		return self.getLaneTotal(self.doing);
  	});
 	
   	self.doneTotal = ko.computed( function () {
  		return self.getLaneTotal(self.done);
  	});  	  	  	

   	self.testedTotal = ko.computed( function () {
  		return self.getLaneTotal(self.tested);
  	});  	    	  	  	  	  	  	  	  	  	  	  	  	

	self.releasedTotal = ko.computed( function () {
		return self.getLaneTotal(self.released);
  	});   	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	
  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	  	

    self.getStories = function() {
 
		scrumbloxapi.getAllStories(self.loadStories);
    }
    
    self.insertStoryModel = function (story)
    {
        	switch (story.Status())
    		{
    			case 0:
    				self.backlog.push(story);
    				break;
    			case 1:
    				self.todo.push(story);
    				break;
    			case 2:
    				self.doing.push(story);
    				break;
    			case 3:
    				self.done.push(story);
    				break;
    			case 4:
    				self.tested.push(story);
    				break;
    			case 5:
    				self.released.push(story);
    				break;
    		}
    }
    
    self.loadStories = function (data) {
    	for (var i=0;i< data.length; i++)
    	{
    		story = data[i];
    		
    		switch (story.Status)
    		{
    			case 0:
    				self.backlog.push(new StoryModel(story));
    				break;
    			case 1:
    				self.todo.push(new StoryModel(story));
    				break;
    			case 2:
    				self.doing.push(new StoryModel(story));
    				break;
    			case 3:
    				self.done.push(new StoryModel(story));
    				break;
    			case 4:
    				self.tested.push(new StoryModel(story));
    				break;
    			case 5:
    				self.released.push(new StoryModel(story));
    				break;
    		}
    	}
    }
    
    ko.computed(function() {
        self.getStories();
    }, self);

	

    self.editStoryClick = function () {
    	self.editStoryVisible(true);
    	$('#editModel').modal();
    };
    
    self.closeEditStoryClick = function () {
    	//self.editStoryVisible(false);
    	$('#editModel').modal('hide');
    	self.resetFields();
    };    
    
    self.updateAfterMove = function (arg) {
     	
    	arg.item.Status(this.id);
    	
    	scrumbloxapi.saveStory(arg.item);
    };
    
    
    self.editStory = function() {

        var updateStory, editStory;
        
        if (self.editStoryId()=="")
        {
           	editStory = {
	    		Id: self.editStoryId(),
	    		Title: self.editStoryTitle(),
	            UserStory: self.editStoryText(),
	            StoryType: self.editStoryType(),
	            Tags: self.editStoryTags(),
	            StoryPoints: self.editStoryPoints(),
	            Status: self.editStatus(),
	            ReleasedIn : self.editReleasedIn(),
	            Blocked : self.editBlocked()   
	        }
        	updateStory = new StoryModel(editStory);
        	self.insertStoryModel(updateStory);
        }
        else
        {
        	// update existing story
        	updateStory = self.storyBeingEdited();
        	
        	updateStory.Id(self.editStoryId());
        	updateStory.Title(self.editStoryTitle());
        	updateStory.UserStory(self.editStoryText());
            updateStory.StoryType(self.editStoryType());
            updateStory.Tags(self.editStoryTags());
            updateStory.StoryPoints(self.editStoryPoints());
            updateStory.Status(self.editStatus())
            updateStory.ReleasedIn(self.editReleasedIn());
            updateStory.Blocked(self.editBlocked());
        	
        }
        scrumbloxapi.saveStory(ko.toJS(updateStory),function(data){ 
        	updateStory.Id(data)} );
        //scrumbloxapi.saveStory(editStory);
        
        //self.editStoryVisible(false);
        $('#editModel').modal('hide');

    };
    
    self.loadStoryForEditing = function(data) {
    	self.editStoryTitle(data.Title());
    	self.editStoryText(data.UserStory());
        self.editStoryPoints(data.StoryPoints());
        self.editStoryTags(data.Tags());
        self.editStoryId(data.Id());
        self.editStoryVisible(true);
        self.editStoryType(data.StoryType());
        self.editReleasedIn(data.ReleasedIn());
        self.editStatus(data.Status());
        self.editBlocked(data.Blocked());
        self.storyBeingEdited(data);
        $('#editModel').modal();
    }
    
    self.resetFields = function() {
	    self.editStoryTitle("");
    	self.editStoryText("");
        self.editStoryPoints("");
        self.editStoryTags("");
        self.editStoryId("");
        self.editStoryType("");
        self.editReleasedIn("");
        self.editBlocked(false);
        self.storyBeingEdited(null);
    };
    
};

storyListModel = new StoryListModel();
$('#editModel').on('hidden', function () {
  storyListModel.resetFields(); // Clear fields whenever modal is closed
})
ko.bindingHandlers.sortable.afterMove = storyListModel.updateAfterMove;
ko.applyBindings(storyListModel);
 
})(ko, jQuery);

// Using jQuery for Ajax loading indicator - nothing to do with Knockout
$(".loadingIndicator").ajaxStart(function() {
    $(this).fadeIn();
}).ajaxComplete(function() {
    $(this).fadeOut();
});
