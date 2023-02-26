

const cargarProductosssss = async ()=>{
    const response = await fetch("../js/productos.json")
    const productosDelJson = await response.json()
    console.log(productosDelJson)
    cargarProductos(productosDelJson)
    console.log(productos)
}
cargarProductosssss()
// capturas
const contenedorProductos = document.querySelector("#contenedorProductos")
const botonesCategorias = document.querySelectorAll(".btn-categoria")
const tituloPrincipal = document.querySelector("#tituloPrincipal")
const numerito = document.querySelector("#numerito")
let productos = []
let botonesAgregar = document.querySelectorAll(".producto-agregar")


// funciones
function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML =""
    productosElegidos.forEach (producto=>{
        const div = document.createElement("div")
        div.classList.add("producto")
        div.innerHTML = `
            <img class="producto-imagen" src=".${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo" >${producto.titulo}</h3>
                <p class="producto-precio">$ ${producto.precio}</p>
                <button class="producto-agregar" id= ${producto.id}>AGREGAR</button>
            </div>
        `;
        contenedorProductos.append(div)
        productos.push(producto)
    })
    actualizarBotonesAgregar()
}

// cargarProductos(productos)

botonesCategorias.forEach(boton =>{
    boton.addEventListener("click", (e)=>{
        botonesCategorias.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active")

        if(e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerText = productoCategoria.categoria.nombre
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id) 
        cargarProductos(productosBoton)
        }else{
            cargarProductos(productos)
            tituloPrincipal.innerText = "Todos los productos"
        }
        
    } )
})

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar")
    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito)
        
    })
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e){

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);


    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Este producto ha sido añadido al carrito`,
        showConfirmButton: false,
        timer: 1500
      })


    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

// funcion del buscador en pagina catalogo

document.addEventListener("keyup", e=>{

    if (e.target.matches("#buscador")){

        e.key ==="Escape" && (e.target.value = "")

        document.querySelectorAll(".producto").forEach(elemento =>{
            elemento.querySelector(".producto-titulo").innerText.toLowerCase().includes(e.target.value.toLowerCase()) 
            ? elemento.classList.remove("filtro") 
            : elemento.classList.add("filtro");  
            
        })
    }   

    // if(no hay coincidencias){
    // (document.getElementById("coincidencia").classList.remove("filtro")) 
    // } 
})


// function simularCargaDeProductos(resultado){
//     retur new Promise((resolve, reject) => {
//         if(resultado){
//             setTimeout(()=>{
//                 resolve(productos)
//             }, 3000)
//         }else{
//             setTimeout(()=>{
//                 reject("No pudimos cargar los productos")
//             })
//         }
//     })
// }


