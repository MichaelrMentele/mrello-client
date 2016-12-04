var MrelloApp = MrelloApp || {}

// !!TODO: refactor save and defaults to not have sensitive information or to protect it
// having fullname and admin is probably okay for user experience
MrelloApp.Models.User = Backbone.Model.extend({
  urlRoot: "/api/v1/users",
  defaults: {
    fullname: "",
    organization_id: null,
  },

  initialize: function(attributes) {
    if (attributes) {
      this.set("fullname", attributes.fullname)
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

  isCached: function() {
    return !!this.getStored
  },

  stringify: function() {
    return JSON.stringify(this)
  },

  hasOrganization: function() {
    return !!this.get("organization_id")
  },

  getSharedBoardId: function(callback) {
    var org_id = this.get("organization_id")
    // TODO: Move creation of models to its controller
    // Instead create an event that the controller can have a callback for
    var org = new MrelloApp.Models.Organization({ id: org_id })

    var self = this
    // TODO: refactor, this should not be necessary and is a design issue
    // we want this information available in context
    org.fetch({
      success: function(model, response, options) {
        console.log("Org fetch succeeded. Firing callback.")
        $.ajax('/api/v1/shared', {
          
        })
      },
      error: function(model, response, options) {
        console.log("Org fetch failed.")
      }
    })
  }
});