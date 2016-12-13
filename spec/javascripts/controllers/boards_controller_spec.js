describe('Boards controller', function() {
  
  xdescribe("index", function() {
    describe('fetch success', function() {
      describe('renders header', function() {
        
      });

      describe('renders page', function() {
        
      });
    });

    describe('fetch error', function() {
      beforeEach(function() {
        // Setup
        loadFixtures('appContainer.html')
        indexFakeBoardsServer.apply(this, [false])
        createEventBus.apply(this)
        createBoardsController.apply(this)
        prepareSession() 
        
        this.redirectSpy = listenerSpy(this.events, "routes:go")

        // Actions
        this.events.trigger("boards:index")

        this.server.respond()
      })

      afterEach(function() {
        cleanupFakeServer.apply(this)
      })

      it("renders a flash message", function() {
        expect($(".alert-warning")).toBeInDOM()
      })

      it("redirects", function() {
        expect(this.redirectSpy).toHaveBeenCalled()
      })
    });
  });

  describe('create', function() {
    describe("successful", function() {

      beforeEach(function() {
        // Setup
        loadFixtures('appContainer.html')
        createFakeBoardsServer.apply(this)
        createEventBus.apply(this)
        createBoardsController.apply(this)
        prepareSession() 
        
        this.redirectSpy = listenerSpy(this.events, "routes:go")

        // Actions
        this.events.trigger("boards:create", {
          title: "Test",
        })

        this.server.respond()
      })

      afterEach(function() {
        cleanupFakeServer.apply(this)
      })

      it("calls the server", function() {
        expect(this.server.requests[0].method).toEqual("POST")
        expect(this.server.requests[0].url).toEqual(MrelloApp.HOST_URL + "/api/v1/boards")
      })

      it("renders a flash message", function() {
        expect($(".alert-success")).toBeInDOM()
      })
    })
    
    describe('error', function() {
      beforeEach(function() {
        // Setup
        loadFixtures('appContainer.html')
        createFakeBoardsServer.apply(this, [false])
        createEventBus.apply(this)
        createBoardsController.apply(this)
        prepareSession() 
        
        this.redirectSpy = listenerSpy(this.events, "routes:go")

        // Actions
        this.events.trigger("boards:create", {
          title: "Test",
        })

        this.server.respond()
      })

      afterEach(function() {
        cleanupFakeServer.apply(this)
      })

      it("renders a flash message", function() {
        expect($(".alert-warning")).toBeInDOM()
      })
    });
  })

  xdescribe('show', function() {
    describe('fetching the lists for the board', function() {
      describe("success", function() {
        it("renders the page")
        it("fetches the lists for the board")
        it("renders the appropriate navigation")
      })

      describe('error', function() {
        it("redirects to login page")
        it("renders a flash message")
      });
    });
  });
})

function createBoardsController() {
  this.controller = new MrelloApp.Controllers.Boards()
  return this.controller
}

function createFakeBoardsServer(valid=true) {
  this.server = sinon.fakeServer.create();

  var createUrl = MrelloApp.HOST_URL + "/api/v1/boards"
  var JSONheader = {"Content-Type": "application/json"}

  var successResponseBody = JSON.stringify({
    "message" : "Board created.", 
    "board" : {
      "title" : "Board name",
      "id"    : "1"
    }  
  })

  var errorResponseBody = JSON.stringify({
    "message" : "There was a problem."
  })

  if(valid) {
    this.server.respondWith("POST", createUrl, [200, JSONheader, successResponseBody]);
  } else {
    this.server.respondWith("POST", createUrl, [406, JSONheader, errorResponseBody])
  }
}

function indexFakeBoardsServer(valid=true) {
  this.server = sinon.fakeServer.create();

  var createUrl = MrelloApp.HOST_URL + "/api/v1/boards"
  var JSONheader = {"Content-Type": "application/json"}

  var successResponseBody = JSON.stringify({
    "message" : "Boards retrieved for owner.",
    "boards" : [
      { "title" : "Example 1" },
      { "title" : "Example 2" },
      { "title" : "Example 3" },
    ]
    
  })

  var errorResponseBody = JSON.stringify({
    "message" : "There was a problem."
  })

  if(valid) {
    this.server.respondWith("GET", createUrl, [200, JSONheader, successResponseBody]);
  } else {
    this.server.respondWith("GET", createUrl, [406, JSONheader, errorResponseBody])
  }
}