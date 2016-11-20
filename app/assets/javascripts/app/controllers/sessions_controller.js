var MrelloApp = MrelloApp || {};

MrelloApp.controllers.Sessions = Backbone.Controller.extend({
  containerID: "#app-container",
  initialize: function() {
    this.on("new", this.new);
  },
  new: function() {
    console.log("Rendering login page");

    var loginView = new MrelloApp.views.Login();
    this.render(loginView);
  }
});
