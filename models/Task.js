const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Task title is required"],
        trim: true
    },

    description: {
        type: String,
        default: ""
    },

    completed: {
        type: Boolean,
        default: false
    },

    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save hook
taskSchema.pre("save", async function() {
    if (this.title) {
        this.title = this.title.trim();
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;