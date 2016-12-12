var MrelloApp = MrelloApp || {}

MrelloApp.Views.Atomics.BoardsNew = Backbone.View.extend({
  template: MrelloApp.templates['body_regions/boards/board_new'],

  className: "board-tile-wrapper",

  initialize: function() {
    this.render()
  },

  render: function() {
    this.$el.html(this.template())
    return this
  },
})