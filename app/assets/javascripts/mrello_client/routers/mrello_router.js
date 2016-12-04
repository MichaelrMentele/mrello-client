var MrelloApp = MrelloApp || {}

MrelloApp.Routers.Router = Backbone.Router.extend({

  initialize: function() {
    this.listenForNavigation()
  },

  listenForNavigation: function() {
    this.listenTo(MrelloApp.dispatcher, "routes:go", this.go)
  },

  go: function(route) {
    this.navigate(route, { trigger: true })
  },

  // URL Route Actions
  routes: {
    'home'                :   'boardsControllerShow',

    'register'            :   'usersControllerNew',

    'login'               :   'sessionsControllerNew',

    'organizations'       :   'organizationsControllerIndex',
    'organizations/new'   :   'organizationsControllerNew',
    'organizations/show'  :   'organizationsControllerShow',

    "*path"               :   'applicationControllerError'
  },

  boardsControllerShow: function() {   
    console.log("Router: @root, board#show...")
    MrelloApp.eventBus.trigger("boards:show")    
  },

  usersControllerNew: function() {
    console.log("Router: @register, users#new"); 
    MrelloApp.eventBus.trigger("users:new");
  },

  sessionsControllerNew: function() {
    console.log("Router: @login, sessions#new")
    MrelloApp.eventBus.trigger("sessions:new");
  },

  sessionsControllerDestroy: function() {
    console.log("Router: @logout, sessions#destroy")
    MrelloApp.eventBus.trigger("sessions:destroy")
  },

  organizationsControllerIndex: function() {
    console.log("Router: @index, organizations#index")
    MrelloApp.eventBus.trigger("organizations:index")
  },

  organizationsControllerNew: function() {
    console.log("Router: @new, organizations#new")
    MrelloApp.eventBus.trigger("organizations:new")
  },

  organizationsControllerShow: function() {
    console.log("Router: @show, organizations#show")
    // Must be an admin, show their board.
    MrelloApp.eventBus.trigger("organizations:show")      
  },

  applicationControllerError: function() {
    console.log("Router: @error, application#error")
    MrelloApp.eventBus.trigger("application:error")
  }
})


