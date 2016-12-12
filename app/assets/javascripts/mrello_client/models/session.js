// A singleton that is a single source of truth for login/logout
// status and management. 
//
// It manages saving JWT session token to local storage to bypass 
// reauth on page reload

var MrelloApp = MrelloApp || {}

MrelloApp.Models.Session = Backbone.Model.extend({
  url: '/api/v1/sessions',

  defaults: {
    email: null,    // temp 
    password: null, // temp
    token: ""
  },

  initialize: function() {
    // These are not attributes but nested objects related to the session
    this.currentUser = new MrelloApp.Models.User()
    this.data = new MrelloApp.Collections.Boards()

    if (this.hasCachedJWT()) {
      this.set("token", this.getStoredToken())
    }
    
    this.bindSaveTokenOnUnload()
  },

  bindSaveTokenOnUnload: function() {
    var self = this
    $(window).unload(function() {
      self.saveToken()
      console.log("Session token saved.")
    })
  },

  saveToken: function() {
    if(this.hasToken()) {
      localStorage.session_token = this.get("token")
      return true
    } else {
      return false
    }
  },

  clearSessionCache: function() {
    this.currentUser.clear()
  },

  hasCachedJWT: function() {
    var token = localStorage.session_token
    return token != "" & token.split(".").length == 3 // Three segments in a JWT
  },

  getStoredToken: function() {
    return localStorage.session_token
  },

  hasToken: function() {
    return !!this.get("token")
  },

  isAuthorized: function() {
    return this.hasToken()
  },

  isNotAuthorized: function() {
    return !this.isAuthorized()
  },

  isSafe: function() {
    if(this.has("email", "password")) {
      return false
    } else {
      return true
    }
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