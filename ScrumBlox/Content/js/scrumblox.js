// The view model holds all the state we're working with. It also has methods that can edit it, and it uses
// computed observables to calculate more state in terms of the underlying data
// --
// The view (i.e., the HTML UI) binds to this using data-bind attributes, so it always stays up-to-date with
// the view model, even though the view model does not know or care about any view that binds to it
//var stories = [{"Id":"5117babc375e4fe1abe5445b","UserStory":"As a user I want to perform an action so that I can blah.","Tags":null,"AssignedTo":null,"CreatedBy":null,"StoryPoints":0,"Tasks":[{"Id":"5117babc375e4fe1abe5445a","Title":"Edit CSS","AssignedTo":"mrogers@brainloaf.com","Done":false}],"AcceptanceCriteria":[]}];

var StoryListModel = function() {

	var self = this;
	
    self.currentStories = ko.observableArray([]);
    self.editStoryId = ko.observable();
    self.editStoryTitle = ko.observable();
    self.editStoryText = ko.observable();
    self.editStoryPoints = ko.observable();
	self.editStoryTags = ko.observable();
  	self.editStoryVisible = ko.observable(false);
  	
    self.getStories = function() {
 
		scrumbloxapi.getAllStories(self.currentStories);
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
    
    self.editStory = function() {
    	var editStory = {
    		Id: self.editStoryId(),
    		Title: self.editStoryTitle(),
            UserStory: self.editStoryText(),
            Tags: self.editStoryTags(),
            StoryPoints: self.editStoryPoints()     
        }
        
        if (Id="")
        {
        	self.currentStories.push(editStory);
        }
        else
        {
        	// trigger refresh
        	self.getStories();
        }
        scrumbloxapi.saveStory(editStory);
        
        self.resetFields();
        //self.editStoryVisible(false);
        $('#editModel').modal('hide')
    };
    
    self.loadStoryForEditing = function(data) {
    	self.editStoryTitle(data.Title);
    	self.editStoryText(data.UserStory);
        self.editStoryPoints(data.StoryPoints);
        self.editStoryTags(data.Tags);
        self.editStoryId(data.Id);
        self.editStoryVisible(true);
        $('#editModel').modal();
    }
    
    self.resetFields = function() {
	    self.editStoryTitle("");
    	self.editStoryText("");
        self.editStoryPoints("");
        self.editStoryTags("");
        self.editStoryId("");
    };
    
};

$(function(){
 	storyListModel = new StoryListModel();
	ko.applyBindings(storyListModel);
 });
 

// Using jQuery for Ajax loading indicator - nothing to do with Knockout
$(".loadingIndicator").ajaxStart(function() {
    $(this).fadeIn();
}).ajaxComplete(function() {
    $(this).fadeOut();
});
