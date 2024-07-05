function initializePage(inventory) {

    displayInventory(inventory);

    document.getElementById("searchButton").addEventListener("click", () => {
        const results = searchInventory(inventory);
        displayInventory(results);
    });

}

