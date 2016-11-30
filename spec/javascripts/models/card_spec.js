describe("Card model", function () {
  describe("creation", function() {
    it("has default values", function () {
      var model = new MrelloApp.models.Card()

      expect(model.get("title")).toEqual("Card")
      expect(model.get("description")).toEqual("")
    })

    it("sets passed attributes", function () {
      var model = new MrelloApp.models.Card({
        title: "Card A",
        description: "* Milk\n* Eggs\n*Coffee"
      })

      expect(model.get("title")).toEqual("Card A")
      expect(model.get("description")).toEqual("* Milk\n* Eggs\n*Coffee")
    })

    describe("as part of a collection", function() {
      beforeEach(function() {
        // Should stub these dependencies
        this.list = new MrelloApp.models.List({title: "Smart"})
        this.list.cards.create({})
      })

      it("stores a reference to its parent list", function() {
        debugger;
        expect()
      })

      it("initializes comments collection", function() {

      })

      it("initializes cards collection")
    })
  })
})