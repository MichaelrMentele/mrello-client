describe('Board create atomic view', function() {

  beforeEach(function() {
    this.view = new MrelloApp.Views.Atomics.BoardsCreate()
  })

  describe("attributes", function() {
    it("has a form template", function() {
      expect(this.view.template).toBeDefined()
    })

    it("has a class of board-tile-wrapper", function() {
      expect(this.view.className).toEqual("board-tile-wrapper")
    })
  })
  
  describe('#render action', function() {
    it("returns this", function() {
      expect(this.view.render().el).toBeDefined()
    })

    it("renders the template", function() {
      expect(this.view.$el.find('#create-board')).toBeDefined()
    })
  });

  describe("events", function() {
    beforeEach(function() {
      MrelloApp.initializeEventBus()
    })

    it("clicking the create button tells the boards controller", function() {
      var spy = sinon.spy()
      MrelloApp.eventBus.on("boards:create", spy)

      this.view.$el.find("#create-board").click()

      expect(spy).toHaveBeenCalled()
    })
  })
});