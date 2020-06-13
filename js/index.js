

// Listen for the 'submit' of a form
// 	 event.preventDefault()  (prevent the form from leaving the page)
//   Emit a message using "chatmsg"
// Listen for "chatmsg"
//   add a <li> with the chat msg to the <ol>

const $msgForm = document.getElementById('sendMsg')
const $msgList = document.getElementById('messages')
const $userNameEntered = document.getElementById('enterButton')
const $userNameForm = document.getElementById('userdetails')

const socket = io()

// Send a message to say that I've connected
socket.emit('newuser', {user: 'Grace Hopper', text:'dummy text'})

// Event listener, waiting for an incoming "newuser"
socket.on('newuser', (data) => {
	console.log(`${data.user} has connected!`)
	console.log(`${data.text}`)
	const newMsg = document.createElement('li')
	$msgList.appendChild(newMsg)

	newMsg.textContent = data.user
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

$userNameForm.addEventListener('submit',(event)=>{
	event.preventDefault()
	$msgForm.style.display='block';
	$userNameForm.style.display='none';
})