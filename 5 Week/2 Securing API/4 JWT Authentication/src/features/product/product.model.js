const products = [];

export default class ProductModel {
    constructor(id, name, desc, imageUrl, category, price, sizes) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.imageUrl = imageUrl;
        this.category = category;
        this.price = price;
        this.sizes = sizes;
        this.rating = [];
    }

    static addProduct(id, name, desc, imageUrl, category, price, sizes) {
        sizes = sizes.split(',')
        const newProduct = new ProductModel(id, name, desc, imageUrl, category, price, sizes);
        products.push(newProduct);
        return newProduct
    }

    static getAllProducts() {
        return products;
    }

    static getProductById(id) {
        return products.find(product => product.id === id);
    }

    static getProductByName(name) {
        return products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
    }

    static filter(minPrice, maxPrice, category) {
        const result = products.filter(
            product => product.price >= minPrice &&
                product.price <= maxPrice &&
                product.category.toLowerCase().includes(category.toLowerCase())
        );
        console.log(result);
        return result;
    }

    static updateProductUsingId(id, updatedProduct) {
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            return products[index];
        }
        return null;
    }

    static getAllCategories() {
        return [...new Set(products.map(product => product.category))];
    }

    static rateProduct(id, rating) {
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index].rating.push(rating);
            return products[index];
        }
        return null;
    }
}

// Adding products using the addProduct function
ProductModel.addProduct(
    1,
    "Classic T-Shirt",
    "A classic white t-shirt made from 100% cotton.",
    "https://images.pexels.com/photos/1814343/pexels-photo-1814343.jpeg",
    "Apparel",
    19.99,
    "S, M, X, XL"
);

ProductModel.addProduct(
    2,
    "Running Shoes",
    "Lightweight running shoes with excellent cushioning.",
    "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
    "Footwear",
    59.99,
    "7, 8, 9, 10, 11, 12"
);

ProductModel.addProduct(
    3,
    "Denim Jeans",
    "Comfortable and stylish denim jeans.",
    "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg",
    "Apparel",
    49.99,
    "27, 28, 29, 30"
);

ProductModel.addProduct(
    4,
    "Leather Jacket",
    "Genuine leather jacket with a sleek design.",
    "https://images.pexels.com/photos/1619655/pexels-photo-1619655.jpeg",
    "Apparel",
    99.99,
    "S, M, L, XL"
);

ProductModel.addProduct(
    5,
    "Smartphone",
    "Latest model smartphone with high-end features.",
    "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg",
    "Electronics",
    699.99,
    "64GB, 128GB"
);

ProductModel.addProduct(
    6,
    "Wireless Headphones",
    "Noise-cancelling wireless headphones.",
    "https://images.pexels.com/photos/374714/pexels-photo-374714.jpeg",
    "Electronics",
    149.99,
    "One Size"
);

ProductModel.addProduct(
    7,
    "Digital Watch",
    "Stylish digital watch with multiple features.",
    "https://images.pexels.com/photos/276841/pexels-photo-276841.jpeg",
    "Accessories",
    79.99,
    "One Size"
);

ProductModel.addProduct(
    8,
    "Backpack",
    "Durable backpack with multiple compartments.",
    "https://images.pexels.com/photos/279739/pexels-photo-279739.jpeg",
    "Accessories",
    39.99,
    "One Size"
);

ProductModel.addProduct(
    9,
    "Yoga Mat",
    "Eco-friendly yoga mat with non-slip surface.",
    "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg",
    "Fitness",
    29.99,
    "One Size"
);

ProductModel.addProduct(
    10,
    "Blender",
    "High-speed blender for smoothies and shakes.",
    "https://images.pexels.com/photos/7658196/pexels-photo-7658196.jpeg",
    "Kitchen",
    89.99,
    "One Size"
);

export { products };
