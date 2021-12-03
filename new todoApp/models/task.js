const mongoose = require('mongoose');
// Schema for complete, allowing us to create the completes collection
// put under model as per the instructions of the MVC concept. 
// the model should be a model of the data that's represented in the database.
const taskSchema = {
    user: String,
    task: String,
    deadline: String
};

module.exports = mongoose.model('Task', taskSchema)