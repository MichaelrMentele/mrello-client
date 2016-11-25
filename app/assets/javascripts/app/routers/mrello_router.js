var MrelloApp = MrelloApp || {}

MrelloApp.routers.MrelloRouter = Backbone.Router.extend({
  
  routes: {
    ''          :   'boardsControllerShow',
    'register'  :   'usersControllerNew',
    'login'     :   'sessionsControllerNew',
    'logout'    :   'sessionsControllerDestroy',
    'organizations'    : 'organizationsControllerIndex',
    'organizations/new' : 'organizationsControllerNew',
    'organizations/show' : 'organizationsControllerShow',
  },

  boardsControllerShow: function() {   
    console.log("Router: @root, board#show...")
    MrelloApp.boardsController.trigger("show")    
  },

  usersControllerNew: function() {
    console.log("Router: @register, users#new"); 
    MrelloApp.usersController.trigger("new");
  },

  sessionsControllerNew: function() {
    console.log("Router: @login, sessions#new")
    MrelloApp.sessionsController.trigger("new");
  },

  sessionsControllerDestroy: function() {
    console.log("Router: @logout, sessions#destroy")
    MrelloApp.sessionsController.trigger("destroy")
  },

  organizationsControllerIndex: function() {
    console.log("Router: @index, organizations#index")
    MrelloApp.organizationsController.trigger("index")
  },

  organizationsControllerNew: function() {
    console.log("Router: @new, organizations#new")
    MrelloApp.organizationsController.trigger("new")
  },

  organizationsControllerShow: function() {
    console.log("Router: @show, organizations#show")
    MrelloApp.organizationsController.trigger("show")
  }
})


