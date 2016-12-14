// Organizations === Org index page

// Subviews:
// Organization Partial

var MrelloApp = MrelloApp || {}

MrelloApp.Views.BodyRegions.OrganizationsUserIndex = Backbone.View.extend({

  template: MrelloApp.templates['body_regions/organizations/index'],

  className: "organizations",

  initialize: function(options) {
    console.log("Rendering organizations view.")
    this.render()
    this.bindEvents()
  },

  bindEvents: function() {
    this.listenTo(this.collection, 'add remove change', this.render.bind(this))
  },

  render: function() {
    var newButtonView = new MrelloApp.Views.Atomics.ButtonOrganizationsNew() 
    this.$el.append( newButtonView.el )
    this.$el.append( this.template({ title: "Your Memberships" }) ) 
    this.renderOrganizations()
    return this
  },

  renderOrganizations: function() {
    console.log("Rendering orgs")
    this.collection.each(this.renderOrgView, this)
  },

  renderOrgView: function(organization) {
    var orgView = new MrelloApp.Views.Atomics.MemberOrganization({
                     model: organization,
                   })
    this.$el.find("#organizations-index").append(orgView.el)
  },
})