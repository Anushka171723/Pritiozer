const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const MONGO_URL = "mongodb://127.0.0.1:27017/timeManagement";
const Task = require('./models/task'); // Import Task model

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));


main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}


app.get('/prioritime', async (req, res) => {
  // Fetch tasks by quadrant
  const tasks = {
      importantUrgent: await Task.find({ quadrant: 'importantUrgent' }),
      importantNotUrgent: await Task.find({ quadrant: 'importantNotUrgent' }),
      notImportantUrgent: await Task.find({ quadrant: 'notImportantUrgent' }),
      notImportantNotUrgent: await Task.find({ quadrant: 'notImportantNotUrgent' }),
  };

  // Render tasks to the EJS template
  res.render('index', { tasks });
});


//Home route
// app.get('/', async (req, res) => {
//     // Fetch tasks by quadrant
//     const tasks = {
//         importantUrgent: await Task.find({ quadrant: 'importantUrgent' }),
//         importantNotUrgent: await Task.find({ quadrant: 'importantNotUrgent' }),
//         notImportantUrgent: await Task.find({ quadrant: 'notImportantUrgent' }),
//         notImportantNotUrgent: await Task.find({ quadrant: 'notImportantNotUrgent' }),
//     };
    
//     // Render tasks to the EJS template
//     res.render('index', { tasks });
// });

app.get('/add-task', async (req, res) => {
  const taskId = req.query.id;
  const task = taskId ? await Task.findById(taskId) : null;
  res.render('add-task', { task });
});

// Add/Edit Task POST Handler
app.post('/add-task', async (req, res) => {
  const { id, title, description, quadrant } = req.body;
  try {
    if (id) {
      // Update existing task
      await Task.findByIdAndUpdate(id, { title, description, quadrant });
    } else {
      // Add new task
      const newTask = new Task({ title, description, quadrant });
      await newTask.save();
    }
    // Redirect back to prioritime page after operation
    res.redirect('/prioritime');
  } catch (err) {
    console.error(err);
    res.redirect('/prioritime'); // Handle error gracefully
  }
});

app.get('/mark-completed/:id', async (req, res) => {
  res.send(`Task ID to be marked as completed: ${req.params.id}`);
});

// app.post('/mark-completed/:id', async (req, res) => {
//   console.log(`Marking task ${req.params.id} as completed`);
//   try {
//       const task = await Task.findById(req.params.id);
//       if (!task) {
//           console.error('Task not found');
//           return res.status(404).send('Task not found');
//       }
//       task.completed = !task.completed;
//       await task.save();
//       res.redirect('/');
//   } catch (err) {
//       console.error(err);
//       res.status(500).send('Error marking task as completed.');
//   }
// });






// Delete Task Route
app.get('/delete-task', async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.redirect('/prioritime'); // Redirect if no ID is provided
    }

    await Task.findByIdAndDelete(id); // Delete task by ID
    console.log(`Task with ID ${id} deleted successfully`);
    res.redirect('/prioritime'); // Redirect to prioritime page
  } catch (err) {
    console.error(`Error deleting task: ${err}`);
    res.redirect('/prioritime'); // Redirect on error
  }
});

// Edit Task Route - Render the edit form
app.get('/edit-task', async (req, res) => {
  const taskId = req.query.id; // Fetch the task ID from query parameters
  if (!taskId) {
    return res.redirect('/'); // Redirect to home if no ID is provided
  }

  try {
    const task = await Task.findById(taskId); // Fetch task details from the database
    if (!task) {
      return res.redirect('/'); // Redirect if task is not found
    }
    res.render('edit-task', { task }); // Render the edit-task template with the fetched task
  } catch (err) {
    console.error(err);
    res.redirect('/'); // Redirect to home on error
  }
});

// Edit Task POST Route - Handle form submission
app.post('/edit-task', async (req, res) => {
  const { id, title, description, quadrant } = req.body;
  try {
    if (id) {
      // Update existing task
      await Task.findByIdAndUpdate(id, { title, description, quadrant });
    }
    // Redirect back to prioritime page after operation
    res.redirect('/prioritime');
  } catch (err) {
    console.error(err);
    res.redirect('/prioritime'); // Handle error gracefully
  }
});
// app.post('/mark-completed/:id', async (req, res) => {
//   const taskId = req.params.id;
  
//   // Mark task as completed or uncompleted in the database
//   const task = await Task.findById(taskId);
//   task.completed = !task.completed;  // Toggle task completion
//   await task.save();

//   // Respond with success
//   res.json({ success: true });
// });

app.post('/mark-completed/:id', async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!taskId) {
      return res.redirect('/prioritime'); // Redirect if no task ID
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.redirect('/prioritime'); // Redirect if task not found
    }

    task.completed = !task.completed; // Toggle the completion status
    await task.save();
    console.log(`Task with ID ${taskId} marked as ${task.completed ? 'completed' : 'incomplete'}`);
    res.redirect('/prioritime'); // Redirect to prioritime page
  } catch (error) {
    console.error(`Error marking task as completed: ${error}`);
    res.redirect('/prioritime'); // Redirect on error
  }
});



app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
