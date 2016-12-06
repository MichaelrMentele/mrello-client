describe('New flash messages region view', function() {

  beforeEach(function() {
    this.view = new MrelloApp.Views.MessageRegions.Flash()
  })

  describe("attributes", function() {
    it("has a form template", function() {
      expect(this.view.template).toBeDefined()
    })

    it("has an appropriate id", function() {
      expect(this.view.id).toEqual("flash-messages")
    })
  })
  
  describe('#render action', function() {
    it("returns this", function() {
      expect(this.view.render().el).toBeDefined()
    })

    it("renders a div#flash-messages", function() {
      expect(this.view.render().$el).toHaveId('flash-messages')
    })

    it("renders the alert", function() {
      expect(this.view.$el.find('.alert')).toBeDefined()
    })
  });
});