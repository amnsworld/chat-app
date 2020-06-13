

// Listen for the 'submit' of a form
// 	 event.preventDefault()  (prevent the form from leaving the page)
//   Emit a message using "chatmsg"
// Listen for "chatmsg"
//   add a <li> with the chat msg to the <ol>

const $msgForm = document.getElementById('sendMsg')
const $msgList = document.getElementById('messages')
const $userNameForm = document.getElementById('userdetails')

const socket = io()

let $username = 'Guest';

// Function to get user name
$userNameForm.addEventListener('submit',(event)=>{
	event.preventDefault()

	//enable msg box and chats only after entering username
	$msgForm.style.display='block';
	$msgList.style.display='flex';
	$userNameForm.style.display='none';
	$username = event.currentTarget.username.value;
	
	// Send a message to say that I've connected
	socket.emit('newuser', {user: `${$username} joined the chat`})
})

// Event listener, waiting for an incoming "newuser"
socket.on('newuser', (data) => {
	const newMsg = document.createElement('li')
	$msgList.appendChild(newMsg)

	newMsg.textContent = data.user
	newMsg.classList.add("userjoined");
})


$msgForm.addEventListener('submit', (event) => {
	event.preventDefault()

	socket.emit('chatmsg', {msg: event.currentTarget.txt.value})
	event.currentTarget.txt.value = ''
})


socket.on('chatmsg', (data) => {
	const newMsg = document.createElement('li')
	$msgList.appendChild(newMsg)

	newMsg.textContent = data.msg
})
