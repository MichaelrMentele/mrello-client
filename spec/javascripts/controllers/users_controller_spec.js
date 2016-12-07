describe('Users controller', function() {

  describe('new', function() {
    beforeEach(function() {
      loadFixtures('appContainer.html')
      createEventBus.apply(this)
    })

    it("renders a page", function() {
      var controller = createUsersController()
      this.events.trigger("users:new")

      expect($("#logo")[0]).toBeInDOM()
      expect($("#submit-registration")[0]).toBeInDOM()
    })

    it("fires new callback on event", function() {
      sinon.stub(MrelloApp.Controllers.Users.prototype, 'new')

      var controller = createUsersController()
      this.events.trigger("users:new")
      
      expect(controller.new.called).toEqual(true)
      
      MrelloApp.Controllers.Users.prototype.new.restore()
    })   
  });

  describe('create', function() {

    describe('success', function() {
      beforeEach(function() {
        // Setup
        createFakeUsersServer.apply(this)

        prepareSession()
        createEventBus.apply(this)
        createUsersController.apply(this)
        
        this.redirectSpy = listenerSpy(this.events, "routes:go")

        // trigger create event on controller
        this.events.trigger("users:create", {
          fullname: "john",
          email: "john@ex.com", 
          password: "pass"
        })

        this.server.respond()
      })

      afterEach(function() {
        cleanupFakeServer.apply(this)
      });

      it("calls the server", function() {
        expect(this.server.requests[0].method).toEqual("POST")
        expect(this.server.requests[0].url).toEqual(MrelloApp.HOST_URL + "/api/v1/users")
      })

      it("creates a user", function() {
        expect(MrelloApp.session.currentUser.id).toBeDefined()
      })

      it("clears sensitive user information from user object", function() {
        expect(MrelloApp.session.currentUser.isSafe()).toEqual(true)
      })

      it("sets a flash message", function() {
        expect(MrelloApp.hasFlash()).toEqual(true)
      })

      it("redirects to the home page", function() {
        expect(this.redirectSpy.called).toEqual(true)
      })
    });

    describe('error', function() {
      
    });
  });

  describe('cache', function() {
    
  });
});

function createUsersController() {
  this.controller = new MrelloApp.Controllers.Users()
  return this.controller
}

function createFakeUsersServer(valid=true) {
  this.server = sinon.fakeServer.create();

  var createUrl = MrelloApp.HOST_URL + "/api/v1/users"
  var JSONheader = {"Content-Type": "application/json"}

  var successResponseBody = JSON.stringify({
    "message" : "User created!",
    "user": {
      "id" : "1",
      "fullname": "name"
    }
  })

  var errorResponseBody = JSON.stringify({
    "message" : "There was a problem with your inputs."
  })

  if(valid) {
    this.server.respondWith("POST", createUrl, [200, JSONheader, successResponseBody]);
  } else {
    this.server.respondWith("POST", createUrl, [406, JSONheader, errorResponseBody])
  }
}
