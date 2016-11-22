// A singleton that is a single source of truth for login/logout
// status and management. 
//
// It manages saving JWT session token to local storage to bypass 
// reauth on page reload

var MrelloApp = MrelloApp || {}

MrelloApp.models.Session = Backbone.Model.extend({
  url: '/api/v1/sessions',
  defaults: {
    email: "",    // temp 
    password: "", // temp
    token: ""
  },

  initialize: function(token) {
    if (token) {
      this.set("token", token)
    } else if (this.getStoredToken()) {
      this.set("token", this.getStoredToken())
    }

    var self = this
    $(window).unload(function() {
      self.saveToken()
      console.log("session token saved")
    })
  },
  
  // TODO: refactor: add callback so everytime sync is called it clears the login information
  // TODO: Success callback for create should go here
  sync: function(method, model, options) {
    options = options || {};

    // Use this if you need to map custom url endpoints
    // options.url = model.methodToURL[method.toLowerCase()];

    return Backbone.sync.apply(this, arguments);
  },

  saveToken: function() {
    localStorage.session_token = this.get("token")
    return true
  },

  getStoredToken: function() {
    return localStorage.session_token
  },

  hasToken: function() {
    return !!this.get("token")
  },

  clearUserInfo: function() {
    this.set("email", null);
    this.set("password", null);
    return true
  },

  clear: function() {
    this.set("token", "")
    localStorage.session_token = ""
    return true
  }
})