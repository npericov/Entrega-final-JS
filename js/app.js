//ARRAY DE PRODUCTOS

const Catalogo = [
    {
        id: '1',
        producto: 'Polera Blanca',
        imagen:"https://plus.unsplash.com/premium_photo-1682096340835-022e6647b698?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:'Polera de algodón',
        price:'$10000 + IVA',
    },
    {
        id: '2',
        producto: 'Polera Negra',
        imagen:'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description:'Polera de algodón',
        price:'$10000 + IVA',
    },
    {
        id: '3',
        producto: 'Polera Roja',
        imagen:'https://images.unsplash.com/photo-1619735007512-34004ec2f348?auto=format&fit=crop&q=80&w=2071&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description:'Polera de algodón',
        price:'$12000 + IVA',
    },
    {
        id: '4',
        producto: 'Polera Gris',
        imagen:'https://images.unsplash.com/photo-1529429649738-cf96fc78378b?auto=format&fit=crop&q=80&w=1776&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description:'Polera de algodón',
        price:'$14000 + IVA',
    },
    {
        id: '5',
        producto: 'Polera Amarilla',
        imagen:'https://plus.unsplash.com/premium_photo-1693161217771-fe5476a38014?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description:'Polera de algodón',
        price:'$13000 + IVA',
    },
    {
        id: '6',
        producto: 'Polera Verde',
        imagen:'https://plus.unsplash.com/premium_photo-1690347838523-d35c74ccefb0?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D7771-fe5476a38014?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description:'Polera de algodón',
        price:'$10000 + IVA',
    },
    {
        id: '7',
        producto: 'Polera Rosada',
        imagen:'https://images.unsplash.com/photo-1502765281178-656f7e7d300f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description:'Polera de algodón',
        price:'$10000 + IVA',
    },
    {
        id: '8',
        producto: 'Polera Azul',
        imagen:'https://plus.unsplash.com/premium_photo-1663127154672-b26540eca238?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description:'Polera de algodón',
        price:'$10000 + IVA',
    },
]

// Creación del contenedor de productos

const container = document.querySelector('.container-products');

for (const polera of Catalogo) {
    container.innerHTML += `
    <div id=${polera.id} class="card cardProduct">
        <img src=${polera.imagen} alt="Foto polera ${polera.producto}" class="imgProduct">
        <div class="card-body">
            <h4 class="card-title">${polera.producto}</h4>
            <p class="card-text">${polera.description}</p>
            <p class="card-text">${polera.price}</p>
            <div class="list-group">
                <button type="button" class="btn btn-dark list-group-item"  onclick= "agregarCarrito('${polera.id}')" id="add-${polera.id}">Agregar al carrito</button>
            </div>
        </div>
    </div>`; //ok//
}  
// Agrega evento clic al botón
document.addEventListener('click', (event) => {
    const buttonId = event.target.id;

    if (buttonId.startsWith('add-')) {
        const poleraId = buttonId.split('-')[1];
        agregarCarrito(poleraId);
        
// Muestra el alert de SweetAlert2
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Producto agregado al carrito",
            showConfirmButton: false,
            timer: 1200
        });
    }
}); //ok//

 //Agregar al carrito//
const productosAgregados = [];

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
        // Simulación de verificación de usuario
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

const welcome = (username, btnForm) => {
    const mensajeBienvenida = document.getElementById('mensajeBienvenida');
    mensajeBienvenida.innerHTML = `¡Bienvenido, ${username}!`;

    const cerrarSesionBtn = document.createElement('button');
    cerrarSesionBtn.textContent = 'Cerrar Sesión';
    cerrarSesionBtn.addEventListener('click', () => {
        localStorage.removeItem('user');
        mensajeBienvenida.innerHTML = ''; 
        btnForm.textContent = 'Iniciar Sesión'; 
        cerrarSesionBtn.remove(); 
    });

    document.body.appendChild(cerrarSesionBtn);
};
