function createEventBus() {
  this.events = MrelloApp.initializeEventBus()
  return this.events
}

function cleanupFakeServer() {
  this.server.restore();
}

function listenerSpy(object, event) {
  var spy = sinon.spy()
  object.listenTo(object, event, spy)
  return spy
}

function prepareSession() {
  MrelloApp.initializeSession()
  MrelloApp.session.clear()
}