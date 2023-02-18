class ProductManager {
    constructor(title, description, price, thumbnail, code, stock, id) {
        this.products = [];
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = id;
    }

    addProduct(product) {
        for(const element of this.products) {
            if (product.stock < 0 || product.price < 0 || product.code === `` || product.title === '' || product.description === '' || product.thumbnail === '') {
                return {error: 'All fields are required.'}
            }
            else
            if (element.code === product.code) {
                return {error: 'This product already exists.'}
            }
        }
        product.id = Math.random().toString(9);
        this.products.push(product);
        return this.products;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        for(const element of this.products) {
            if(element.id === id) {
                return element.title;
            }
        }
        return {error: 'Not found'}
    }
}


let productManager1 = new ProductManager;

console.log("Lista vacia");
console.log(productManager1.getProducts());

console.log("Agregar producto");
console.log(productManager1.addProduct({title:"producto prueba",description:"Este es un producto prueba",price:200,thumbnail:"Sin imagen",code:"abc123",stock:25}));

console.log("Lista con producto nuevo");
console.log(productManager1.getProducts());

console.log("Agregar producto con mismo codigo");
console.log(productManager1.addProduct({title:"producto prueba",description:"Este es un producto prueba",price:200,thumbnail:"Sin imagen",code:"abc123",stock:25}));

console.log("Agregar producto con campo vacio");
console.log(productManager1.addProduct({title:"producto prueba",description:"",price:200,thumbnail:"Sin imagen",code:"abc123",stock:25}));

console.log("Buscar producto por id y sale");
console.log(productManager1.getProductById(productManager1.products[0].id));

console.log("Buscar producto por id y no sale");
console.log(productManager1.getProductById("123"));


