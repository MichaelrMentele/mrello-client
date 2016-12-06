var MrelloApp = MrelloApp || {}

MrelloApp.Views.MessageRegions.Flash = Backbone.View.extend({
  template: MrelloApp.templates['message_regions/flash'],

  id: "flash-messages",

  initialize: function(message, type) {
    this.message = message
    this.type = type || "info"
    this.render()
  },

  render: function() {
    this.$el.html(this.template({ message: this.message, type: this.type}))
    return this
  }
})