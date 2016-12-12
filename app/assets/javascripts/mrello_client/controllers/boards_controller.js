var MrelloApp = MrelloApp || {};

// Handles board related logic through routing events
// Serves as board related pub/sub event aggregator
MrelloApp.Controllers.Boards = MrelloApp.Controllers.Application.extend({

  initialize: function() {
    this.listenTo(MrelloApp.eventBus, "boards:index", this.index)
    this.listenTo(MrelloApp.eventBus, "boards:show", this.show)
    this.listenTo(MrelloApp.eventBus, "boards:create", this.create)
  },

  index: function(organization_id=null) {
    console.log("Rendering index of boards")

    var boards = new MrelloApp.Collections.Boards()

    var self = this
    boards.fetch({
      data: $.param({ organization_id: organization_id }),
      success: function(model, response, options) {
        var headerView = new MrelloApp.Views.HeaderRegions.Page()
        var boardsView = new MrelloApp.Views.BodyRegions.BoardsIndex({ collection: boards })

        self.renderPage({
          header: headerView,
          body: boardsView
        })
      },
      error: function(model, response, options) {
        MrelloApp.setFlash(response.message, "warning")
        self.redirectTo("login")
      }
    })
    

    
  },

  show: function(board) {
    console.log("Rendering board page");
    board.initializeLists()
  },
  
});
