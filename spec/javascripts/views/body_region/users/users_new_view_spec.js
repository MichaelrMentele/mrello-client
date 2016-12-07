describe('New User (registration) Page View', function() {

  beforeEach(function() {
    this.userView = new MrelloApp.Views.BodyRegions.UsersNew()
  })

  describe("attributes", function() {
    it("has a form template", function() {
      expect(this.userView.template).toBeDefined()
    })

    it("has a class of window", function() {
      expect(this.userView.className).toEqual("window")
    })
  })
  
  describe('#render action', function() {
    it("returns this", function() {
      expect(this.userView.render().el).toBeDefined()
    })

    it("renders a div.window", function() {
      expect(this.userView.render().$el).toHaveClass('window')
    })

    it("renders the form", function() {
      expect(this.userView.$el.find('form')).toBeDefined()
    })
  });

  describe("events", function() {
    beforeEach(function() {
      MrelloApp.initializeEventBus()
      this.eventSpy = sinon.spy()
    })

    it("on clicking submit button it fires a callback", function() {
      MrelloApp.eventBus.on('users:create', this.eventSpy )

      this.userView.$el.find("#submit-registration").click()

      expect(this.eventSpy).toHaveBeenCalled()
    })

    it("on clicking registration link it fires a callback", function() {
      MrelloApp.eventBus.on('routes:go', this.eventSpy )

      this.userView.$el.find("#navigate-to-login").click()

      expect(this.eventSpy).toHaveBeenCalled()
    })
  })
});