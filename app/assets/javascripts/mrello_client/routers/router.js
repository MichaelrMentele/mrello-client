var MrelloApp = MrelloApp || {}

MrelloApp.Routers.Router = Backbone.Router.extend({

  initialize: function() {
    this.listenForNavigation()
  },

  listenForNavigation: function() {
    this.listenTo(MrelloApp.eventBus, "routes:go", this.go)
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
    'user/organizations'  :   'organizationsControllerIndex',

    'organizations/:id'  :   'organizationsControllerShow',

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

  organizationsControllerIndex: function(scoped=false) {
    console.log("Router: @index, organizations#index")
    MrelloApp.eventBus.trigger("organizations:index", scoped)
  },

  organizationsControllerShow: function(id) {
    console.log("Router: @show, organizations#show")
    MrelloApp.eventBus.trigger("organizations:show", id)      
  },

  applicationControllerError: function() {
    console.log("Router: @error, application#error")
    MrelloApp.eventBus.trigger("application:error")
  }
})

