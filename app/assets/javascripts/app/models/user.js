var MrelloApp = MrelloApp || {}

// !!TODO: refactor save and defaults to not have sensitive information or to protect it
// having fullname and admin is probably okay for user experience
MrelloApp.models.User = Backbone.Model.extend({
  urlRoot: "/api/v1/users",
  defaults: {
    fullname: "",
    admin: false,
    organization_id: null,
  },

  initialize: function(attributes) {
    if (attributes) {
      this.set("fullname", attributes.fullname)
      this.set("admin", attributes.admin)
      this.set("organization_id", attributes.organization_id)
    } else if (this.getStored()) {
      userJson = this.getStored()
      userAttr = JSON.parse(userJson)
      this.set(userAttr)
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

  clear: function() {
    // User defaults are reset on page reload
    localStorage.currentUser = null
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