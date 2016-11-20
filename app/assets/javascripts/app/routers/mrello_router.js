var MrelloApp = MrelloApp || {}

MrelloApp.routers.MrelloRouter = Backbone.Router.extend({
  routes: {
    '': 'boardController',
    'login': 'sessionsController',
    'register': 'usersController'
  },
  showBoard: function() {   
    console.log("Router: @root, triggering board...")
    var self = this;

    MrelloApp.data.fetch({
      success: function(model, response, options){
        MrelloApp.events.trigger("renderBoard");
      },
      error: function(model, response, options) {
        MrelloApp.events.trigger("error", "You must be logged in for that.")
        self.navigate("login")
      }
    });
  },
  showRegistration: function() {
    console.log("Router: @register, triggering registration..."); 
    MrelloApp.events.trigger("renderRegistration");
  },
  sessionsController: function() {
    console.log("Router: @login, triggering login")
    MrelloApp.sessionsController.trigger("renderLogin");
  }
})


