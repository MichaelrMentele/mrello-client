// OrganizationNew === Org Registration Page

// Subviews:
// Registration -> Form

var MrelloApp = MrelloApp || {}

MrelloApp.views.OrganizationsNew = Backbone.View.extend({

  template: MrelloApp.templates['organizations/new'],
  
  registerForm: MrelloApp.templates['organizations/form'],

  events: {
    "click #submit-registration" : "submit",
    "click #cancel-registration" : "navigateToBoard"
  },  

  initialize: function() {
    this.render()
  },

  render: function() {
    this.renderHeader()
    this.$el.append(this.template())
    this.renderForm()
  },

  renderHeader: function() {
    adminStatus = MrelloApp.currentUser.isAdmin()
    var headerView = new MrelloApp.views.Header({ 
      session: true, 
      admin: adminStatus,
      createOrg: true,
    })
    this.$el.append(headerView.el)
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
        debugger;
      },
      error: function(model, response, options) {
        debugger;
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