loadCSV('items.csv', (data) => {
    const inventory = parseCSV(data);
    // --------------------------------------------forget
    console.log(inventory)
    // sortByName(inventory)
    // sortByColor(inventory)
    sortBySize(inventory)
    // sortByPriceAsc(inventory)
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
               ${item.color?`<p class="info">Color:${item.color}</p>`:""}
               ${item.size?`<p class="info">Size:${item.size}</p>`:`<p>Volume: 30 ml</p>`}
              <p class="info price">Price: <span id="price">${item.price}</span></p>
              <a href="#" class="button">Add To Cart</a>
        </div>
        `;
        container.appendChild(itemCard)
    });
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
    const sortByPriceAsc = (inventory)=>{
        inventory.sort((a,b) =>a.price-b.price)
        return inventory
    }
    const sortByPriceDes = (inventory)=>{
       inventory.sort((a,b) =>b.price-a.price)
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

     const sortBySize = (inventory) => {
        inventory.sort((a, b) => {
            let itemA = a.size
            let itemB = b.size
            
            // Determine if sizes are strings or numbers
            const aIsNumber = typeof itemA === 'number';
            const bIsNumber = typeof itemB === 'number';
    
            // Sort strings before numbers
            if (aIsNumber && !bIsNumber) return 1;
            if (!aIsNumber && bIsNumber) return -1;
    
            // If both are strings 
            if (!aIsNumber && !bIsNumber) {
                if (itemA.length !== itemB.length) {
                    return itemA.length - itemB.length;
                }
                // If lengths are the same, compare by lexicographical order
                return itemB.localeCompare(itemA);
            }
    
            // If both are numbers, sort numerically
            return itemA - itemB;
        });
        return inventory;
    };

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


