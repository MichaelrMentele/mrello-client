var MrelloApp = MrelloApp || {}

MrelloApp.Views.Atomics.ButtonOrganizationsNew = Backbone.View.extend({

  template: MrelloApp.templates['header_regions/nav_element'],

  className: "btn",

  events: {
    "click a"     :     "navEvent", 
  },

  initialize: function() {
    this.render()
  },

  render: function() {
    this.$el.html(this.template({ text: "New Organization" }))
    return this
  },

  navEvent: function(e) {
    e.preventDefault()
    MrelloApp.routes.go("organizations/new")
  },
})
