import mongoose, { Schema } from 'mongoose';


const TestSchema = new Schema({
  testFiled : {
    type : String, 
    required : true
  },
}, {
  timestamp : true
})

const TestModel = mongoose.model("Test",TestSchema)

export default TestModel;

