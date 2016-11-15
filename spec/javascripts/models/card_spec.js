describe("App.models.Card", function () {
  it("has default values", function () {
    var model = new MrelloApp.models.Card();

    expect(model).to.be.ok;
    expect(model.get("title")).to.equal("Card");
    expect(model.get("description")).to.equal("");
  });

  it("sets passed attributes", function () {
    var model = new App.Models.Note({
      title: "Grocery List",
      text: "* Milk\n* Eggs\n*Coffee"
    });

    expect(model.get("title")).to.equal("Grocery List");
    expect(model.get("text")).to.equal("* Milk\n* Eggs\n*Coffee");
  });
});