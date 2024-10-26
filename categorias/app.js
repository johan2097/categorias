let listaCategoria = [];

const objCategoria = {
    id: '',
    nombre: '',
    puesto: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const puestoInput = document.querySelector('#puesto');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || puestoInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarCategoria();
        editando = false;
    } else {
        objCategoria.id = Date.now();
        objCategoria.nombre = nombreInput.value;
        objCategoria.puesto = puestoInput.value;

        agregarCategoria();
    }
}

function agregarCategoria() {

    listaCategoria.push({...objCategoria});

    mostrarCategoria();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objCategoria.id = '';
    objCategoria.nombre = '';
    objCategoria.puesto = '';
}

function mostrarCategoria() {
    limpiarHTML();

    const divCategoria = document.querySelector('.div-categoria');
    
    listaCategoria.forEach(categoria => {
        const {id, nombre, puesto} = categoria;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${puesto} - `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarCategoria(categoria);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarCategoria(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divCategoria.appendChild(parrafo);
        divCategoria.appendChild(hr);
    });
}

function cargarCategoria(categoria) {
    const {id, nombre, puesto} = categoria;

    nombreInput.value = nombre;
    puestoInput.value = puesto;

    objCategoria.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarCategoria() {

    objCategoria.nombre = nombreInput.value;
    objCategoria.puesto = puestoInput.value;

    listaCategoria.map(categoria => {

        if(categoria.id === objCategoria.id) {
            categoria.id = objCategoria.id;
            categoria.nombre = objCategoria.nombre;
            categoria.puesto = objCategoria.puesto;

        }

    });

    limpiarHTML();
    mostrarCategoria();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarCategoria(id) {

    listaCategoria = listaCategoria.filter(categoria => categoria.id !== id);

    limpiarHTML();
    mostrarCategoria();
}

function limpiarHTML() {
    const divCategoria = document.querySelector('.div-categoria');
    while(divCategoria.firstChild) {
        divCategoria.removeChild(divCategoria.firstChild);
    }
}