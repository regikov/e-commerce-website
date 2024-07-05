loadCSV('items.csv', (data) => {
    const inventory = parseCSV(data);
    // --------------------------------------------forget
    console.log(inventory)
   
    // sortByName(inventory)
    // sortByColor(inventory)
    // sortBySize(inventory)
    sortByPrice(inventory)
    displayInventory(inventory)
});

//! ------------------- Display Inventory ---------------
function displayInventory(inventory){
    const container = document.getElementById("cardsContainer")
    inventory.forEach(item => {
        const itemCard = document.createElement('div')
        itemCard.classList.add('box')
        itemCard.innerHTML= `
        <div class="box-top">
              <img
                class="box-image"
                src="${item.photo_url}"
                alt="${item.name}"
              />
              <div class="title-flex">
                <h3 class="box-title">${item.name}</h3>
              </div>
            
               ${item.color?`<p class="info">Color: ${item.color}</p>`:""}
               ${item.size?`<p class="info">Size: ${item.size}</p>`:`<p>Volume: 30 ml</p>`}
              <p class="info price">Price: <span id="price">${item.price} $</span></p>
              <a href="#" class="button">Add To Cart</a>
        </div>
        `;
        container.appendChild(itemCard)
    });
}

// Attach event listeners to all add-to-cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const itemId = button.getAttribute('data-item-id');
    const item = inventory.find(i => i.id == itemId);
    addToCart(item);
  });
});

let cart = [];

// Function to add an item to the cart
function addToCart(item) {
cart.push(item);
updateCartNotification(); // Update the cart notification
}

// Function to update the cart notification
function updateCartNotification() {
const cartBadge = document.getElementById('cart-badge');
cartBadge.textContent = cart.length; // Update the badge with the number of items in the cart
}

//! ------------------- Sort Inventory ---------------

    //* --------------------Sort by Name ------------------
    const sortByName = (inventory)=>{
        inventory.sort((a,b) =>{
            let itemA = a.name.toLowerCase()
            let itemB = b.name.toLowerCase()
            
            if ( itemA < itemB) return -1;
            
            if ( itemA > itemB) return 1;
            
            return 0;
        })
        return inventory
    };
     const sortByPrice = (inventory)=>{
        inventory.sort((a,b) =>a.price-b.price)
        return inventory
     }

     const sortByColor = (inventory)=>{
        inventory.sort((a,b)=>{
            let itemA = a.color.toLowerCase()
            let itemB = b.color.toLowerCase()
            
            if ( itemA < itemB) return -1;
            
            if ( itemA > itemB) return 1;
            
            return 0;
        })
        return inventory
     }

     const sortBySize = (inventory)=>{
        inventory.sort((a,b)=>{
            let itemA = a.size
            let itemB = b.size
            
            if ( itemA < itemB) return -1;
            
            if ( itemA > itemB) return 1;
            
            return 0;
        })
        return inventory
     }

//----------------------------------------------------- forget

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


