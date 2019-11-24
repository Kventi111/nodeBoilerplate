import TestModel from "../schemas/test"

class TestController {

  index(req, res) {
    const id = req.params.id;

    TestModel.findById(id,function(err,user) {
      if (err) res.status(404).send("notFound")
    
      res.json(user)
    })
  }
}


export default TestController;