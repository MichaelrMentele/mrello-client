var MrelloApp = MrelloApp || {};

MrelloApp.Collections.Cards = Backbone.Collection.extend({
  url: '/api/v1/cards',
  model: MrelloApp.Models.Card,

  parse: function(response) {
    return response.cards;
  },

});