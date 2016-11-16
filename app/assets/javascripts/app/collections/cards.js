var MrelloApp = MrelloApp || {};

MrelloApp.collections.Cards = Backbone.Collection.extend({
  url: '/api/v1/cards',
  model: MrelloApp.models.Card,
  parse: function(response) {
    return response.cards;
  },
});