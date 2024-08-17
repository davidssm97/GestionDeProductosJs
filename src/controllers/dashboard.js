document.addEventListener('DOMContentLoaded', () => {
    fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            productos.push(...data);
            localStorage.setItem('productos', JSON.stringify(productos));
            displayProducts(productos);
        })
        .catch(error => console.error('Error al cargar productos:', error));
});

const productos = JSON.parse(localStorage.getItem('productos')) || [];

document.getElementById('logoutBtn').addEventListener('click', () => {
    window.location.href = '../index.html';
});

document.getElementById('filterBtn').addEventListener('click', () => {
    const name = document.getElementById('filterName').value.toLowerCase();
    const category = document.getElementById('filterCategory').value.toLowerCase();
    const priceRange = document.getElementById('filterPriceRange').value.split('-').map(Number);
    
    const filteredProducts = productos.filter(producto => {
        const matchesName = producto.name.toLowerCase().includes(name);
        const matchesCategory = category ? producto.category.toLowerCase().includes(category) : true;
        const matchesPrice = priceRange.length === 2 ? (producto.price >= priceRange[0] && producto.price <= priceRange[1]) : true;
        
        return matchesName && matchesCategory && matchesPrice;
    });
    
    displayProducts(filteredProducts);
});

function displayProducts(productos) {
    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = '';

    productos.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.name}</td>
            <td>${producto.description}</td>
            <td>${producto.price.toFixed(2)}</td>
            <td>${producto.category}</td>
        `;
        tableBody.appendChild(row);
    });
}
