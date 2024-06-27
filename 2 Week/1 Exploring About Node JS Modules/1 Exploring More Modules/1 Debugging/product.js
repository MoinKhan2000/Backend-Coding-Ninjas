function calculateTotal(products) {
    let total = 0
    products.forEach((product) => {
        total += product.price * product.quantity
    })
    return total
}
const productList = [
    { name: "Shoes", price: 50, quantity: 2 },
    { name: "Hat", price: 20, quantity: 2 },
    { name: "Mobile", price: 100, quantity: 3 }
]
console.log(calculateTotal(productList));
