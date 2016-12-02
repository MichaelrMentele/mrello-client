var MrelloApp = {

  // constructor namespaces
  Models: {},      
  Collections: {}, 
  Views: {
    Sessions: {},
    Users: {},
    Organizations: {},
    Boards: {},
    Lists: {},
    Cards: {},
    Checklists: {},
    Comments: {},
  },     
  Routers: {}, 
  Controllers: {},

  // application objects (called out for readability)
  templates: HandlebarsTemplates,
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
    this.data = new this.Collections.Boards()
  },

  clearCache: function() {
    this.session.clear()
    this.currentUser.clear()
  },

  // Initializers
  initializeState: function() {
    this.session = new this.Models.Session()
    this.currentUser = new this.Models.User()
  },

  initializeControllers: function() {
    this.sessionsController       = new this.Controllers.Sessions()
    this.usersController          = new this.Controllers.Users()
    this.boardsController         = new this.Controllers.Boards()
    this.listsController          = new this.Controllers.Lists()
    this.organizationsController  = new this.Controllers.Organizations()
  },

  initializeRouting: function() {
    this.routes = new this.Routers.Router() 
    Backbone.history.start( { pushState: true } ) // pushState uses the full URL
  }
}

                                 