describe('New Session View', function() {
  beforeEach(function() {
    this.sessionView = new MrelloApp.Views.Sessions.New()
  })

  it("has a form template", function() {
    expect(this.sessionView.template).toBeDefined()
  })

  it("has an id of login")
  it("has a tag of main")

  describe('#render action', function() {
    it("returns this")
    it("puts el into the DOM")
    it("renders the form")
  });

  describe("bound events", function() {
    it("on submit it publishes a login event")
    it("on submit it passes the user info")
    it("on registration link it publishes a navigation event")
  })
});