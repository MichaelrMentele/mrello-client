var MrelloApp = MrelloApp || {}

// !!TODO: refactor save and defaults to not have sensitive information or to protect it
// having fullname and admin is probably okay for user experience
MrelloApp.Models.User = Backbone.Model.extend({
  urlRoot: "/api/v1/users",

  defaults: {
    fullname: null,
  },

  initialize: function(attributes) {
    if (attributes) {
      this.set("fullname", attributes.fullname)
    } else if (this.getStored()) {
      userJson = this.getStored()
      userAttr = JSON.parse(userJson)
      this.set(userAttr)
    }

    this.boards = new MrelloApp.Collections.Boards()
    this.organizations = new MrelloApp.Collections.Organizations()

    this.bindSave()
  },

  bindSave: function() {
    var self = this
    $(window).unload(function() {
      self.saveUser()
      console.log("current user saved")
    })
  },

  // Caching related
  isSafe: function() {
    if (this.has("email") || this.has("password")) {
      return false // its not safe
    } else {
      return true // its safe
    }
  },

  saveUser: function() {
    localStorage.currentUser = this.stringify()
    return true
  },

  clear: function() {
    // User defaults are reset on page reload
    localStorage.currentUser = ""
  },

  getStored: function() {
    return localStorage.currentUser
  },

  isCached: function() {
    if (this.getStored() != "") {
      return true
    } else {
      return false
    }
  },

  // Helpers
  stringify: function() {
    return JSON.stringify(this)
  },
});