document.addEventListener('DOMContentLoaded', () => {

    // Datos de ejemplo para los productos
    const products = [
        { id: 1, name: 'Producto 1', price: 29.99, image: 'https://via.placeholder.com/300x200.png?text=Producto+1' },
        { id: 2, name: 'Producto 2', price: 45.50, image: 'https://via.placeholder.com/300x200.png?text=Producto+2' },
        { id: 3, name: 'Producto 3', price: 15.00, image: 'https://via.placeholder.com/300x200.png?text=Producto+3' },
        { id: 4, name: 'Producto 4', price: 50.75, image: 'https://via.placeholder.com/300x200.png?text=Producto+4' },
    ];

    const productGrid = document.getElementById('product-grid');
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountElement = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total-price');

    let cart = [];

    // Función para renderizar los productos en la página
    function renderProducts() {
        productGrid.innerHTML = ''; // Limpia el contenedor antes de agregar productos
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart-btn" data-id="${product.id}">Agregar al Carrito</button>
                </div>
            `;
            productGrid.appendChild(productCard);
        });

        // Añadir event listeners a los botones de "Agregar al Carrito"
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                addToCart(productId);
            });
        });
    }

    // Función para agregar un producto al carrito
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            updateCart();
            alert(`${product.name} ha sido agregado al carrito.`);
        }
    }

    // Función para actualizar el carrito de compras (modal y contador)
    function updateCart() {
        cartCountElement.textContent = cart.length;
        renderCartItems();
    }

    // Función para renderizar los productos en el modal del carrito
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
            cartTotalElement.textContent = '0.00';
            return;
        }

        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
            totalPrice += item.price;
        });

        cartTotalElement.textContent = totalPrice.toFixed(2);
    }

    // Event listeners para el modal del carrito
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'flex';
        renderCartItems(); // Asegura que el contenido del carrito esté actualizado
    });

    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Inicializar la página
    renderProducts();
});
