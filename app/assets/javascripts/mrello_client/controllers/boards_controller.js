var MrelloApp = MrelloApp || {};

// Handles board related logic through routing events
// Serves as board related pub/sub event aggregator
MrelloApp.Controllers.Boards = MrelloApp.Controllers.Application.extend({

  initialize: function() {
    this.listenTo(MrelloApp.eventBus, "boards:create", this.create)
    this.listenTo(MrelloApp.eventBus, "boards:index", this.index)
    this.listenTo(MrelloApp.eventBus, "boards:show", this.show)
  },

  create: function(boardAttrs) {
    console.log("Creating board.")

    var board = new MrelloApp.Models.Board(boardAttrs)
    MrelloApp.session.currentOwner.boards.add(board)
    
    var self = this
    board.save([], {
      success: function(model, response, options) {
        self.renderFlashMessage({
          message: response.message,
          type: "success"
        })
      },

      error: function(model, response, options) {
        self.renderFlashMessage({
          message: response.message,
          type: "warning"
        })
      }
    })
  },

  index: function(organization_id=null) {
    console.log("Rendering index of boards")

    var boards = MrelloApp.session.currentOwner.boards

    var self = this
    boards.fetch({
      data: $.param({ organization_id: organization_id }),
      success: function(model, response, options) {
        var headerView = new MrelloApp.Views.HeaderRegions.Page({
          stateInfo: "Your Boards",
          navViews: [
            new MrelloApp.Views.Atomics.NavLogout(),
          ]
        })

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

    var self = this
    board.get("lists").fetch({
      data: $.param({ board_id: board.id }),
      success: function(model, response, options) {
        var headerView = new MrelloApp.Views.HeaderRegions.Page({
          stateInfo: board.get("title"),
          searchView: new MrelloApp.Views.Atomics.CardSearch(),
          navViews: [
            new MrelloApp.Views.Atomics.NavUserBoards(),
            new MrelloApp.Views.Atomics.NavLogout(),
          ]
        })

        var boardsView = new MrelloApp.Views.BodyRegions.BoardsShow({ model: board })

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
  
});
