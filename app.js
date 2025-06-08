function mostrarContenido() {
  document.getElementById("pantalla-bienvenida").style.display = "none";
  document.getElementById("contenido-principal").style.display = "block";
}

const form = document.getElementById('contactForm');
const lista = document.getElementById('listaMensajes');
let editIndex = null; 

function mostrarMensajes() {
  lista.innerHTML = '';
  let mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];

  mensajes.forEach((msg, index) => {
    const li = document.createElement('li');
    li.classList.add('fade-in'); // 

    li.innerHTML = `
      <strong>${msg.nombre}</strong> (${msg.email}):<br>${msg.mensaje}
      <br>
      <button onclick="editarMensaje(${index})" style="margin-top:5px; background-color:#a2d2ff; color:#333; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">Editar</button>
      <button onclick="eliminarMensaje(${index})" style="margin-top:5px; background-color:#ffb3c1; color:#333; border:none; padding:5px 10px; border-radius:5px; margin-left:5px; cursor:pointer;">Eliminar</button>
      <hr>
    `;
    lista.appendChild(li);
  });
}

function eliminarMensaje(index) {
  if (confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
    let mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];
    
    const li = lista.children[index];
    li.classList.add('fade-out');
    
    setTimeout(() => {
      mensajes.splice(index, 1);
      localStorage.setItem('mensajes', JSON.stringify(mensajes));
      mostrarMensajes();
    }, 500); 
  }
}
function editarMensaje(index) {
  let mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];
  const mensaje = mensajes[index];
  document.getElementById('nombre').value = mensaje.nombre;
  document.getElementById('email').value = mensaje.email;
  document.getElementById('mensaje').value = mensaje.mensaje;

  editIndex = index; // 
}

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const mensaje = document.getElementById('mensaje').value;

  let mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];

  if (editIndex !== null) {
    mensajes[editIndex] = { nombre, email, mensaje };
    editIndex = null; 
    alert('¡Mensaje editado exitosamente!');
  } else {
    mensajes.push({ nombre, email, mensaje });
    alert('¡Tu mensaje ha sido guardado exitosamente!');
  }

  localStorage.setItem('mensajes', JSON.stringify(mensajes));
  form.reset();
  mostrarMensajes();
});

window.addEventListener('DOMContentLoaded', mostrarMensajes);