var MrelloApp = MrelloApp || {}

MrelloApp.models.User = Backbone.Model.extend({
  defaults: {
    fullname: "",
    email: "",
    password: "",
  },
  schema: {
    fullname: 'Text',
    email: { validators: ['required', 'email'] }
    password: 'Password',
  }
})