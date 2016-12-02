var MrelloApp = MrelloApp || {};

MrelloApp.Controllers.Sessions = MrelloApp.Controllers.Application.extend({
  
  initialize: function() {
    this.on("new", this.new);
    this.on("destroy", this.destroy);
  },

  new: function() {
    console.log("Rendering login page");

    var headerView = new MrelloApp.Views.Header()
    var loginView = new MrelloApp.Views.Sessions.New();

    this.renderPage({
      header: headerView, 
      body: loginView
    });
  },

  destroy: function() {
    console.log("Clearing session and redirecting to login.")

    MrelloApp.clearCache()
    MrelloApp.resetData()

    MrelloApp.routes.navigate("login", { trigger: true } )
  }
});
