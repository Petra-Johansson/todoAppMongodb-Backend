const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const Complete = require("../models/complete");

//js document for all endpoints, a controller should accoring to the MVC concept
// contain all the code that handles in/output from the API.


// ENDPOINT for creating a task in the database
// if statement checks that all the required data is present otherwise it sends
// back error code 400 and a error message.
router.post('/createTask', async (req, res) => {
    if(req.body.user && req.body.task && req.body.deadline) {
        const data = req.body;

        const task = new Task({
            user: data.user,
            task: data.task,
            deadline: data.deadline
        });
        await task.save();
        res.send(task);
    } else {
        res.status(400);
        res.send({ error: "Fields can not be left blank."})
    }

});

// ENDPOINT for updating task in the database, it selects task based on ID input in
// request body, it then checks the body for the different attributes used in the
// schema and updates that value if present.
router.patch('/updateTask/:id', async (req, res) => {
    try {
		const task = await Task.findOne({ _id: req.params.id });

        if(req.body.user) {
            task.user = req.body.user;
        }

		if (req.body.task) {
			task.task = req.body.task;
		}

		if (req.body.deadline) {
			task.deadline = req.body.deadline;
		}

		await task.save();
		res.send(task);
	} catch {
		res.status(404);
		res.send({ error: "Task doesn't exist!" });
	}
});

// ENDPOINT for delete, if else if checks if you want to delete something from
// complete or task. The user of the endpoint needs to specify from which
// collection it wants to delete
router.delete('/delete', async (req, res) => {
    try {
        if(req.body.subject === "task") {
		await Task.deleteOne({ _id: req.body._id  });
		res.status(204).send();
        }
        else if(req.body.subject === "complete") {
            await Complete.deleteOne({ _id: req.body._id  });
            res.status(204).send();
        }
	}
    catch {
		res.status(404);
		res.send({ error: "Task doesn't exist!" });
	}
});

//ENDPOINT for showing all tasks
router.get('/showTask', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});
//ENDPOINT for showing all complete tasks
router.get('/showComplete', async (req, res) => {
    const completes = await Complete.find();
    res.send(completes);
});

//ENDPOINT for showing a task by id. basically a seach by ID endpoint.
router.get('/showTask', async (req, res) => {
    try {
        const task = await Task.findOne({_id: req.body._id});
        res.send(task);
    } catch {
        res.status(404);
        res.send({ error: "Task does not exist."});
    }

});

//ENDPOINT for moving a documents data from the tasks collection to the completes
// collection.
router.patch('/taskComplete', async (req, res) => {
    try {
        let task = await Task.findOne({ _id: req.body._id });
        let complete = new Complete({
                user: task.user,
                task: task.task,
                deadline: task.deadline
            });
           await complete.save();
           await Task.deleteOne({ _id: req.body._id});
           res.status(201).send();
           
    } catch {
        res.status(404);
        res.send({ error: "Task does not exist."});
    }

});

module.exports = router;