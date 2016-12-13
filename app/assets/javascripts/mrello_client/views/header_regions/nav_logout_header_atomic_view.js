var MrelloApp = MrelloApp || {}

MrelloApp.Views.Atomics.NavLogout = Backbone.View.extend({

  template: MrelloApp.templates['header_regions/nav_element'],

  id: "logout",
  className: "btn",

  events: {
    "click a"     :     "navEvent", 
  },

  initialize: function() {
    this.render()
  },

  render: function() {
    this.$el.html(this.template({ text: "Logout" }))
    return this
  },

  navEvent: function(e) {
    e.preventDefault()
    console.log("Logging out")
    MrelloApp.eventBus.trigger('sessions:destroy')
  },
})