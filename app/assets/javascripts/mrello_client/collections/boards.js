var MrelloApp = MrelloApp || {};

MrelloApp.Collections.Boards = Backbone.Collection.extend({
  url: '/api/v1/boards',
  model: MrelloApp.Models.Board,
  
  parse: function(response) {
    return response.boards;
  },

});