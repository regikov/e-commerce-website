document.addEventListener("DOMContentLoaded", () => {
    loadCSV('items.csv', (data) => {
        const inventory = parseCSV(data);

        const filteredInventory = filterBySex('Women', inventory); 
        displayInventory(filteredInventory);

        // ---------------Event Listener For Search Btn--------------
        document.getElementById("searchButton").addEventListener("click", () => {
            const results = searchInventory(filteredInventory);
            displayInventory(results);
        });

        //---------------------Event Listener Filters ------------

        document.getElementById("category-filter").addEventListener("change", () => {
            applyFilters(filteredInventory);
        });

        document.getElementById("color-filter").addEventListener("change", () => {
            applyFilters(filteredInventory);
        });

        document.getElementById("size-filter").addEventListener("change", () => {
            applyFilters(filteredInventory);
        });
    });
});

// Function to load CSV data
function loadCSV(url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => callback(data))
        .catch(error => console.error('Error loading CSV file:', error));
}

// Function to parse CSV data
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

//! ------------------- Display Inventory ---------------

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
            <a href="#" class="button">Add To Cart</a>
        </div>`;
        container.appendChild(itemCard);
    });
}

//! ------------------- Search Inventory ---------------
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

//* --------------------filter by sex ------------------

function filterBySex(sex, inventory) {
    return inventory.filter(item => item.sex.toLowerCase() === sex.toLowerCase());
}


//* --------------------filter by category ------------------
function filterByCategory(categoryInput, inventory) {
    if (!categoryInput) return inventory;
    return inventory.filter(e => e.category.toLowerCase() === categoryInput.toLowerCase());
}

//* --------------------filter by color ------------------
function filterByColor(colorInput, inventory) {
    if (!colorInput) return inventory;
    return inventory.filter(e => e.color.toLowerCase() === colorInput.toLowerCase());
}

//* --------------------filter by size ------------------
function filterBySize(sizeInput, inventory) {
    if (!sizeInput) return inventory;
    return inventory.filter(e => e.size.toLowerCase() === sizeInput.toLowerCase());
}

//* --------------------Apply Filtering------------------
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