var MrelloApp = MrelloApp || {}

MrelloApp.models.User = Backbone.Model.extend({
  defaults: {
    fullname: "",
    email: "",
    password: "",
  }
});