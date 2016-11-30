var MrelloApp = MrelloApp || {};

MrelloApp.collections.Boards = Backbone.Collection.extend({
  url: '/api/v1/boards',
  model: MrelloApp.models.Board,
  parse: function(response) {
    return response.boards;
  },

});