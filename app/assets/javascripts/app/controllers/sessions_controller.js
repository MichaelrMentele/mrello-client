var MrelloApp = MrelloApp || {};

MrelloApp.controllers.Sessions = Backbone.Controller.extend({
  containerID: "#app-container",
  initialize: function() {
    this.on("renderLogin", this.renderLogin);
  },
  renderLogin: function() {
    console.log("Rendering login page");
    this.clearAppView();

    var loginView = new MrelloApp.views.Login();
    this.render(loginView);
  }
});
