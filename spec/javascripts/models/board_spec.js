describe("Board model", function() {
  it("has an appropriate url", function() {
    var board = new MrelloApp.Models.Board()
    expect(board.url).toEqual("/api/v1/boards")
  })
})