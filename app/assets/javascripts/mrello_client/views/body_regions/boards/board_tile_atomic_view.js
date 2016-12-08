var MrelloApp = MrelloApp || {}

// Needs to be passed a board model
MrelloApp.Views.Atomics.BoardTile = Backbone.View.extend({
  template: MrelloApp.templates['body_regions/boards/board_tile'],

  className: "board-tile-wrapper",

  events: {
    "click .board-tile" : "showBoard"
  },

  initialize: function() {
    this.render() 
  },

  render: function() {
    console.log("Rendering board tile.")
    this.$el.html(this.template(this.model.toJSON()))
    return this
  },

  showBoard: function() {
    MrelloApp.eventBus.trigger("boards:show", this.model)
  }
})