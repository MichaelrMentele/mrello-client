var MrelloApp = MrelloApp || {}

MrelloApp.controllers.Application = Backbone.Controller.extend({
  containerID: "#app-container",

  render: function(view) {
    this.clearAppView.apply(this, arguments)
    $(this.containerID).html(view.el)
  },
  
  clearAppView: function() {
    $(this.containerID).empty()
  },
})