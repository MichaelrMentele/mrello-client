var MrelloApp = MrelloApp || {};

MrelloApp.collections.Lists = Backbone.Collection.extend({
  url: '/api/v1/lists',
  model: MrelloApp.models.List,
  parse: function(response) {
    return response.lists;
  },

});