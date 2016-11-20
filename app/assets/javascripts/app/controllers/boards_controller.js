var MrelloApp = MrelloApp || {};

// Handles board related logic through routing events
// Serves as board related pub/sub event aggregator
MrelloApp.controllers.Boards = Backbone.Controller.extend({
  containerID: "#app-container",
  initialize: function() {
    this.on("show", this.show);
  },
  show: function() {
    console.log("Rendering board page");

    var boardView = new MrelloApp.views.Board();
    this.render(boardView);
  }
});
