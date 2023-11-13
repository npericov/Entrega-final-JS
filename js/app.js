
// Creación del contenedor de productos

const container = document.querySelector('.container-products');
let Catalogo;

fetch('../json/catalogo.json')
    .then(response => response.json())
    .then(data => {
        Catalogo = data;

// Agregar productos al contenedor
        for (const polera of Catalogo) {
            container.innerHTML += `
            <div id=${polera.id} class="card cardProduct">
                <img src=${polera.imagen} alt="Foto polera ${polera.producto}" class="imgProduct">
                <div class="card-body">
                    <h4 class="card-title">${polera.producto}</h4>
                    <p class="card-text">${polera.description}</p>
                    <p class="card-text">${polera.price}</p>
                    <div class="list-group">
                        <button type="button" class="btn btn-dark list-group-item" onclick="agregarCarrito('${polera.id}')" id="add-${polera.id}">Agregar al carrito</button>
                    </div>
                </div>
            </div>`;
        }

// Activar eventos después de cargar el catálogo
        ActivarBoton();
        showProducts();
        
    })
    .catch(error => console.error('Error al obtener el catálogo:', error));

document.addEventListener('click', (event) => {
    const buttonId = event.target.id;

    if (buttonId.startsWith('add-')) {
        const poleraId = buttonId.split('-')[1];
        agregarCarrito(poleraId);

        // Alerta
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Producto agregado al carrito",
            showConfirmButton: false,
            timer: 1200
        });
    }
});

 //Agregar al carrito//
let productosAgregados = [];

if (localStorage.getItem('Products-card')){
    productosAgregados = JSON.parse(localStorage.getItem('Products-card'));

    ActivarBoton();
    showProducts();
}
// Agregar productos al carrito//   
function agregarCarrito(id){
    const polerasAgregadas = Catalogo.find((polera) => polera.id === id);

    if(polerasAgregadas && !productosAgregados.some((item) => item.id === id)){
        
        const btnAdd = document.getElementById(`add-${id}`);
        btnAdd.innerHTML = 'Agregado'; 
        
        btnAdd.disabled = true; 
        
        productosAgregados.push(polerasAgregadas);
        localStorage.setItem('Products-card', JSON.stringify(productosAgregados));
        console.log(productosAgregados);

        showProducts();
        ActivarBoton();
    }
}
        




//función ver productos en carrito//
function showProducts() {
    const productElement = document.querySelector('.productslist'); //agregar clase de html , para ver los productos seleccionados en el carrito lateral.//
    productElement.innerHTML = '';

    productosAgregados.forEach((item) => {
        const ProductItem = document.createElement('div');
        ProductItem.classList.add('carrito-item');
        ProductItem.innerHTML = `
        <div id=${item.id} class="cardContainer-productslist">
        <img src=${item.imagen} alt="Foto referencial ${item.producto}" class="productslist-imgCard">
        <div class="card-body">
            <h4 class="cardTitle">${item.producto}</h4>
            <p class="cardText">${item.description}</p>
            <p class="cardText">${item.price}</p>
            <div class="list-group">
                <button class="btn btn-outline-danger delete-button" data-id=${item.id}><i class="fa-solid fa-trash"></i> Borrar del carrito</button>
            </div>
        </div>
    </div>
        `;

        const deleteButton = ProductItem.querySelector('.delete-button');
        deleteButton.addEventListener('click',() =>{
            deletePolera(item.id);
        });

        productElement.appendChild(ProductItem);
    })
}
showProducts();
ActivarBoton();




//Activar boton de la card
function ActivarBoton() {
    if (Catalogo){
    Catalogo.forEach((polera) => {
        const btnAdd = document.getElementById(`add-${polera.id}`);
        if (productosAgregados.some((item) => item.id === polera.id)) {
            btnAdd.innerHTML = 'Agregado';
            btnAdd.disabled = true; 
        } else {
            btnAdd.innerHTML = 'Agregar al carrito';
            btnAdd.disabled = false; 
        }
    });
}
}

//borrar productos del carrito//
const BorrarProduct = document.querySelector('.productslist');
BorrarProduct.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('delete-button')) {
        const idDelete = e.target.getAttribute('data-id');
        deletePolera(idDelete);
    }
});

function deletePolera(id) {
    const index = productosAgregados.findIndex((item) => item.id === id);
    if(index !== -1){
        productosAgregados.splice(index , 1) // elimina el producto

        localStorage.setItem('Products-card',JSON.stringify(productosAgregados)); //actualiza el carrito
        const itemElement = document.getElementById(id);

        if(itemElement){
            itemElement.remove();
        }

        showProducts();
        ActivarBoton();
    }
}

//Iniciar sesión//

document.getElementById("iniciarSesion").addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const btnForm = document.getElementById("btnForm");

    btnForm.textContent = 'Iniciando Sesión';

    login(username, password)
        .then((res) => {
            console.log(res);
            btnForm.textContent = 'Cerrar Sesión';
            welcome(username, btnForm);

        })
        .catch((error) => {
            console.log(error);
            btnForm.textContent = 'Iniciar Sesión'; 
        });
});

const login = (username, password) => {
    return new Promise((resolve, reject) => {

        const usuarios = [
            { username: 'admin', password: 'admin' },
        ];

        setTimeout(() => {
            const cliente = usuarios.find(user => user.username === username && user.password === password);

            if (cliente) {
                console.log('Bienvenido:', cliente);
                localStorage.setItem('user', JSON.stringify(cliente.username));
                resolve(cliente);
            } else {
                console.log('Usuario no encontrado.');
                reject('Usuario no encontrado.');
            }
        }, 2000);
    });
};

document.getElementById("iniciarSesion").addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const btnForm = document.getElementById("btnForm");

    btnForm.textContent = 'Iniciando Sesión';

    login(username, password)
        .then((res) => {
            console.log(res);
            btnForm.textContent = 'Cerrar Sesión';
            welcome(username, btnForm);
        })
        .catch((error) => {
            console.log(error);
            btnForm.textContent = 'Iniciar Sesión'; 
        });
});

const welcome = (username, btnForm) => {
    const mensajeBienvenida = document.getElementById('mensajeBienvenida');
    mensajeBienvenida.innerHTML = `¡Bienvenido, ${username}!`;


    document.getElementById('iniciarSesion').style.display = 'none';


    const cerrarSesionBtn = document.createElement('button');
    cerrarSesionBtn.textContent = 'Cerrar Sesión';
    cerrarSesionBtn.addEventListener('click', () => {
        localStorage.removeItem('user');
        mensajeBienvenida.innerHTML = ''; 
        btnForm.textContent = 'Iniciar Sesión'; 
        cerrarSesionBtn.remove(); 


        document.getElementById('iniciarSesion').style.display = 'block';
    });


    mensajeBienvenida.appendChild(cerrarSesionBtn);
};

