const taskEvents = require("./events");

taskEvents.on("task-created", (task) => {
    console.log("[Notification] Handler started at:",
        new Date().toISOString());

    setTimeout(() => {
        console.log("[Notification] New task created");
        console.log("Task title:", task.title);
        console.log("Timestamp:", new Date().toISOString());
        console.log("Assigned user:", task.assignedUser || "Not specified");
        console.log("[Notification] Handler completed at:",
            new Date().toISOString());
    }, 2000);
});
