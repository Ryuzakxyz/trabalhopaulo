let cart = [];


// ================================
// CARRINHO
// ================================

function addToCart(name, price) {

    const existing = cart.find(
        item => item.name === name
    );

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    // Abre o carrinho automaticamente
    openCart();
}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;
    let quantity = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        quantity += item.quantity;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong>

                <p>
                    ${item.quantity}x
                    R$ ${item.price.toLocaleString(
                        "pt-BR",
                        {
                            minimumFractionDigits: 2
                        }
                    )}
                </p>

                <button
                    class="remove"
                    onclick="removeFromCart(${index})">
                    Remover
                </button>
            </div>

            <strong>
                R$ ${(item.price * item.quantity)
                    .toLocaleString(
                        "pt-BR",
                        {
                            minimumFractionDigits: 2
                        }
                    )}
            </strong>
        `;

        cartItems.appendChild(div);
    });


    cartCount.textContent = quantity;

    cartTotal.textContent =
        "R$ " +
        total.toLocaleString(
            "pt-BR",
            {
                minimumFractionDigits: 2
            }
        );


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div style="
                text-align:center;
                padding:50px 10px;
                color:#777;
            ">
                <div style="font-size:50px">
                    🛒
                </div>

                <p>
                    Seu carrinho está vazio.
                </p>
            </div>
        `;
    }
}


function openCart() {

    document
        .getElementById("cartModal")
        .classList.add("show");

    updateCart();
}


function closeCart() {

    document
        .getElementById("cartModal")
        .classList.remove("show");
}


// Fecha o carrinho clicando fora dele

document
    .getElementById("cartModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            closeCart();
        }

    });


// ================================
// FILTROS
// ================================

function filterProducts(category, button) {

    const products =
        document.querySelectorAll(".product-card");

    const buttons =
        document.querySelectorAll(".filter");


    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }


    products.forEach(product => {

        if (
            category === "todos" ||
            product.dataset.category === category
        ) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });
}


function filterCategory(category) {

    document
        .getElementById("produtos")
        .scrollIntoView({
            behavior: "smooth"
        });


    const button = [...document.querySelectorAll(".filter")]
        .find(btn =>
            btn.textContent
                .toLowerCase()
                .includes(
                    category === "computador"
                        ? "pc"
                        : category === "periferico"
                            ? "perif"
                            : category
                )
        );


    filterProducts(category, button);
}


// ================================
// PESQUISA
// ================================

function searchProducts() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        const name =
            product.dataset.name.toLowerCase();

        if (name.includes(search)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });
}


function focusSearch() {

    document
        .getElementById("produtos")
        .scrollIntoView({
            behavior: "smooth"
        });


    setTimeout(() => {

        document
            .getElementById("searchInput")
            .focus();

    }, 500);
}


// ================================
// OFERTAS
// ================================

function scrollToProducts() {

    document
        .getElementById("produtos")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ================================
// NEWSLETTER
// ================================

function subscribe(event) {

    event.preventDefault();

    const email =
        event.target.querySelector("input").value;

    alert(
        `Obrigado! O e-mail ${email} foi cadastrado.`
    );

    event.target.reset();
}


// ================================
// CHECKOUT
// ================================

function checkout() {

    if (cart.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;
    }


    let total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


    alert(
        "Pedido criado com sucesso!\n\n" +
        "Total: R$ " +
        total.toLocaleString(
            "pt-BR",
            {
                minimumFractionDigits: 2
            }
        )
    );
}
