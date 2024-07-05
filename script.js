document.addEventListener("DOMContentLoaded", () => {
    loadCSV('items.csv', (data) => {
        const inventory = parseCSV(data);
        initializePage(inventory); // Call the specific page's initialization function
    });
});

function loadCSV(url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => callback(data))
        .catch(error => console.error('Error loading CSV file:', error));
}

function parseCSV(data) {
    const lines = data.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    const items = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].split(',');
        if (line.length === headers.length) {
            const item = {};
            headers.forEach((header, index) => {
                item[header] = line[index].trim();
            });
            items.push(item);
        }
    }
    return items;
}

function displayInventory(inventory) {
    const container = document.getElementById("cardsContainer");
    container.innerHTML = ''; // Clear previous inventory display
    inventory.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('box');
        itemCard.innerHTML = `
        <div class="box-top">
            <img class="box-image" src="${item.photo_url}" alt="${item.name}" />
            <div class="title-flex">
                <h3 class="box-title">${item.name}</h3>
            </div>
            ${item.color ? `<p class="info">Color: ${item.color}</p>` : ""}
            ${item.size ? `<p class="info">Size: ${item.size}</p>` : `<p>Volume: 30 ml</p>`}
            <p class="info">Category: ${item.category}</p>
            <p class="info price">Price: <span id="price">${item.price} $</span></p>
            <a href="#" class="button add-to-cart-button" data-item-id="${item.id}">Add To Cart</a>
        </div>`;
        container.appendChild(itemCard);
    });

    attachAddToCartEventListeners(inventory);
}

// Cart functionality
let cart = [];

function addToCart(item) {
    cart.push(item);
    updateCartNotification(); // Update the cart notification
    updateCartDisplay(); // Update the cart display in the checkout bar

}

function updateCartNotification() {
    const cartBadge = document.getElementById('cart-badge');
    cartBadge.textContent = cart.length; // Update the badge with the number of items in the cart
}


//! -----------------Update Cart Display--------------
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    cartItemsContainer.innerHTML = ''; // Clear previous cart items

    let totalPrice = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.name} - $${item.price}`;
        cartItemsContainer.appendChild(cartItem);
        totalPrice += parseFloat(item.price);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2); // Update the total price
}

// --------------------clearCart------------------------
function clearCart() {
    cart = [];
    updateCartNotification();
    updateCartDisplay();
    alert("Thanks for your visit!");
}
document.getElementById('payButton').addEventListener('click', clearCart);

// ------------------Add to Cart EL-----------------
function attachAddToCartEventListeners(inventory) {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemId = button.getAttribute('data-item-id');
            const item = inventory.find(i => i.id == itemId);
            addToCart(item);
        });
    });
}
// Filtering and sorting functions
function filterByCategory(categoryInput, inventory) {
    if (!categoryInput) return inventory;
    return inventory.filter(e => e.category.toLowerCase() === categoryInput.toLowerCase());
}

function filterByColor(colorInput, inventory) {
    if (!colorInput) return inventory;
    return inventory.filter(e => e.color.toLowerCase() === colorInput.toLowerCase());
}

function filterBySize(sizeInput, inventory) {
    if (!sizeInput) return inventory;
    return inventory.filter(e => e.size.toLowerCase() === sizeInput.toLowerCase());
}

function applyFilters(inventory) {
    const category = document.getElementById("category-filter").value.toLowerCase();
    const color = document.getElementById("color-filter").value.toLowerCase();
    const size = document.getElementById("size-filter").value.toLowerCase();

    let filteredInventory = inventory;

    if (category) {
        filteredInventory = filterByCategory(category, filteredInventory);
    }

    if (color) {
        filteredInventory = filterByColor(color, filteredInventory);
    }

    if (size) {
        filteredInventory = filterBySize(size, filteredInventory);
    }

    displayInventory(filteredInventory);
}

function searchInventory(inventory) {
    const searchItem = document.getElementById("searchInput").value.toLowerCase();
    const result = [];
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i].name.toLowerCase().includes(searchItem) ||
            inventory[i].category.toLowerCase() === searchItem ||
            inventory[i].color.toLowerCase() === searchItem) {
            result.push(inventory[i]);
        }
    }
    return result;
}

// Sorting functions
const sortByName = (inventory) => {
    inventory.sort((a, b) => {
        let itemA = a.name.toLowerCase();
        let itemB = b.name.toLowerCase();

        if (itemA < itemB) return -1;
        if (itemA > itemB) return 1;
        return 0;
    });
    return inventory;
};

const sortByPriceAsc = (inventory) => {
    inventory.sort((a, b) => a.price - b.price);
    return inventory;
};

const sortByPriceDes = (inventory) => {
    inventory.sort((a, b) => b.price - a.price);
    return inventory;
};

const sortByColor = (inventory) => {
    inventory.sort((a, b) => {
        let itemA = a.color.toLowerCase();
        let itemB = b.color.toLowerCase();

        if (itemA < itemB) return -1;
        if (itemA > itemB) return 1;
        return 0;
    });
    return inventory;
};

const sortBySize = (inventory) => {
    inventory.sort((a, b) => {
        let itemA = a.size;
        let itemB = b.size;

        const aIsNumber = typeof itemA === 'number';
        const bIsNumber = typeof itemB === 'number';

        if (aIsNumber && !bIsNumber) return 1;
        if (!aIsNumber && bIsNumber) return -1;

        if (!aIsNumber && !bIsNumber) {
            if (itemA.length !== itemB.length) {
                return itemA.length - itemB.length;
            }
            return itemB.localeCompare(itemA);
        }

        return itemA - itemB;
    });
    return inventory;
};

const sortByCategory = (inventory) => {
    inventory.sort((a, b) => {
        let itemA = a.category.toLowerCase();
        let itemB = b.category.toLowerCase();

        if (itemA > itemB) return 1;
        if (itemA < itemB) return -1;
        return 0;
    });
    return inventory;
};
