// OrganizationNew === Org Registration Page

// Subviews:
// Registration -> Form

var MrelloApp = MrelloApp || {};

MrelloApp.views.OrganizationsNew = Backbone.View.extend({

  template: MrelloApp.templates['organizations/new'],
  
  registerForm: MrelloApp.templates['organizations/form'],

  events: {
    "click #submit-registration" : "submit",
    "click #cancel-registration" : "navigateToBoard"
  },  

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template());
    this.renderForm();
  },

  renderForm: function() {
    this.$el.find("#organization-registration").html(this.registerForm());
    return this;
  },

  submit: function(e) {
    e.preventDefault();

    console.log("Attempting to create organization");

    var organization = new MrelloApp.models.Organization(this.formInputs());
    organization.save({}, {
      success: function(model, response, options){
        console.log(response.message);
        MrelloApp.routes.navigate("", { trigger: true } )
      }, 
      error: function(model, response, options) {
        console.log(response.message);
      }
    })
  },

  navigateToBoard: function(e) {
    e.preventDefault();
    MrelloApp.routes.navigate("", { trigger: true });
  },

  formInputs: function() {
    var inputs = {};
    inputs.title = $("#inputTitle").val();
    return inputs
  }
});