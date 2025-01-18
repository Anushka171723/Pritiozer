// const mongoose = require('mongoose');

// const taskSchema = new mongoose.Schema({
//     quadrant: {
//         type: String,
//         required: true,
//         enum: ['importantUrgent', 'importantNotUrgent', 'notImportantUrgent', 'notImportantNotUrgent'],
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// module.exports = mongoose.model('Task', taskSchema);
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    quadrant: {
        type: String,
        enum: ['importantUrgent', 'importantNotUrgent', 'notImportantUrgent', 'notImportantNotUrgent'],
    },
    completed: { type: Boolean, default: false },
    
});

module.exports = mongoose.model("Task", taskSchema);
