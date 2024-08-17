// Cargar productos desde un archivo JSON
export function loadProducts() {
    return fetch('../data/data.json')
        .then(response => response.json())
        .catch(error => {
            console.error('Error al cargar productos:', error);
            throw error;
        });
}

// Filtrar productos por nombre, categoría, precio mínimo y máximo
export function filterProducts(products, filters) {
    const { name, category, minPrice, maxPrice } = filters;
    let filteredProducts = products;

    // Filtrar productos por nombre 
    if (name) {
        filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
    }

    // Filtrar productos por categoria
    if (category) {
        filteredProducts = filteredProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());
    }

    // Filtrar productos por precio minimo 
    if (!isNaN(minPrice)) {
        filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
    }

    // Filtrar productos por precio maximo
    if (!isNaN(maxPrice)) {
        filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    }

    return filteredProducts;
}
