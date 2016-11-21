var MrelloApp = MrelloApp || {}

MrelloApp.routers.MrelloRouter = Backbone.Router.extend({
  routes: {
    ''          :   'boardsControllerShow',
    'register'  :   'usersControllerNew',
    'login'     :   'sessionsControllerNew',
    'logout'    :   'sessionsControllerDestroy',
    'organization/new' : 'organizationControllerNew'
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
  organizationControllerNew: function() {
    console.log("Router: @new, organizations#new")
    MrelloApp.organizationsController.trigger("new")
  }
})


