const STORE_KEY = 'MIWPWA:storedProducts';

export function storeScannedProduct (barCode: string): void {
    const storedProducts: string[] = getScannedProducts();
    const alreadyStoredIndex = storedProducts.indexOf(barCode);

    // Si ce produit avait été scanné précédemment, on le retire du tableau
    if (alreadyStoredIndex !== -1) {
        storedProducts.splice(alreadyStoredIndex, 1);
    }
    // Dans tous les cas, on ajoute ce produit au début du tableau afin que les derniers produits scannés
    // remontent en premier
    storedProducts.unshift(barCode);

    // On met à jour le localStorage en transformant notre tableau en string
    localStorage.setItem(STORE_KEY, JSON.stringify(storedProducts));
}

export function getScannedProducts (): string[] {
    // On récupère les produits stockés dans le localStorage
    const storedProductsString = localStorage.getItem(STORE_KEY);
    // S'il y en avait, on parse la chaîne de caractères JSON pour récupérer un tableau.
    // En effet, le localStorage ne permet de stocker que des strings !
    // S'il n'y en avait pas, on retourne un tableau vide
    return storedProductsString ? JSON.parse(storedProductsString) : [];
}
