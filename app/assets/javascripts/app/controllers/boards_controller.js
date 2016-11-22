var MrelloApp = MrelloApp || {};

// Handles board related logic through routing events
// Serves as board related pub/sub event aggregator
MrelloApp.controllers.Boards = MrelloApp.controllers.Application.extend({

  initialize: function() {
    this.on("show", this.show);
  },

  show: function() {
    console.log("Rendering board page");

    MrelloApp.resetData()
    
    var self = this
    MrelloApp.data.fetch({

      success: function(model, response, options){
        var boardView = new MrelloApp.views.Board();
        self.render(boardView);
      },

      error: function(model, response, options) {
        // MrelloApp.events.trigger("error", "You must be logged in for that.")
        MrelloApp.routes.navigate("login", { trigger: true });
      }
    });
  }
});
