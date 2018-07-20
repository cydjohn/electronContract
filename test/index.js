const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')

describe('Application launch', function () {
  this.timeout(10000)
  let app
  beforeEach(function () {
    app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..')]
    })
    this.app = app
    return this.app.start()
  })

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  // it('shows an initial window', function () {
  //   return this.app.client.getWindowCount().then(function (count) {
  //     assert.equal(count, 1)
  //   })
  // })

  it('log in',  function () {
    return app.client.element('#pass')
    .then(function (pass) {
      pass.value = '1234' 
      return app.client.element('#get-started').click()
    })
    .then(function (){
      return app.client.element('#wrongPass').isVisible()
      // .isVisible('#wrongPass').should.eventually.be.true
    })
    .then(function (visible) {
      assert(visible,true)
      return app.client.element('#pass')
    })
    .then(function (pass) {
      pass.value = '123456' 
      app.client.elementIdText('get-started').click()
      return
    })

  })
})