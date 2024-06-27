import * as Event from 'events';
export class UserEvents extends Event.EventEmitter {
    createPost(content) {
        console.log('Post has been created!');
        this.emit('postCreated')
    }
}