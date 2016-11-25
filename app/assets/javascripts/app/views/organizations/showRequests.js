var MrelloApp = MrelloApp || {}

MrelloApp.views.OrganizationRequests = Backbone.View.extend({

  template: MrelloApp.templates['organizations/showRequests'],

  className: "join-requests",

  initialize: function() {
    console.log("Rendering join requests.")

    this.render()
    this.bindEvents()
  },

  bindEvents: function() {
    _.extend(this, Backbone.Events)
    this.listenTo(this.model, 'add remove change', this.render.bind(this))
  },

  render: function() {
    this.renderHeader()
    this.$el.append( this.template() ) 
    this.renderRequests()
    return this
  },

  renderHeader: function() {
    adminStatus = MrelloApp.currentUser.isAdmin()
    var headerView = new MrelloApp.views.Header({ 
      session: true, 
      admin: adminStatus,
    })
    this.$el.append(headerView.el)
  },

  renderRequests: function() {
    console.log("Rendering orgs")
    this.model.get("join_requests").each(this.renderJoinRequestView, this)
  },

  renderJoinRequestView: function(joinRequest) {
    var requestView = new MrelloApp.views.JoinRequest({
                     model: joinRequest,
                   })
    this.$el.find("#join-requests-index").append(requestView.el)
  },
})