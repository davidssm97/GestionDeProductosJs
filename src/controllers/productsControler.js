import { productos } from '../data/data.json';
import { Product } from '../modelos/modeloProductos.js';

export const getAllProducts = () => {
    return productos.map(prod => new Product(prod.id, prod.nombre, prod.descripcion, prod.precio, prod.categoria));
};

export const filterProducts = (name = '', category = '', priceRange = '') => {
    let filteredProducts = getAllProducts();

    if (name) {
        filteredProducts = filteredProducts.filter(product => product.nombre.toLowerCase().includes(name.toLowerCase()));
    }
    if (category) {
        filteredProducts = filteredProducts.filter(product => product.categoria.toLowerCase().includes(category.toLowerCase()));
    }
    if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        filteredProducts = filteredProducts.filter(product => product.precio >= min && product.precio <= max);
    }

    return filteredProducts;
};
