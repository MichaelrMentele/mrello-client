var MrelloApp = MrelloApp || {}

MrelloApp.Models.Membership = Backbone.Model.extend({
  urlRoot: "/api/v1/memberships",

  parse: function(response, options) {
    if(response.membership) {
      return response.membership;
    } else {
      return response;
    }
  }
})