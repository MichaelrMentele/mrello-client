// Organizations === Org index page

// Subviews:
// Organization Partial

var MrelloApp = MrelloApp || {}

MrelloApp.views.OrganizationsIndex = Backbone.View.extend({

  template: MrelloApp.templates['organizations/index'],

  className: "organizations",

  initialize: function(options) {
    console.log("Rendering organizations view.")
    this.organizations = MrelloApp.organizations
    this.render()
    this.bindEvents()
  },

  bindEvents: function() {
    _.extend(this, Backbone.Events)
    this.listenTo(this.organizations, 'add remove change', this.render.bind(this))
  },

  render: function() {
    this.renderHeader()
    this.$el.append( this.template() ) 
    this.renderOrganizations()
    return this
  },

  renderHeader: function() {
    adminStatus = MrelloApp.currentUser.isAdmin()
    var headerView = new MrelloApp.views.Header({ 
      session: true, 
      admin: adminStatus,
      orgIndex: true,
    })
    this.$el.append(headerView.el)
  },

  renderOrganizations: function() {
    console.log("Rendering orgs")
    this.organizations.each(this.renderOrgView, this)
  },

  renderOrgView: function(organization) {
    var orgView = new MrelloApp.views.Organization({
                     model: organization,
                   })
    this.$el.find("#organizations-index").append(orgView.el)
  },
})