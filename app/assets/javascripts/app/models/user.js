var MrelloApp = MrelloApp || {}

// !!TODO: refactor save and defaults to not have sensitive information or to protect it
// having fullname and admin is probably okay for user experience
MrelloApp.models.User = Backbone.Model.extend({
  urlRoot: "/api/v1/users",
  defaults: {
    fullname: "",
    email: "",
    password: "",
    admin: false,
  },

  initialize: function() {
    if (this.getStored()) {
      this.set(this.getStored())
    }

    this.bindSave()
  },

  bindSave: function() {
    var self = this
    $(window).unload(function() {
      self.saveUser()
      console.log("current user saved")
    })
  },

  saveUser: function() {
    localStorage.currentUser = this.stringify()
    return true
  },

  getStored: function() {
    return localStorage.currentUser
  },

  stringify: function() {
    return JSON.stringify(this)
  }
});