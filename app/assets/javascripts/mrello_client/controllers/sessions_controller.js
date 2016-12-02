var MrelloApp = MrelloApp || {};

MrelloApp.Controllers.Sessions = MrelloApp.Controllers.Application.extend({
  
  initialize: function() {
    this.on("new", this.new);
    this.on("destroy", this.destroy);
  },

  new: function() {
    console.log("Rendering login page");

    var loginView = new MrelloApp.Views.Sessions.New();
    this.render(loginView);
  },

  destroy: function() {
    console.log("Clearing session and redirecting")
    MrelloApp.clearCache()
    MrelloApp.resetData()
    MrelloApp.routes.navigate("login", { trigger: true } )
  }
});
