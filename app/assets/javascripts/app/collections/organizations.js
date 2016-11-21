var MrelloApp = MrelloApp || {};

MrelloApp.collections.Organizations = Backbone.Collection.extend({
  url: '/api/v1/organizations',
  model: MrelloApp.models.Organization,
  parse: function(response) {
    return response.organizations;
  },
});