import { showProductDetails } from '../controllers/productDetailsController.js';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    function renderProducts(productsToRender) {
        if (productsToRender) {
            productList.innerHTML = productsToRender.map(product => `
                <div class="product" data-id="${product.id}">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Precio: ${formatNumber(product.price)}</p>
                    <p>Categoría: ${product.category}</p>
                    <img src="${product.image}" alt="${product.name}" class="product-image" />
                </div>
            `).join('');
        } else {
            console.error('Element with id "productList" not found.');
        }
    }

    showProductDetails(productId);

    const backToListButton = document.getElementById('backToListButton');
    if (backToListButton) {
        backToListButton.addEventListener('click', function () {
            console.log("Botón 'Volver a la lista' clicado");
            window.location.href = './dashboard.html';
        });
    }
});