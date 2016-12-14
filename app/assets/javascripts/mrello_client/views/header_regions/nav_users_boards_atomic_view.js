var MrelloApp = MrelloApp || {}

MrelloApp.Views.Atomics.NavUserBoards = Backbone.View.extend({
  template: MrelloApp.templates['header_regions/nav_element'],

  className: "btn",

  events: {
    "click"     :     "navEvent", 
  },

  initialize: function() {
    this.render()
  },

  render: function() {
    this.$el.html(this.template({ text: "Your Boards" }))
  },

  navEvent: function(e) {
    e.preventDefault()
    console.log("Showing users boards")
    MrelloApp.eventBus.trigger('boards:index')
  },
})