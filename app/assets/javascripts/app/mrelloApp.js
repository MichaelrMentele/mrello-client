// App -> lists -> list-1 -> cards -> card-1 -> ...
//                 list-n -> cards -> card-n -> comments    -> comment-n
//                                              checklists  -> checklist-n

// App Data:
// - A collection of lists

// Lists Data:
// - list constructor
// - models

// List Data:
// - An id
// - A title (string)
// - A collection of cards

// Cards data:
// - card constructor
// - models

var MrelloApp = {

  // constructor namespaces
  models: {},      
  collections: {}, 
  views: {},     
  routers: {}, 
  controllers: {},
  templates: HandlebarsTemplates,

  // application objects -- called out here for readability
  data: {},               // Contains board data
  routes: {},             // Router
  session: {},            // Singleton model containing session state
  sessionsController: {},
  usersController: {},
  boardController: {},
  
  init: function() {
    console.log("Mrello starting up...")

    // State Containing Objects
    this.data = new this.collections.Lists();  
    this.session = new this.models.Session();

    // Controllers
    this.sessionsController = new this.controllers.Sessions();
    this.usersController = new this.controllers.Users();
    this.boardsController = new this.controllers.Boards();

    // Run
    this.routes = new this.routers.MrelloRouter(); // first create instance of router
    Backbone.history.start({pushState: true});         // pushState uses the full URL
  }, 
}

                                 