loadCSV('items.csv', (data) => {
    const inventory = parseCSV(data);
    // --------------------------------------------forget
    console.log(inventory)
    displayInventory(inventory)
});

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
              <p class="color">Color: ${item.color?item.color:"addIcon"}</p>
              <p class="color">Size: ${item.size?item.size:"One size"}</p>
              <p class="color">Price: ${item.price}</p>
              <a href="#" class="button">Add To Cart</a>
        </div>
        `;
        container.appendChild(itemCard)
    });
    //----------------------------------------------------- forget
}
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


