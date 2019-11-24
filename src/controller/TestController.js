import TestModel from "../schemas/test"

class TestController {

  index(req, res) {
    console.log('test')
    return res.send('ok')
  }
}


export default TestController;