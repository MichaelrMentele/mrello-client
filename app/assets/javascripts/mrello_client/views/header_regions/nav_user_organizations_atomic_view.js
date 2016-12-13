var MrelloApp = MrelloApp || {}

MrelloApp.Views.Atomics.NavUserOrganizations = Backbone.View.extend({

  template: MrelloApp.templates['header_regions/nav_element'],

  id: "user-orgs",
  className: "btn",

  events: {
    "click a"     :     "navEvent", 
  },

  initialize: function() {
    this.render()
  },

  render: function() {
    this.$el.html(this.template({ text: "Your Orgs" }))
    return this
  },

  navEvent: function(e) {
    e.preventDefault()
    console.log("Showing your organizations.")
    MrelloApp.eventBus.trigger('organizations:index', { scope: "User" } )
  },
})