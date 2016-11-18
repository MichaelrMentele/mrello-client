// A singleton that is a single source of truth for login/logout
// status and management. 

var MrelloApp = MrelloApp || {}

MrelloApp.models.Session = Backbone.Model.extend({
  defaults: {
    email: "",
    password: "",
    logged_in: false,
    session_token: null
  },

  methodToURL: {
    'create': '/api/v1/login',
    'delete': '/api/v1/logout'
  },

  sync: function(method, model, options) {
    options = options || {};
    options.url = model.methodToURL[method.toLowerCase()];

    return Backbone.sync.apply(this, arguments);
  }
})