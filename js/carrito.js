let productosEnCarrito = localStorage.getItem("productos-en-carrito");

productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio")
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones")
const contenedorCarritoComprado = document.querySelector("#carrito-comprado")
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito(){
    if(productosEnCarrito && productosEnCarrito.length > 0){

        
        contenedorCarritoVacio.classList.add("disabled")
        contenedorCarritoProductos.classList.remove("disabled")
        contenedorCarritoAcciones.classList.remove("disabled")
        contenedorCarritoComprado.classList.add("disabled")

        contenedorCarritoProductos.innerHTML="";

        productosEnCarrito.forEach(producto =>{
            const div = document.createElement("div");
            div.classList.add("carrito-producto")  
            div.innerHTML=`
                
                <img class="carrito-producto-img" src=".${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
                
            `;

            contenedorCarritoProductos.append(div);

        })
        
    }else{
        contenedorCarritoVacio.classList.remove("disabled")
        contenedorCarritoProductos.classList.add("disabled")
        contenedorCarritoAcciones.classList.add("disabled")
        contenedorCarritoComprado.classList.add("disabled")
    }
    actualizarBotonesEliminar()
    actualizarTotal()
}

cargarProductosCarrito()

function actualizarBotonesEliminar(){
    botonesEseliminar = document.querySelectorAll(".carrito-producto-eliminar")
    botonesEseliminar.forEach(boton =>{
        boton.addEventListener("click", eliminarDelCarrito)
    })
}

function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    Swal.fire({
        background:'#9FE6E8',
        title: 'ESTAS SEGURX DE ELIMINAR ESTE PRODUCTO?',
        text: "SE BORRARÁ DEL CARRITO",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {

            productosEnCarrito.splice(index, 1);
            cargarProductosCarrito();

            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

          Swal.fire(
            'PRODUCTO ELIMINADO!',
            'Si quieres puedes volver a agregarlo desde el catálogo',
            'success'
          )
        }
      })
    
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){
    Swal.fire({
        background:'#9FE6E8',
        title: 'ESTÁS SEGURX DE ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO?',
        text: "SE BORRARÁ TODO DEL CARRITO",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0
            localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
            cargarProductosCarrito()

          Swal.fire(
            'PRODUCTOS ELIMINADOS!',
            'Si quieres puedes volver a agregarlo desde el catálogo',
            'success'
          )
        }
      })


}

function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc,producto)=>acc + (producto.precio * producto.cantidad), 0)
    contenedorTotal.innerHTML = `$${totalCalculado}` 
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    Swal.fire({
        background:'#9FE6E8',
        title: 'USTED QUIERE IR A PAGAR?',
        text: "SELECCIONE LA OPCION DESEADA",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, COMPRAR!'
      }).then((result) => {
        if (result.isConfirmed) {

            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            
            contenedorCarritoVacio.classList.add("disabled");
            contenedorCarritoProductos.classList.add("disabled");
            contenedorCarritoAcciones.classList.add("disabled");
            contenedorCarritoComprado.classList.remove("disabled");

          Swal.fire(
            'GRACIAS :D',
            '¡Disfruta tus productos. Te esperamos pronto!',
            'success'
          )
        }
      })

    

}

