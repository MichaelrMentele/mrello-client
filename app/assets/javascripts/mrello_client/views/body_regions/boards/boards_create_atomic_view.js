var MrelloApp = MrelloApp || {}

MrelloApp.Views.Atomics.BoardsCreate = Backbone.View.extend({
  template: MrelloApp.templates['body_regions/boards/board_create'],

  className: "board-tile-wrapper",

  events: {
    "click #create-board" : "createBoard"
  },

  initialize: function() {
    this.render()
  },

  render: function() {
    this.$el.html(this.template())
    return this
  },

  createBoard: function(e) {
    e.preventDefault()
    console.log("Creating a board...")

    MrelloApp.eventBus.trigger("boards:create", this.getTitleInput())
  },

  getTitleInput: function() {
    return this.$el.find("#title").val()
  }
})