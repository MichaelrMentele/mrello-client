var MrelloApp = MrelloApp || {};

MrelloApp.controllers.Sessions = Backbone.Controller.extend({
  containerID: "#app-container",
  
  initialize: function() {
    this.on("new", this.new);
    this.on("destroy", this.destroy);
  },

  new: function() {
    console.log("Rendering login page");

    var loginView = new MrelloApp.views.Login();
    this.render(loginView);
  },

  destroy: function() {
    console.log("Clearing session and redirecting")
    MrelloApp.resetSession()
    MrelloApp.resetData()
    MrelloApp.routes.navigate("login", { trigger: true } )
  }
});
