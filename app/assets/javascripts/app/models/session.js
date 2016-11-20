// A singleton that is a single source of truth for login/logout
// status and management. 

var MrelloApp = MrelloApp || {}

MrelloApp.models.Session = Backbone.Model.extend({
  url: '/api/v1/sessions',
  defaults: {
    email: "",    // temp
    password: "", // temp
    session_token: null
  },
  
  sync: function(method, model, options) {
    options = options || {};
    
    // Use this if you need to map custom url endpoints
    // options.url = model.methodToURL[method.toLowerCase()];

    return Backbone.sync.apply(this, arguments);
  },

  hasToken: function() {
    return !!this.session_token
  },

  clearUserInfo: function() {
    this.set("email", null);
    this.set("password", null);
  },

  clearSession: function() {
    this.set("session_token", null)
  }
})