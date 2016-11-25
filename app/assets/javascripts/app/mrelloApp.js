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
  organizations: {},      // TODO: should be namespaced under data
  routes: {},             // Router
  session: {},            // Singleton model containing session state
  sessionsController: {},
  usersController: {},
  boardController: {},
  organizationsController: {},
  
  init: function() {
    console.log("Mrello starting up...")

    // State Containers
    //TODO: Refactor-> namespace under data
    this.session = new this.models.Session()
    this.organizations = new this.collections.Organizations() 
    this.currentUser = new this.models.User()

    // Controllers
    this.sessionsController = new this.controllers.Sessions()
    this.usersController = new this.controllers.Users()
    this.boardsController = new this.controllers.Boards()
    this.listsController = new this.controllers.Lists()
    this.organizationsController = new this.controllers.Organizations()

    // Run
    this.routes = new this.routers.MrelloRouter() 
    Backbone.history.start( { pushState: true } ) // pushState uses the full URL
  },
  
  resetData: function() {
    // TODO: Should be refactored so that lists are under a board Model
    this.data = new this.collections.Lists()
  },

  clearCache: function() {
    this.session.clear()
    this.currentUser.clear()
  }
}

                                 