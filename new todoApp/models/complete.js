const mongoose = require('mongoose');
// Schema for task, allowing us to create the tasks collection
// put under model as per the instructions of the MVC concept. 
// the model should be a model of the data that's represented in the database.
const taskSchema = {
    user: String,
    task: String,
    deadline: String
};

module.exports = mongoose.model('Complete', taskSchema)