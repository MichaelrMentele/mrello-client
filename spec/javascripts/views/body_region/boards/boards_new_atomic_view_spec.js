describe('Board new atomic view', function() {

  beforeEach(function() {
    var boards = new MrelloApp.Collections.Boards()
    var master = new MrelloApp.Views.BodyRegions.BoardsIndex(boards)
    this.view = new MrelloApp.Views.Atomics.BoardsNew()
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
      expect(this.view.$el.find('#new-board')).toBeDefined()
    })
  });
});