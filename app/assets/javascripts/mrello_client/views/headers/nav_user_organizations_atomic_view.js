var MrelloApp = MrelloApp || {}

MrelloApp.Views.Atomics.NavUserOrganizations = Backbone.View.extend({

  template: MrelloApp.templates['shared/nav_user_organizations'],

  id: "user-orgs",
  className: "btn",

  events: {
    "click a"     :     "navEvent", 
  },

  initialize: function() {
    this.render()
  },

  render: function() {
    this.$el.html(this.template())
    return this
  },

  navEvent: function(e) {
    e.preventDefault()
    console.log("Showing your organizations.")
    MrelloApp.eventBus.trigger('organizations:index', { scope: "User" } )
  },
})