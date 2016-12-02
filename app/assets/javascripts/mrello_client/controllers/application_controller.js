var MrelloApp = MrelloApp || {}

MrelloApp.Controllers.Application = Backbone.Controller.extend({
  containerID: "#app-container",

  renderPage: function(regions) {
    this.clearAppView.apply(this)
    $(this.containerID).append(regions.header.el)
    $(this.containerID).append(regions.body.el)
  },
  
  clearAppView: function() {
    $(this.containerID).empty()
  },
})