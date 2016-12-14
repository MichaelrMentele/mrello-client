// OrganizationNew === Org Registration Page

// Subviews:
// Registration -> Form

var MrelloApp = MrelloApp || {}

MrelloApp.Views.BodyRegions.OrganizationsNew = Backbone.View.extend({

  template: MrelloApp.templates['body_regions/organizations/new'],
  
  registerForm: MrelloApp.templates['body_regions/organizations/form'],

  events: {
    "click #submit-registration" : "submit",
    "click #cancel-registration" : "navigateToBoard"
  },  

  initialize: function() {
    this.render()
  },

  render: function() {
    this.$el.append(this.template())
    this.renderForm()
  },

  renderForm: function() {
    this.$el.find("#organization-registration").html(this.registerForm())
    return this
  },

  submit: function(e) {
    e.preventDefault()
    console.log("Attempting to create organization")

    MrelloApp.organizationsController.trigger("create", this.formInputs())

    MrelloApp.currentUser.fetch({
      success: function(model, response, options) {
        console.log("Current user info refreshed.")
      },
      error: function(model, response, options) {
        console.log("Problem fetching new user info.")
      }
    })
  },

  navigateToBoard: function(e) {
    e.preventDefault()
    MrelloApp.routes.navigate("", { trigger: true })
  },

  formInputs: function() {
    var inputs = {}
    inputs.title = $("#inputTitle").val()
    return inputs
  }
})