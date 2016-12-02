var MrelloApp = MrelloApp || {};

MrelloApp.Collections.Lists = Backbone.Collection.extend({
  url: '/api/v1/lists',
  model: MrelloApp.Models.List,
  parse: function(response) {
    return response.lists;
  },

});