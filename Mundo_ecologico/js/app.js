//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-productos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners () {
    //Cuando agrega un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);
    
    //Eliminar curso del carrito
    carrito.addEventListener('click', eliminarCurso)

    //Vaciar el carrito

    vaciarCarritoBtn.addEventListener('click', ()=>{

        articulosCarrito = [];

        limpiarHTML();
    })
}

//Funciones

function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatos(cursoSeleccionado);
    }
}

//Eliminar el curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        
        carritoHTML();
    }
}

function leerDatos(curso) {
 //Crea un arreglo con el contenido de la info del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        title: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        const cursos = articulosCarrito.map(curso =>{
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            }
            else{
                return curso; //retorna los objetos que no son los duplicados
            }
        })
        articulosCarrito = [...cursos]
    }
    else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    //Agrega elementos al arreglo del carrito
    
    carritoHTML();
}

function carritoHTML() {
    // limpiar HTML
    limpiarHTML();
    articulosCarrito.forEach(curso =>{
        const {imagen, title, precio, cantidad, id} = curso;
        const row = document.createElement('tr');

        row.innerHTML = `
        <td><img src="${imagen}" width="100"</td>
        <td>${title}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td> <a href="#" class="borrar-curso" data-id="${id}">X</a></td>
        `;

        // Agrega el HTML al carrito en el tbody

        contenedorCarrito.appendChild(row);

    })
}

// Elimina los cursos del tbody
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}



