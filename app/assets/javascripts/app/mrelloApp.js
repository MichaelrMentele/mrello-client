var MrelloApp = {

  // constructor namespaces
  models: {},      
  collections: {}, 
  views: {},     
  routers: {}, 
  controllers: {},
  templates: HandlebarsTemplates,

  // application objects (called out for readability)
  data: {},               // Contains board data
  organizations: {},      // TODO: should be namespaced under data
  routes: {},             // Router
  session: {},            // Singleton model containing session state
  
  init: function() {
    console.log("Mrello starting up...")

    this.initializeState()
    this.initializeControllers()
    this.initializeRouting()
  },
  
  resetData: function() {
    // TODO: Should be refactored so that lists are under a board Model
    this.data = new this.collections.Boards()
  },

  clearCache: function() {
    this.session.clear()
    this.currentUser.clear()
  },

  // Initializers
  initializeState: function() {
    // State Containers
    //TODO: Refactor-> namespace under data
    this.session = new this.models.Session()
    this.organizations = new this.collections.Organizations() 
    this.currentUser = new this.models.User()
  },

  initializeControllers: function() {
    this.sessionsController = new this.controllers.Sessions()
    this.usersController = new this.controllers.Users()
    this.boardsController = new this.controllers.Boards()
    this.listsController = new this.controllers.Lists()
    this.organizationsController = new this.controllers.Organizations()
  },

  initializeRouting: function() {
    this.routes = new this.routers.MrelloRouter() 
    Backbone.history.start( { pushState: true } ) // pushState uses the full URL
  }
}

                                 