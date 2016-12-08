describe('Boards index region view', function() {

  beforeEach(function() {
    var boards = new MrelloApp.Collections.Boards()

    boards.add([
      {title: "Board A"},
      {title: "Board B"},
      {title: "Board C"}
    ])

    this.view = new MrelloApp.Views.BodyRegions.BoardsIndex({collection: boards})
  })

  describe("attributes", function() {
    it("has a class of boards-wrapper", function() {
      expect(this.view.className).toEqual("boards-wrapper")
    })
  })
  
  describe('#render action', function() {
    it("returns this", function() {
      expect(this.view.render().el).toBeDefined()
    })

    it("renders a tile view for each board", function() {
      
      expect(this.view.$el.find('.board-tile').length).toEqual(3)
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