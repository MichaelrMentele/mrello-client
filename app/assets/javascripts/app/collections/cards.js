var MrelloApp = MrelloApp || {};

MrelloApp.collections.Cards = Backbone.Collection.extend({
  model: MrelloApp.models.Card,
  parse: function(response) {
    return response.cards;
  }
});