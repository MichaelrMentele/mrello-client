var MrelloApp = MrelloApp || {};

// Handles board related logic through routing events
// Serves as board related pub/sub event aggregator
MrelloApp.Controllers.Boards = MrelloApp.Controllers.Application.extend({

  initialize: function() {
    this.on("show", this.show);
  },

  show: function(id) {
    console.log("Rendering board page");
    if(id) {
      this.showSharedBoard()
    } else {
      this.showCurrentUsersBoard()
    }
  },
  
  // Helpers
  showCurrentUsersBoard: function() {
    
    var self = this
    MrelloApp.session.data.fetch({

      success: function(model, response, options){
        var headerView = new MrelloApp.Views.HeaderRegions.Page()
        var boardView = new MrelloApp.Views.BodyRegions.Board()
        self.renderPage({
          header: headerView,
          body: boardView
        });
      },

      error: function(model, response, options) {
        // MrelloApp.events.trigger("error", "You must be logged in for that.")
        MrelloApp.routes.navigate("login", { trigger: true });
      }
    });
  }
});
