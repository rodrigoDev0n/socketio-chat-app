
const socket = io('https://socketio-chat-app-production.up.railway.app/');
// const socket = io('http://localhost:8080');

// Referencias
const form = document.querySelector('#formulario');
const mensajes = document.querySelector('#mensajes');
const txtmensaje = document.querySelector('#txtMensaje');
const txtUser = document.querySelector('#txtUserName');
const entranceText = document.querySelector('#messageAnnouncement');
const users = document.querySelector('#users');
const sphere = document.querySelector('#sphere-1');
const sphere2 = document.querySelector('#sphere-2');
const sphere3 = document.querySelector('#sphere-3');
const sphere4 = document.querySelector('#sphere-4');


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newMsg = txtmensaje.value;
    const userName = txtUser.value;

    if(newMsg === "") return;
    if (userName === "") return;

    socket.emit('mensaje-to-server', { 
        text: newMsg,
        user: userName,
    });

    txtUser.disabled = true;
    txtmensaje.focus();
    txtmensaje.value = '';
});

socket.on('mensaje-from-server', (data) => {
    entranceText.style.cssText = 'display: none';
    mensajes.innerHTML += ` 
    <div class="fw-bold customtext mt-2">${data.user}</div>
    <li class="list-group-item d-flex justify-content-between align-items-start mt-2 p-2">
        <div class="message_container">
            <span class="user_message">${data.text}</span>
        </div>
    </li>
    <hr />`;
    users.innerHTML = ''; 
});

txtmensaje.addEventListener('input', () => {
    socket.emit('user:typing', txtUser.value);
});

/* sphere.addEventListener('click', () => {
    console.log(sphere);
})
 */

socket.on('user:typing', (data) => {
    users.innerHTML = `${data === '' ? 'alguien' : data} esta escribiendo ... <span class="animate">🔔</span>`;
});