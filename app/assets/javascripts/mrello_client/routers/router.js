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
    'home'                :   'boardsControllerIndex',

    'register'            :   'usersControllerNew',

    'login'               :   'sessionsControllerNew',

    'organizations'       :   'organizationsControllerIndexAll', 
    'user/organizations'  :   'organizationsControllerIndexUser',

    'organizations/new'   :   'organizationsControllerNew',

    'organizations/:id'   :   'organizationsControllerShow',

    "*path"               :   'applicationControllerNotFound'
  },

  boardsControllerIndex: function() {   
    console.log("Router: @root, board#index...")
    MrelloApp.eventBus.trigger("boards:index")    
  },

  usersControllerNew: function() {
    console.log("Router: @register, users#new"); 
    MrelloApp.eventBus.trigger("users:new");
  },

  sessionsControllerNew: function() {
    console.log("Router: @login, sessions#new")
    MrelloApp.eventBus.trigger("sessions:new");
  },

  organizationsControllerIndexAll: function() {
    console.log("Router: @index, organizations#index")
    MrelloApp.eventBus.trigger("organizations:index:all")
  },

  organizationsControllerIndexUser: function() {
    console.log("Router: @index, organizations#index")
    MrelloApp.eventBus.trigger("organizations:index:user")
  },

  organizationsControllerNew: function() {
    console.log("Router: @index, organizations#new")
    MrelloApp.eventBus.trigger("organizations:new")
  },

  organizationsControllerShow: function(id) {
    console.log("Router: @show, organizations#show")
    MrelloApp.eventBus.trigger("organizations:show", id)      
  },

  applicationControllerNotFound: function() {
    console.log("Router: @error, application#notFound")
    MrelloApp.eventBus.trigger("application:notFound")
  }
})


