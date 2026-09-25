let compras = localStorage.getItem("usuario");
compras = JSON.parse(compras);

const section = document.querySelector("section");

if(!compras || compras.length == 0) {
    section.innerHTML = "";

    const mensaje = document.createElement("p");
    mensaje.textContent = "No tienes nada en el carrito."
    section.appendChild(mensaje);
} else {
    const listaCompras = document.querySelector("#lista-compras");

    let total = 0;

    for(const property in compras) {
        const precio = 20000 * compras[property];

        total += precio;
        
        const dato = document.createElement("li");
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
}

const pagarBoton = document.querySelector("#pagar-boton");

pagarBoton.addEventListener("click", () => {
    window.location.href = "pagar.html";
})