var MrelloApp = MrelloApp || {}

MrelloApp.Views.Composites.Cards = Backbone.View.extend({

  template: MrelloApp.templates["body_regions/lists/list/cards/cards"],

  // Sub Views
  addCardMenu: MrelloApp.templates["body_regions/lists/list/cards/add-card-menu"],
  addCardButton: MrelloApp.templates["body_regions/lists/list/cards/add-card-button"],

  tagName: "div",
  className: "cards",

  events: {
    "click .add-card-button" : "renderAddCardMenu",
    "click .cancel" : "renderAddCardButton",
    "click .button" : "addCard"
  },

  initialize: function(options) {
    console.log("Rendering cards view.")
    this.cards = options.cards
    this.render()
    this.bindEvents()
  },

  bindEvents: function() {
    _.extend(this, Backbone.Events)
    this.listenTo(this.cards, 'add remove change', this.render.bind(this))
    this.bindDropEvents()
  },

  bindDropEvents: function() {
    var self = this

    this.$el.on("dragenter", function(ev) {
      ev.preventDefault()
    })

    this.$el.on("dragover", function(ev) {
      ev.preventDefault()
      console.log("dragover zone")
    })

    this.$el.on("drop", function(ev) {
      ev.preventDefault()
      console.log("drop event fired")

      newCardAttributes = self.copyDroppedCardAttrs()
      self.cards.create(newCardAttributes, {at: MrelloApp.insertAt})

      MrelloApp.draggedObject.destroy({
        success: function(model, response, options) {
          console.log("Card successfully destroyed.")
        },
        error: function(model, response, options) {
          console.log("Error destroying card.")
        }
      })
      
    })
  },

  render: function() {
    this.$el.empty()
    this.$el.html(this.template()) 
    this.renderCards()
    this.renderAddCardButton()
    return this
  },

  renderCards: function() {
    console.log("Rendering cards")
    this.cards.each(this.renderCardView, this)
  },

  renderAddCardMenu: function(e) {
    e.preventDefault()
    console.log("Enter Card Title")
    this.$el.find(".add-card").html(this.addCardMenu())
    this.$el.find("input").focus()
  },

  renderAddCardButton: function(e) {
    if (e) { e.preventDefault() }
    this.$el.find(".add-card").html(this.addCardButton())
  },

  renderCardView: function(card) {
    var cardView = new MrelloApp.Views.Card({
                     model: card,
                   })
    this.$el.find(".card-list").append(cardView.el)
  },

  copyDroppedCardAttrs: function() {
    attrs = MrelloApp.draggedObject.attributes

    copy = {}
    copy.title = attrs.title
    copy.description = attrs.description

    return copy
  },
  
  addCard: function(e) {
    e.preventDefault()
    var $input = this.$el.find(".title-input")
    var title = $input.val()
    $input.val("") // clear input
    if (title != "") {
      var list_id = this.cards.parent.attributes.id
      this.cards.create( { title: title, list_id: list_id })
    }
  },
})
