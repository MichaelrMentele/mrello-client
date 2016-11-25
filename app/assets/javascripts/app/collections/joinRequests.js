var MrelloApp = MrelloApp || {};

MrelloApp.collections.JoinRequests = Backbone.Collection.extend({
  url: '/api/v1/join_requests',
  model: MrelloApp.models.JoinRequest,
  parse: function(response) {
    return response.join_requests;
  },
});