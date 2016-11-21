var MrelloApp = MrelloApp || {}

MrelloApp.models.Organization = Backbone.Model.extend({
  urlRoot: "/api/v1/organizations",
  defaults: {
    title: "",
  }
});