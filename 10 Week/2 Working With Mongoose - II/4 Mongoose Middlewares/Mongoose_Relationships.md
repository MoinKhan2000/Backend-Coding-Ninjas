
# Relationships Between Documents in Mongoose

## One-to-One Relationship

In a one-to-one relationship, each document in one collection is related to one and only one document in another collection. This is often implemented using a reference (ObjectId) from one document to another.

### Example

Let's assume we have `User` and `Profile` models where each user has one profile:

```javascript
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  bio: String,
  website: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
});

const User = mongoose.model('User', userSchema);
const Profile = mongoose.model('Profile', profileSchema);
```

### Usage

To create a user with a profile:

```javascript
const user = new User({ name: 'John Doe', email: 'john@example.com' });
await user.save();

const profile = new Profile({ bio: 'Web Developer', website: 'johndoe.com', user: user._id });
await profile.save();

user.profile = profile._id;
await user.save();
```

To populate the profile when retrieving a user:

```javascript
const userWithProfile = await User.findById(user._id).populate('profile');
console.log(userWithProfile);
```

## One-to-Many Relationship

In a one-to-many relationship, a document in one collection can have many related documents in another collection. This is commonly used when a parent document has multiple child documents.

### Example

Consider a `User` and `Post` model where a user can have multiple posts:

```javascript
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);
```

### Usage

To create posts for a user:

```javascript
const user = new User({ name: 'Jane Doe', email: 'jane@example.com' });
await user.save();

const post1 = new Post({ title: 'My First Post', content: 'Hello World!', author: user._id });
const post2 = new Post({ title: 'My Second Post', content: 'Another post.', author: user._id });

await post1.save();
await post2.save();

user.posts.push(post1._id, post2._id);
await user.save();
```

To populate posts when retrieving a user:

```javascript
const userWithPosts = await User.findById(user._id).populate('posts');
console.log(userWithPosts);
```

## Many-to-Many Relationship

In a many-to-many relationship, documents in both collections can have multiple relationships with each other. This is often implemented using an array of references in both documents.

### Example

Consider a `Student` and `Course` model where a student can enroll in many courses and a course can have many students:

```javascript
const studentSchema = new mongoose.Schema({
  name: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const courseSchema = new mongoose.Schema({
  title: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

const Student = mongoose.model('Student', studentSchema);
const Course = mongoose.model('Course', courseSchema);
```

### Usage

To enroll students in courses:

```javascript
const student1 = new Student({ name: 'Alice' });
const student2 = new Student({ name: 'Bob' });

await student1.save();
await student2.save();

const course1 = new Course({ title: 'Math 101' });
const course2 = new Course({ title: 'History 101' });

await course1.save();
await course2.save();

student1.courses.push(course1._id, course2._id);
student2.courses.push(course1._id);

await student1.save();
await student2.save();

course1.students.push(student1._id, student2._id);
course2.students.push(student1._id);

await course1.save();
await course2.save();
```

To populate courses when retrieving a student:

```javascript
const studentWithCourses = await Student.findById(student1._id).populate('courses');
console.log(studentWithCourses);
```

To populate students when retrieving a course:

```javascript
const courseWithStudents = await Course.findById(course1._id).populate('students');
console.log(courseWithStudents);
```
