describe('Board tile atomic view', function() {

  beforeEach(function() {
    var board = new MrelloApp.Models.Board({ title: "Something" })
    this.view = new MrelloApp.Views.Atomics.BoardTile({ model: board })
  })

  describe("attributes", function() {
    it("has a form template", function() {
      expect(this.view.template).toBeDefined()
    })

    it("has a class of board-tile", function() {
      expect(this.view.className).toEqual("board-tile-wrapper")
    })
  })
  
  describe('#render action', function() {
    it("returns this", function() {
      expect(this.view.render().el).toBeDefined()
    })

    it("renders the tile", function() {
      expect(this.view.$el.find('form')).toBeDefined()
    })
  });

  describe("events", function() {
    beforeEach(function() {
      MrelloApp.initializeEventBus()
      this.eventSpy = sinon.spy()
    })

    it("on clicking the board fires a callback", function() {
      MrelloApp.eventBus.on('boards:show', this.eventSpy )

      this.view.$el.find(".board-tile").click()

      expect(this.eventSpy).toHaveBeenCalled()
    })
  })
});