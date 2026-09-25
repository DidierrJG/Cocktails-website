const cocktailsList = document.querySelector("#lista-cocteles");

async function obtenerCocktails(nombre) {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nombre}`);
        const data = await response.json();
        console.log(data.drinks)
        return data.drinks;
    } catch(error) {
        console.error(error);
    }
}

async function mostrarCocktails() {
    const cocktails = await obtenerCocktails("margarita");

    añadirCocktails(cocktails);
}

function añadirCocktails(cocktails) {
    cocktailsList.innerHTML = "";

    cocktails.forEach(cocktail => {
        const articulo = document.createElement("article");

        const tamaño = cocktail.strMeasure1 != null ? `<li>${cocktail.strMeasure1}</li>` : "";
        const tamaño_2 = cocktail.strMeasure2 != null ? `<li>${cocktail.strMeasure2}</li>` : "";
        const tamaño_3 = cocktail.strMeasure3 != null ? `<li>${cocktail.strMeasure3}</li>` : "";

        articulo.innerHTML = `
            <div class="imagen-coctel">
                <img src="${cocktail.strDrinkThumb}" width=128px>
                <p class="identificador">${cocktail.idDrink}</p>
            </div>
            <div class="informacion-coctel">
                <h4 class="alcohol-coctel">${cocktail.strAlcoholic}</h4>
                <h2 class="nombre-coctel"">${cocktail.strDrink}</h2>
                <ul class="tamaños">
                    ${tamaño}
                    ${tamaño_2}
                    ${tamaño_3}
                </ul>
                <div class="informacion-compra">
                    <p>$20.000</p>
                    <button class="comprar-boton">
                        Comprar
                    </button>
                </div>
            </div>
        `

        cocktailsList.appendChild(articulo);
    });
}

mostrarCocktails();

const busquedaBoton = document.querySelector("#buscar-boton")

busquedaBoton.addEventListener("click", async (e) => {
    e.preventDefault();

    const busqueda = document.querySelector("#buscar")
    const cocktails = await obtenerCocktails(busqueda.value);

    if(!cocktails || cocktails.length == 0) {
        cocktailsList.innerHTML = "";

        const mensaje = document.createElement("p");
        mensaje.textContent = "No se encontraron resultados."

        cocktailsList.appendChild(mensaje);
    } else {
        añadirCocktails(cocktails);
    }
})

const inicioBoton = document.querySelector("#inicio-boton")

inicioBoton.addEventListener("click", async (e) => {
    e.preventDefault();

    mostrarCocktails();

    const busqueda = document.querySelector("#buscar")
    busqueda.value = "";
})

const comprarBoton = document.querySelector(".comprar-boton")

cocktailsList.addEventListener("click", (e) => {
    if(e.target.classList.contains("comprar-boton")) {
        const cocktail = e.target.parentElement.parentElement;
        const nombre = cocktail.querySelector(".nombre-coctel");
        
        guardarCompra(nombre.textContent);
    }
})

function guardarCompra(cocktail) {

    const informacionUsuario = localStorage.getItem("usuario");

    if(informacionUsuario) {
        const datos = JSON.parse(informacionUsuario);
        
        if(!datos[cocktail]) {
            datos[cocktail] = 1;
        } else {
            datos[cocktail]++;
        }

        localStorage.setItem("usuario", JSON.stringify(datos));
    } else {
        const usuario = {[cocktail]: 1};
        localStorage.setItem("usuario", JSON.stringify(usuario));
    }
}