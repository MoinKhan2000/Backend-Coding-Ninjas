import { log } from "console";
import { UserEvents } from "./userEvents.mjs";

const userEvents = new UserEvents();

function saveToDatabase() {
    log('Save to database')
}

function sendNotifications() {
    log('Sending notifications')
}

function updateTimeLine() {
    log('Updating time line')
}
userEvents.addListener('postCreated', saveToDatabase);
userEvents.addListener('postCreated', sendNotifications)
userEvents.addListener('postCreated', updateTimeLine)

userEvents.createPost('This is my first post')


// Advantages of event driven architecture.
// 1. Scalability.
// 2. Loose Coupling.
// 3. Better responsiveness.

// Best Practices.
// 1. Modularize the code.
// 2. Remove unnecessary dependencies from the code.
// 3. Keep module responsibilities clear and clean.
// 4. Use Version Control Like Github.
// 5. Use Descriptive Naming Convention.