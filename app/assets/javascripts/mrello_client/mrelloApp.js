var MrelloApp = {
  // Config
  HOST_URL: "http://8b3f0ab5.ngrok.io", // http://mrello-api.herokuapp.com

  // constructor namespaces
  Models: {},      
  Collections: {}, 
  Views: {
    HeaderRegions: {},
    BodyRegions: {},
    MessageRegions: {},
    Composites: {},
    Atomics: {},
  },     
  Routers: {}, 
  Controllers: {},

  // Application objects (called out for readability)
  templates: HandlebarsTemplates,            
  routes: {},             // Router
  eventBus: {},           // Pub/Sub Bus
  session: {},            // Singleton managing session token
  currentUser: {}, //TODO: merge under session?
  flash: {},
  
  // Initializers
  init: function() {
    console.log("Mrello starting up...")

    this.initializeEventBus()
    this.initializeControllers()
    this.initializeRouting()

    this.loadSession()
  },

  initializeEventBus: function() {
    this.eventBus = _.clone(Backbone.Events)
    this.eventBus.on("all", function() {
      console.log("Event published.")
    })
    return this.eventBus
  },

  loadSession: function() {
    this.session = new this.Models.Session()
    this.currentUser = new this.Models.User()
  },

  initializeControllers: function() {
    // TODO: These are all singletons... why do I have constructors?
    this.applicationController    = new this.Controllers.Application()
    this.sessionsController       = new this.Controllers.Sessions()
    this.usersController          = new this.Controllers.Users()
    this.boardsController         = new this.Controllers.Boards()
    this.listsController          = new this.Controllers.Lists()
    this.organizationsController  = new this.Controllers.Organizations()
  },

  initializeRouting: function() {
    this.routes = new this.Routers.Router() 
    Backbone.history.start( { pushState: true }) // pushState uses the full URL
    return this.routes
  },

  // Flash Helpers
  hasFlash: function() {
    return !!this.flash.message
  },

  getAndClearFlash: function() {
    var message = this.flash.message
    var type = this.flash.type
    this.flash = {}

    return { message: message, type: type }
  },

  setFlash: function(message, type) {
    this.flash.message = message
    this.flash.type = type
  },

  // Data Helpers
  resetData: function() {
    this.boardsData = new this.Collections.Boards()
  },

  clearSessionCache: function() {
    this.session.clear()
    this.currentUser.clear()
  },
}

                                 