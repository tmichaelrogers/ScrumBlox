// computed observables to calculate more state in terms of the underlying data
// --
// The view model holds all the state we're working with. It also has methods that can edit it, and it uses
// The view (i.e., the HTML UI) binds to this using data-bind attributes, so it always stays up-to-date with
// the view model, even though the view model does not know or care about any view that binds to it
//var stories = [{"Id":"5117babc375e4fe1abe5445b","UserStory":"As a user I want to perform an action so that I can blah.","Tags":null,"AssignedTo":null,"CreatedBy":null,"StoryPoints":0,"Tasks":[{"Id":"5117babc375e4fe1abe5445a","Title":"Edit CSS","AssignedTo":"mrogers@brainloaf.com","Done":false}],"AcceptanceCriteria":[]}];

(function (ko, $, undefined) {
    ko.bindingHandlers.flash = {
        init: function (element) {
            $(element).hide();
        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            if (value) {
                $(element).stop().hide().text(value).fadeIn(function () {
                    clearTimeout($(element).data("timeout"));
                    $(element).data("timeout", setTimeout(function () {
                        $(element).fadeOut();
                        valueAccessor()(null);
                    }, 3000));
                });
            }
        },
        timeout: null
    };

    var StoryModel = function (story) {
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
        self.Sequence = ko.observable(story.Sequence);
        self.TagsOutput = ko.computed(function () {
            if (self.Tags() != null) {
                return self.Tags().split(",");
            }
            else return [];
        });



        self.storyTypeClass = function () { //change color of card
            return self.StoryType() ? self.StoryType().toLowerCase().replace(' ', '-') : "";
        }

    }

    var StoryListModel = function () {

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

        self.blockedButton = ko.computed(function () {
            if (self.editBlocked())
                return "Blocked";
            else
                return "Block";
        });

        self.blockedClass = ko.computed(function () {
            if (self.editBlocked())
                return "btn-danger";
        });

        self.toggleBlocked = function () {
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

            if (label == "Backlog")
                self.isBacklogVisible(!self.isBacklogVisible());
            if (label == "To Do")
                self.isTodoVisible(!self.isTodoVisible());
            if (label == "Doing")
                self.isDoingVisible(!self.isDoingVisible());
            if (label == "Done")
                self.isDoneVisible(!self.isDoneVisible());
            if (label == "Tested")
                self.isTestedVisible(!self.isTestedVisible());
            if (label == "Released")
                self.isReleasedVisible(!self.isReleasedVisible());
        };

        self.numLanesVisible = ko.computed(function () {
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

        self.laneSpanCss = ko.computed(function () {
            switch (self.numLanesVisible()) {
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

        self.getLaneTotal = function (arr) {
            var total = 0;

            for (var i = 0; i < arr().length; i++) {
                total += 0 + arr()[i].StoryPoints();
            }
            return total;
        };


        self.backlogTotal = ko.computed(function () {
            return self.getLaneTotal(self.backlog);
        });

        self.todoTotal = ko.computed(function () {
            return self.getLaneTotal(self.todo);
        });

        self.doingTotal = ko.computed(function () {
            return self.getLaneTotal(self.doing);
        });

        self.doneTotal = ko.computed(function () {
            return self.getLaneTotal(self.done);
        });

        self.testedTotal = ko.computed(function () {
            return self.getLaneTotal(self.tested);
        });

        self.releasedTotal = ko.computed(function () {
            return self.getLaneTotal(self.released);
        });

		self.selectedFilterTags = ko.observableArray([]);

		/* Filter Functions */
		//self.tagList = ko.observableArray([]);
		
		self.caseInsensitiveSort = function (a, b) 
		{ 
		   var ret = 0;
		   a = a.toLowerCase();b = b.toLowerCase();
		   if(a > b) 
		      ret = 1;
		   if(a < b) 
		      ret = -1; 
		   return ret;
		}
		
		self.tagList = ko.computed(function(){
			/* Add to unique list of tags */
        	var theTags = [];
        	
        	for (var scix=0; scix<self.currentStories().length;scix++)
        	{   
        		var story = self.currentStories()[scix];
        		
                if (story && story.Tags())
                {
                	var tags=story.Tags().split(',');
                	for(var t=0; t<tags.length; t++)
                	{
                		if (theTags.indexOf(tags[t])==-1)
                		{
                			theTags.push(tags[t]);
                		}
                	}
                }	
            }
            theTags.sort(self.caseInsensitiveSort);
            
            return theTags;
		});

        self.getStories = function () {
			// reset arrays
			self.currentStories.removeAll();
			self.backlog.removeAll();
			self.todo.removeAll();
			self.doing.removeAll();
			self.done.removeAll();
			self.tested.removeAll();
			self.released.removeAll();
			
            scrumbloxapi.getAllStories(ko.toJS(self.selectedFilterTags()), self.loadStories);
        }

        self.insertStoryModel = function (story) {
            switch (story.Status()) {
                case 0:
                    self.backlog.push(story);
                    story.Sequence(self.backlog().length-1);
                    break;
                case 1:
                    self.todo.push(story);
                    story.Sequence(self.todo().length-1);
                    break;
                case 2:
                    self.doing.push(story);
                    story.Sequence(self.doing().length-1);
                    break;
                case 3:
                    self.done.push(story);
                    story.Sequence(self.done().length-1);
                    break;
                case 4:
                    self.tested.push(story);
                    story.Sequence(self.tested().length-1);
                    break;
                case 5:
                    self.released.push(story);
                    story.Sequence(self.released().length-1);
                    break;
            }
        }

        self.loadStories = function (data) {
            for (var i = 0; i < data.length; i++) {
                story = data[i];

				var newModel = new StoryModel(story);
                switch (story.Status) {
                    case 0:
                        self.backlog.push(newModel);
                        break;
                    case 1:
                        self.todo.push(newModel);
                        break;
                    case 2:
                        self.doing.push(newModel);
                        break;
                    case 3:
                        self.done.push(newModel);
                        break;
                    case 4:
                        self.tested.push(newModel);
                        break;
                    case 5:
                        self.released.push(newModel);
                        break;
                }
                self.currentStories.push(newModel);
            }
        }

        ko.computed(function () {
            self.getStories();
        }, self);

		self.addOrRemoveTagFromFilter = function (tag)
		{
			// add or remove the clicked tag from the filter list
			if (self.selectedFilterTags.indexOf(tag)==-1)
			{
				self.selectedFilterTags.push(tag);
			}
			else
			{	
				self.selectedFilterTags.remove(tag);
			}
			//self.getStories();
		}

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

			var story = arg.item;
			var relativeStory;
			var newSequence = arg.targetIndex;
			
            story.Status(this.id);
            
            scrumbloxapi.updateSequence(story.Id(), newSequence, this.id);
        };


        self.editStory = function () {

            var updateStory, editStory;

            if (self.editStoryId() == "") {
                editStory = {
                    Id: self.editStoryId(),
                    Title: self.editStoryTitle(),
                    UserStory: self.editStoryText(),
                    StoryType: self.editStoryType(),
                    Tags: self.editStoryTags(),
                    StoryPoints: self.editStoryPoints(),
                    Status: self.editStatus(),
                    ReleasedIn: self.editReleasedIn(),
                    Blocked: self.editBlocked()
                }
                updateStory = new StoryModel(editStory);
                self.insertStoryModel(updateStory);
            }
            else {
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
            scrumbloxapi.saveStory(ko.toJS(updateStory), function (data) {
                updateStory.Id(data)
            });
            //scrumbloxapi.saveStory(editStory);
            self.resetFields();

            //self.editStoryVisible(false);
            $('#editModel').modal('hide');

        };

        self.loadStoryForEditing = function (data) {
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

        self.resetFields = function () {
            self.editStoryTitle("");
            self.editStoryText("");
            self.editStoryPoints("");
            self.editStoryTags("");
            self.editStatus("");
            self.editStoryId("");
            self.editStoryType("");
            self.editStatus(0);
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
