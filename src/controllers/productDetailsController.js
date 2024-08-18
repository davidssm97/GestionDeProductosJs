import { loadProducts } from '../models/productModel.js';

export function showProductDetails(productId) {
    loadProducts().then(products => {
        const product = products.find(p => p.id.toString() === productId.toString());

        if (product) {
            console.log('------------------------');
            console.log(`Nombre: ${product.name}`);
            console.log(`Descripción: ${product.description}`);
            console.log(`Precio: ${product.price}`);
            console.log(`Categoría: ${product.category}`);
            console.log('------------------------');

            const productNameElement = document.getElementById('productName');
            const productDescriptionElement = document.getElementById('productDescription');
            const productPriceElement = document.getElementById('productPrice');
            const productCategoryElement = document.getElementById('productCategory');
            const productImageElement = document.getElementById('productImage');

            if (productNameElement && productDescriptionElement && productPriceElement && productCategoryElement && productImageElement) {
                productNameElement.textContent = product.name;
                productDescriptionElement.textContent = product.description;
                productPriceElement.textContent = product.price;
                productCategoryElement.textContent = product.category;

                // Aquí se muestra la imagen utilizando la URL correcta
                productImageElement.innerHTML = `<img src="${product.url}"   width="300" alt="${product.name}" class="product-image" />`;
            } else {
                console.error('Elementos para mostrar detalles del producto no encontrados en el DOM');
            }
        } else {
            console.error('Producto no encontrado');
        }
    }).catch(error => {
        console.error('Error al cargar productos:', error);
    });
}