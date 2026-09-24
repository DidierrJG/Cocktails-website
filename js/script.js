async function obtenerCocktails() {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
        const data = await response.json();
        console.log(data.drinks)
        return data.drinks;
    } catch(error) {
        console.error(error);
    }
}

async function mostrarCocktails() {
    const cocktailsList = document.querySelector("#cocktails-list");

    const cocktails = await obtenerCocktails();

    cocktails.forEach(cocktail => {
        const articulo = document.createElement("article");

        articulo.innerHTML = `
            <img src="${cocktail.strDrinkThumb}" width=128px>
            <h3 class="cocktail-category">${cocktail.strCategory}</h3>
            <h2 class="cocktail-name" id="${cocktail.idDrink}">${cocktail.strDrink}</h2>
        `

        cocktailsList.appendChild(articulo);
    });
}

mostrarCocktails();