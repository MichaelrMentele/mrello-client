// A singleton that is a single source of truth for login/logout
// status and management. 

var MrelloApp = MrelloApp || {}

MrelloApp.model.Session = Backbone.Model.extend({
  defaults: {
    logged_in: false,
    session_token: null
  },
  url: '/api/v1/login',
  initialize: function(token) {
    // singleton user object
    this.session_token = token
  }
})