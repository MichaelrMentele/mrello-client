var MrelloApp = MrelloApp || {};

MrelloApp.Collections.Organizations = Backbone.Collection.extend({
  url: '/api/v1/organizations',
  model: MrelloApp.Models.Organization,
  parse: function(response) {
    return response.organizations;
  },
});