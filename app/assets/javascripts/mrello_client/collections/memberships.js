var MrelloApp = MrelloApp || {};

MrelloApp.Collections.Memberships = Backbone.Collection.extend({
  url: '/api/v1/memberships',

  model: MrelloApp.Models.Membership,

  parse: function(response) {
    return response.membership;
  },
});