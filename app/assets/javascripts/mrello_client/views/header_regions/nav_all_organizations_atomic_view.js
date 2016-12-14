var MrelloApp = MrelloApp || {}

MrelloApp.Views.Atomics.NavAllOrganizations = Backbone.View.extend({

  template: MrelloApp.templates['header_regions/nav_element'],

  className: "btn",

  events: {
    "click a"     :     "navEvent", 
  },

  initialize: function() {
    this.render()
  },

  render: function() {
    this.$el.html(this.template({ text: "All Orgs" }))
    return this
  },

  navEvent: function(e) {
    e.preventDefault()
    console.log("Showing organizations.")
    MrelloApp.routes.go("organizations")
  },
})