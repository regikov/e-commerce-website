function initializePage(inventory) {
    const filteredInventory = filterBySex('unisex', inventory);
    displayInventory(filteredInventory);

    document.getElementById("searchButton").addEventListener("click", () => {
        const results = searchInventory(filteredInventory);
        displayInventory(results);
    });

    document.getElementById("category-filter").addEventListener("change", () => {
        applyFilters(filteredInventory);
    });

    document.getElementById("color-filter").addEventListener("change", () => {
        applyFilters(filteredInventory);
    });

    document.getElementById("size-filter").addEventListener("change", () => {
        applyFilters(filteredInventory);
    });
}

function filterBySex(sex, inventory) {
    return inventory.filter(item => item.sex.toLowerCase() === sex.toLowerCase());
}
