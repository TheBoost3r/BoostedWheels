document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartQuantity = document.getElementById('cart-quantity');

    let cartItems = [];
    let total = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productContainer = button.closest('.product');
            const product = productContainer.querySelector('h3').innerText;
            const priceText = productContainer.querySelector('.price').innerText;
            const stockText = productContainer.querySelector('.stock').innerText;

            const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
            let stock = parseInt(stockText.split(' ')[1]);

            if (stock > 0) {
                const existingItem = cartItems.find(item => item.product === product);

                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cartItems.push({ product, price, quantity: 1 });
                }

                stock--;
                productContainer.querySelector('.stock').innerText = `Stock: ${stock} unidades`;

                updateCart();
            } else {
                alert('No hay suficiente stock disponible.');
            }
        });
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';

        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.product}</p>
                <p>Cantidad: ${item.quantity}</p>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        const validPrices = cartItems.map(item => item.price * item.quantity).filter(price => !isNaN(price));
        total = validPrices.reduce((acc, price) => acc + price, 0);

        cartTotal.innerText = `Total: Q${total.toFixed(2)}`;
        cartQuantity.innerText = `Cantidad total: ${cartItems.reduce((acc, item) => acc + item.quantity, 0)}`;
    }
});