const formulario = document.querySelector("form");

function costoPedido() {
    let compras = localStorage.getItem("usuario");
    compras = JSON.parse(compras);

    if(!compras || compras.length == 0) {
        window.location.href = "index.html";
    } else {
        let total = 0;

        for(const property in compras) {
            const precio = 20000 * compras[property];
            total += precio;
        }

        return total;
    }
}

const dinero = costoPedido().toLocaleString("es-CO");
const botonPago = document.createElement("button");
botonPago.id = "pagar-boton";
botonPago.innerHTML = `
    Pagar \$ ${dinero}
`;
formulario.appendChild(botonPago);