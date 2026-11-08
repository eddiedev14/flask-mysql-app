const API = '/api/products';

// Leer: pide los productos y llena la tabla
async function getProducts() {
    const response = await fetch(API);
    const products = await response.json();

    document.querySelector('#product-list tbody').innerHTML = products.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>${product.stock}</td>
            <td>${product.price}</td>
            <td>
                <a href="/edit_products/${product.id}" class="btn btn-primary mr-2">Edit</a>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Leer los campos del formulario
function readForm() {
    return {
        name: document.getElementById('name').value,
        stock: parseInt(document.getElementById('stock').value),
        price: parseFloat(document.getElementById('price').value)
    };
}

// Crear
async function createProduct() {
    const response = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(readForm())
    });
    if (!response.ok) return console.error('Error al crear producto');

    document.getElementById('add-product-form').reset();
    getProducts();
}

// Actualizar (lo usa la página de edición)
async function updateProduct() {
    const productId = document.getElementById('product-id').value;
    const response = await fetch(`${API}/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(readForm())
    });
    if (!response.ok) return console.error('Error al actualizar producto');
    
    window.location.href = "/dashboard_products"
    console.log('Producto actualizado');
}

// Eliminar
async function deleteProduct(productId) {
    if (!confirm('¿Seguro que quieres eliminar este producto?')) return;

    const response = await fetch(`${API}/${productId}`, { method: 'DELETE' });
    if (!response.ok) return console.error('Error al eliminar producto');

    getProducts();
}

// Cargar los datos del producto en el formulario
async function loadProduct(productId) {
    const response = await fetch(`${API}/${productId}`);
    const product = await response.json();

    document.getElementById('product-id').value = product.id;
    document.getElementById('name').value = product.name;
    document.getElementById('stock').value = product.stock;
    document.getElementById('price').value = product.price;
}
