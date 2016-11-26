var MrelloApp = MrelloApp || {}

MrelloApp.models.JoinRequest = Backbone.Model.extend({
  urlRoot: "/api/v1/join_requests",
  parse: function(response, options) {
    if(response.join_request) {
      return response.join_request;
    } else {
      return response;
    }
  }
})