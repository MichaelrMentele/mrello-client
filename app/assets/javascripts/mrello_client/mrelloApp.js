var MrelloApp = {
  // Config
  HOST_URL: "http://73871e3a.ngrok.io", // http://mrello-api.herokuapp.com

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
  data: {},               // App data for the current window
  routes: {},             // Router
  eventBus: {},           // Pub/Sub Bus
  session: {},            // Singleton managing session token
  flash: {},
  // Additionally Mrello has a collection of resource controllers, see initialize 
  // controllers in init
  
  // Initializers
  init: function() {
    console.log("Mrello starting up...")

    this.initializeEventBus()
    this.initializeControllers()
    this.initializeRouting()
    this.initializeSession()
  },

  initializeEventBus: function() {
    this.eventBus = _.clone(Backbone.Events)
    this.eventBus.on("all", function() {
      console.log("Event published.")
    })
    return this.eventBus
  },

  initializeSession: function() {
    this.session = new this.Models.Session()
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

  // Data Helpers
  restart: function() {
    Backbone.history.stop()
    this.init()
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
}

                                 