import io from 'socket.io-client';
let SOCKET_URL = 'https://socialexpressjs.herokuapp.com';
export let socket = io.connect(SOCKET_URL);