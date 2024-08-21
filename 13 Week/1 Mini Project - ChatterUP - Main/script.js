const socket = io.connect('http://localhost:3000');

const userName = prompt('Enter your name:');
let profilePic = prompt('Enter the URL of your profile picture:');

if (!profilePic) {
  document.getElementById('user-avatar').textContent = userName.charAt(0).toUpperCase();
  document.getElementById('user-avatar').classList.add('avatar-placeholder');
} else {
  document.getElementById('user-avatar').style.backgroundImage = `url(${profilePic})`;
}

document.getElementById('user-name').textContent = "Welcome " + userName + "!";

socket.emit('new_user', { userName, profilePic });

let currentRoom = 'General';
socket.emit('join_room', currentRoom);

// Populate online users
socket.on('online_users', (users) => {
  // console.log(users);

  if (users.length == 1) {
    document.getElementById('count').textContent = 'No one is online.';
    return;
  }

  document.getElementById('count').innerText = (users.length - 1)

  const userList = document.getElementById('user-list');
  userList.innerHTML = '';
  users.forEach(user => {
    const userElement = document.createElement('li');

    // Skip rendering current user
    if (user.userName === userName) { return; }

    let avatarHTML = '';
    if (user.profilePic) {
      avatarHTML = `<div class="avatar" style="background-image: url('${user.profilePic}')"></div>`;
    } else {
      avatarHTML = `<div class="avatar avatar-placeholder">${user.userName.charAt(0).toUpperCase()}</div>`;
    }

    // Add status dot (green dot for active users)
    userElement.innerHTML = `
  ${avatarHTML}
  <span class="user-name">${user.userName}</span>
  <span class="status-dot active"></span> <!-- Add this for active status -->
  `;

    userList.appendChild(userElement);
  });
});

// Load chat history
socket.on('load_chat', (messages) => {
  const messageList = document.getElementById('message-list');
  messageList.innerHTML = '';
  messages.forEach(msg => displayMessage(msg));
});

// Display received messages
socket.on('message_received', (message) => {
  displayMessage(message);
});

// Handle typing indicator
socket.on('typing', (data) => {
  document.getElementById('typing-indicator').textContent = `${data.userName} is typing...`;
  setTimeout(() => document.getElementById('typing-indicator').textContent = 'Typing Indicator : ', 1000);
});

// Send a new message
document.getElementById('send-message').addEventListener('click', () => {
  const message = document.getElementById('message-input').value.trim();
  if (message) {
    socket.emit('new_message', { message, room: currentRoom });
    document.getElementById('message-input').value = '';
  }
});

// Notify server when typing
document.getElementById('message-input').addEventListener('input', () => {
  socket.emit('typing', currentRoom);
});


// Function to show notification
function showNotification(message) {
  const notificationPanel = document.getElementById('notification-panel');
  const notificationMessage = document.getElementById('notification-message');

  // Set the notification message
  notificationMessage.textContent = message;

  // Show the notification panel
  notificationPanel.classList.remove('hidden');
  notificationPanel.classList.add('visible');

  // Hide the notification after 2 seconds
  setTimeout(() => {
    notificationPanel.classList.remove('visible');
    notificationPanel.classList.add('hidden');
  }, 2000);
}

// Example: Trigger notification when someone joins
socket.on('new_user', (data) => {
  showNotification(`${data.userName} has joined the room`);
});



// Function to display messages
function displayMessage(message) {

  const audio = document.createElement('audio');
  audio.src = './sound.wav';
  audio.play();
  audio.remove()
  const messageList = document.getElementById('message-list');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  // console.log(message);

  if (message.sender === userName) {
    messageElement.classList.add('message-right');
  } else {
    messageElement.classList.add('message-left');
  }

  if (message.profilePic) {
    messageElement.innerHTML = `
          <div class="avatar" style="background-image: url('${message.profilePic}');"></div>
          <div class="message-content">
            <h4>${message.sender} <span>${new Date(message.createdAt).toLocaleTimeString()}</span></h4>
            <p>${message.message}</p>
          </div>
        `;
  } else {
    messageElement.innerHTML = `
          <div class="avatar avatar-placeholder">${message.sender.charAt(0).toUpperCase()}</div>
          <div class="message-content">
            <h4>${message.sender} <span>${new Date(message.createdAt).toLocaleTimeString()}</span></h4>
            <p>${message.message}</p>
          </div>
        `;
  }

  messageList.appendChild(messageElement);
  messageList.scrollTop = messageList.scrollHeight;
}