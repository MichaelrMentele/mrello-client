describe('New Session Page View', function() {

  beforeEach(function() {
    this.sessionView = new MrelloApp.Views.BodyRegions.SessionsNew()
  })

  describe("attributes", function() {
    it("has a form template", function() {
      expect(this.sessionView.template).toBeDefined()
    })

    it("has a class of window", function() {
      expect(this.sessionView.className).toEqual("window")
    })
  })
  
  describe('#render action', function() {
    it("returns this", function() {
      expect(this.sessionView.render().el).toBeDefined()
    })

    it("renders a div.window", function() {
      expect(this.sessionView.render().$el).toHaveClass('window')
    })

    it("renders the form", function() {
      expect(this.sessionView.$el.find('form')).toBeDefined()
    })
  });

  describe("events", function() {
    beforeEach(function() {
      MrelloApp.initializeEventBus()
      this.eventSpy = sinon.spy()
    })

    it("on clicking submit button it fires a callback", function() {
      MrelloApp.eventBus.on('sessions:create', this.eventSpy )

      this.sessionView.$el.find("#submit-login").click()

      expect(this.eventSpy).toHaveBeenCalled()
    })

    it("on clicking registration link it fires a callback", function() {
      MrelloApp.eventBus.on('routes:go', this.eventSpy )

      this.sessionView.$el.find("#navigate-to-registration").click()

      expect(this.eventSpy).toHaveBeenCalled()
    })
  })
});