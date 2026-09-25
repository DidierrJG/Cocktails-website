let compras = localStorage.getItem("usuario");
compras = JSON.parse(compras);

const listaCompras = document.querySelector("#lista-compras");

let total = 0;

for(const property in compras) {
    const dato = document.createElement("li");
    const precio = 20000 * compras[property];

    total += precio;

    dato.innerHTML = `
    <p class="producto">${property} x${compras[property]}</p>
    <p class="precio">\$ ${precio.toLocaleString("es-CO")}</p>
    `
    listaCompras.appendChild(dato)
}

const datoTotal = document.createElement("li");
datoTotal.innerHTML = `
    <h3 class="producto">Total</h3>
    <h3 class="precio">\$ ${total.toLocaleString("es-CO")}</h3>
`
listaCompras.appendChild(datoTotal);