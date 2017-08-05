// A singleton that is a single source of truth for login/logout
// status and management.
//
// It manages saving JWT session token to local storage to bypass
// reauth on page reload
//
// Holds session relevant data and state.

var MrelloApp = MrelloApp || {}

MrelloApp.Models.Session = Backbone.Model.extend({
  url: '/api/v1/sessions',

  defaults: {
    email: null,    // temp
    password: null, // temp
    token: ""
  },

  initialize: function() {
    // When a session is created we redirect to the users home which
    // always views a user's boards, so set default owner to user
    this.currentUser = new MrelloApp.Models.User()
    this.currentOwner = this.currentUser

    // Pick up where last session left off.
    if (this.hasCachedJWT()) {
      this.set("token", this.getStoredToken())
    }
    this.bindSaveTokenOnUnload()
  },

  // Related to Caching
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

  hasCachedJWT: function() {
    var token = localStorage.session_token
    if (token) {
      return token.split(".").length === 3
    } else {
      return false
    }
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

  clear: function() {
    this.clearToken()
    this.currentUser.clear()
  },

  // Helpers
  isSafe: function() {
    if(this.has("email", "password")) {
      return false
    } else {
      return true
    }
  },

  clearToken: function() {
    this.set("token", "")
    localStorage.session_token = ""
    return true
  },

  clearUserInfo: function() {
    this.set("email", null);
    this.set("password", null);
    return true
  },

  ownerType: function() {
    if(this.currentOwner.has("fullname")){
      return "User"
    } else {
      return "Organization"
    }
  },

  ownerId: function() {
    return this.currentOwner.id
  },

  ownerToUser: function() {
    this.currentOwner = this.currentUser
  },

  ownerToOrganization: function(id) {
    this.currentOwner = this.currentUser.getOrganization(id)
  }
})
