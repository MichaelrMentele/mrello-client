var MrelloApp = MrelloApp || {};

MrelloApp.Controllers.Sessions = MrelloApp.Controllers.Application.extend({
  
  initialize: function() {
    this.listenTo(MrelloApp.eventBus, "sessions:new", this.new);
    this.listenTo(MrelloApp.eventBus, "sessions:create", this.create)
    this.listenTo(MrelloApp.eventBus, "sessions:destroy", this.destroy);
  },

  new: function() {
    console.log("Rendering login page");

    var headerView = new MrelloApp.Views.HeaderRegions.Page()
    var loginView = new MrelloApp.Views.BodyRegions.SessionsNew();

    this.renderPage({
      header: headerView, 
      body: loginView
    });
  },

  create: function(credentials) {
    var session = new MrelloApp.Models.Session(credentials)

    session.save({}, session, {
      success: function(response, status, options){
        MrelloApp.session = new MrelloApp.Models.Session({
          token: response.session_token
        })

        MrelloApp.eventBus.trigger('users:cache', response.user)

        MrelloApp.flashMessage = response.message
        this.redirectTo("home")
      }, 
      error: function(response, status, options) {
        this.renderFlashMessage(response.message)
      }
    })
  },

  destroy: function() {
    console.log("Clearing session and redirecting to login.")

    MrelloApp.clearSessionCache()
    MrelloApp.resetData()

    this.redirectTo("login")
  }
});
