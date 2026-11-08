const API = '/api/users';

// Leer: pide los usuarios y llena la tabla
async function getUsers() {
    const response = await fetch(API);
    const users = await response.json();

    document.querySelector('#user-list tbody').innerHTML = users.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.username}</td>
            <td>
                <a href="/edit_users/${user.id}" class="btn btn-primary mr-2">Edit</a>
                <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Leer los campos del formulario
function readForm() {
    return {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };
}

// Crear
async function createUser() {
    const response = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(readForm())
    });
    if (!response.ok) return console.error('Error al crear usuario');

    document.getElementById('add-user-form').reset();
    getUsers();
}

// Actualizar (lo usa la página de edición)
async function updateUser() {
    const userId = document.getElementById('user-id').value;
    const response = await fetch(`${API}/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(readForm())
    });
    if (!response.ok) return console.error('Error al actualizar usuario');

    window.location.href='/dashboard_users'
    console.log('Usuario actualizado');
}

// Eliminar
async function deleteUser(userId) {
    if (!confirm('¿Seguro que quieres eliminar este usuario?')) return;

    const response = await fetch(`${API}/${userId}`, { method: 'DELETE' });
    if (!response.ok) return console.error('Error al eliminar usuario');

    getUsers();
}

// Cargar los datos del usuario en el formulario
async function loadUser(userId) {
    const response = await fetch(`${API}/${userId}`);
    const user = await response.json();

    document.getElementById('user-id').value = user.id;
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('username').value = user.username;
    document.getElementById('password').value = user.password;
}
