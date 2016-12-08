var MrelloApp = MrelloApp || {};

// Handles board related logic through routing events
// Serves as board related pub/sub event aggregator
MrelloApp.Controllers.Boards = MrelloApp.Controllers.Application.extend({

  initialize: function() {
    this.on("index", this.index)
    this.on("show", this.show);
  },

  index: function(organization_id=null) {
    var headerView = new MrelloApp.Views.HeaderRegions.Page()
    var boardsView = new MrelloApp.Views.BodyRegions.Boards()

    this.renderPage({
      header: headerView,
      body: boardsView
    })
  },

  show: function(board) {
    console.log("Rendering board page");
    board.initializeLists()
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
