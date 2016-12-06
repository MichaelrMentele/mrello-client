var MrelloApp = MrelloApp || {}

MrelloApp.Controllers.Application = Backbone.Controller.extend({
  appContainerID:    "#app-container",
  appHeaderID:    "#app-header",
  appMessagesID:  "#app-messages",
  appBodyID:      "#app-body",

  // Catch non-existent routes
  initialize: function() {
    this.listenTo(MrelloApp.eventBus, "application:nonexistentRoute", this.nonexistentRoute)
  },

  nonexistentRoute: function() {
    this.renderFlashMessage("That URL does not exist.")
    this.redirectTo("home")
  },

  // Controller Helpers
  checkValidSession: function() {
    if ( MrelloApp.session.isNotAuthorized() ) {
      this.renderFlashMessage("You are not authorized for that. Are you logged in?")
      this.redirectTo("login")
    }
  },

  // Render/Redirect Helpers
  renderPage: function(regions) {
    this.renderHeader(regions.header)

    if(MrelloApp.hasFlash()) {
      this.renderFlashMessage(MrelloApp.getAndClearFlash()) 
    }

    this.renderBody(regions.body)
  },

  renderHeader: function(headerView) {
    $(this.appHeaderID).html(headerView.el)
  },

  renderFlashMessage: function(options) {
    var flashView = new MrelloApp.Views.MessageRegions.Flash(options.message, options.type)

    $(this.appMessagesID).html(flashView.el)
  },

  renderBody: function(bodyView) {
    $(this.appBodyID).html(bodyView.el)
  },

  redirectTo: function(route) {
    MrelloApp.eventBus.trigger("routes:go", route)
  },
})