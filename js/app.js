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
                <button type="button" class="btn btn-dark list-group-item" onclick= "agregarCarrito('${polera.id}')" id="add-${polera.id}">Agregar al carrito</button>
            </div>
        </div>
    </div>`;}  //ok//

        //Alert//
    



    //función agregar al carrito//
const productosAgregados = [];

if (localStorage.getItem('Products-card')){
    productosAgregados = JSON.parse(localStorage.getItem('Products-card'));

    /*updateButtonState();*/
    showProducts();
}
//----------- AGREGAR A LA LISTA    
function agregarCarrito(id){
    const polerasAgregadas = Catalogo.find((polera) => polera.id === id);

    if(polerasAgregadas && !productosAgregados.some((item) => item.id === id)){
        
        const btnAdd = document.getElementById(`add-${id}`);
        btnAdd.innerHTML = 'Agregado'; //Cambia el texto interior
        
        btnAdd.disabled = true; //Deshabilita el botón
        
        productosAgregados.push(polerasAgregadas);
        localStorage.setItem('Products-card', JSON.stringify(productosAgregados));
        console.log(productosAgregados);

        showProducts();


    }
}
        /*updateButtonState();
        showSuccessToast(`El libro "${lectures.title}" fué agregado a tu lista.`);*/



    //función ver productos en carrito//
function showProducts() {
    const productElement = document.querySelector('.productslist'); //agregar clase de html , para ver los productos seleccionados en el carrito lateral.//
    productElement.innerHTML = '';

    productosAgregados.forEach((item) => {
        const ProductItem = document.createElement('div');
        ProductItem.classList.add('carrito-item');
        ProductItem.innerHTML = `
        <div id=${item.id} class="card-productslist">
        <img src=${item.imagen} alt="Foto referencial ${item.producto}" class="productslist-thumbnail">
        <div class="card-body">
            <h4 class="card-title">${item.producto}</h4>
            <p class="card-text">${item.description}</p>
            <div class="list-group">
            <button class="btn btn-outline-warning delete-button" data-id=${item.id}><i class="fa-solid fa-trash"></i> Borrar del carrito</button>
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

//----------- BORRAR DE LA LISTA
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
        /*updateButtonState();*/
    }
}

