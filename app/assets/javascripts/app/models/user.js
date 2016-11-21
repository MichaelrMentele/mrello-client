var MrelloApp = MrelloApp || {}

MrelloApp.models.User = Backbone.Model.extend({
  urlRoot: "/api/v1/users",
  defaults: {
    fullname: "",
    email: "",
    password: "",
    admin: false,
  }
});