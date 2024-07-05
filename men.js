function initializePage(inventory) {
    const filteredInventory = filterBySex('men', inventory); // Replace 'men' with the desired sex filter
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

// Function to filter by sex
function filterBySex(sex, inventory) {
    return inventory.filter(item => item.sex.toLowerCase() === sex.toLowerCase());
}




