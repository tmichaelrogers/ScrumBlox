#var stories = [{"Id":"5117babc375e4fe1abe5445b","UserStory":"As a user I want to perform an action so that I can blah.","Tags":null,"AssignedTo":null,"CreatedBy":null,"StoryPoints":0,"Tasks":[{"Id":"5117babc375e4fe1abe5445a","Title":"Edit CSS","AssignedTo":"mrogers@brainloaf.com","Done":false}],"AcceptanceCriteria":[]}];

StoryListModel = () ->

    currentStories = ko.observableArray([])
    editStoryId = ko.observable()
    editStoryText = ko.observable()
    editStoryPoints = ko.observable()
	editStoryTags = ko.observable()
  	editStoryVisible = ko.observable false
  	
    getStories = () ->
		scrumbloxapi.getAllStories self.currentStories
    
    ko.computed  () -> self.getStories, this

    editStoryClick =  () ->
    	self.editStoryVisible true
    
    
    closeEditStoryClick = () ->
    	self.editStoryVisible false
    	self.resetFields
     
    
    editStory = () ->
    	 editStory
    		Id: editStoryId()
            UserStory: editStoryText()
            Tags: editStoryTags()
            StoryPoints: editStoryPoints()  
        
        if Id==""
        	currentStories.push editStory()
        else
        	getStories()

        scrumbloxapi.saveStory editStory
        
        resetFields()
        editStoryVisible false
    
    
    loadStoryForEditing = (data) ->
    	editStoryText data.UserStory
        editStoryPoints data.StoryPoints
        editStoryTags data.Tags
        editStoryId data.Id
        editStoryVisible true
    
    resetFields = () ->
    	editStoryText("")
        editStoryPoints("")
        editStoryTags("")
        editStoryId("")

