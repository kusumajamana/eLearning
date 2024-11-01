class Product {
    constructor(name, price, quantity, category) {
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error("Invalid name: It must be a non-empty string.");
        }
        if (typeof price !== 'number' || price < 0) {
            throw new Error("Invalid price: It must be a non-negative number.");
        }
        if (typeof quantity !== 'number' || quantity < 0) {
            throw new Error("Invalid quantity: It must be a non-negative number.");
        }
        if (typeof category !== 'string' || category.trim() === '') {
            throw new Error("Invalid category: It must be a non-empty string.");
        }

        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.category = category;
    }

    isAvailable() {
        return this.quantity > 0;
    }

    comparePrice(otherProduct) {
        return this.price - otherProduct.price;
    }
}

class Inventory {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        if (!(product instanceof Product)) {
            throw new Error("Invalid product: Must be an instance of Product.");
        }
        this.products.push(product);
    }

    findProduct(name) {
        return this.products.filter(product => product.name.toLowerCase() === name.toLowerCase());
    }

    searchProducts(keyword) {
        return this.products.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()));
    }

    displayProducts() {
        if (this.products.length === 0) {
            console.log("No products in inventory.");
            return;
        }
        console.log("Current Inventory:");
        this.products.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name} - $${product.price.toFixed(2)}, Quantity: ${product.quantity}, Category: ${product.category}`);
        });
    }
}

// Example Usage
const inventory = new Inventory();

try {
    // Adding products
    inventory.addProduct(new Product("Laptop", 999.99, 5, "Electronics"));
    inventory.addProduct(new Product("Phone", 499.99, 10, "Electronics"));
    inventory.addProduct(new Product("Table", 89.99, 2, "Furniture"));

    // Display all products
    inventory.displayProducts();

    // Search for a specific product
    const searchResult = inventory.findProduct("Phone");
    console.log("Search Result:", searchResult);

    // Search for products with a keyword
    const keywordResult = inventory.searchProducts("Lap");
    console.log("Keyword Search Result:", keywordResult);

    // Check availability of a product
    const product = inventory.products[0];
    console.log(`${product.name} is ${product.isAvailable() ? "available" : "out of stock"}.`);

    // Compare two products
    const comparison = inventory.products[0].comparePrice(inventory.products[1]);
    console.log(`Price comparison between ${inventory.products[0].name} and ${inventory.products[1].name}: ${comparison}`);
} catch (error) {
    console.error(error.message);
}
