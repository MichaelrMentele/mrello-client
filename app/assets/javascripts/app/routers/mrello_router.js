var MrelloApp = MrelloApp || {}

MrelloApp.routers.MrelloRouter = Backbone.Router.extend({
  routes: {
    '': 'boardControllerShow',
    'register': 'usersControllerNew',
    'login': 'sessionsControllerNew',
  },
  boardControllerShow: function() {   
    console.log("Router: @root, triggering board...")
    var self = this;

    MrelloApp.data.fetch({
      success: function(model, response, options){
        MrelloApp.boardsController.trigger("show");
      },
      error: function(model, response, options) {
        // MrelloApp.events.trigger("error", "You must be logged in for that.")
        self.navigate("login", { trigger: true });
      }
    });
  },
  usersControllerNew: function() {
    console.log("Router: @register, triggering registration..."); 
    MrelloApp.usersController.trigger("new");
  },
  sessionsControllerNew: function() {
    console.log("Router: @login, triggering login")
    MrelloApp.sessionsController.trigger("new");
  }
})


