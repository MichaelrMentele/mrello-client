var MrelloApp = MrelloApp || {};

MrelloApp.Collections.JoinRequests = Backbone.Collection.extend({
  url: '/api/v1/join_requests',
  model: MrelloApp.Models.JoinRequest,
  parse: function(response) {
    return response.join_requests;
  },
});