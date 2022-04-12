// Seccion de "to-do":

let actividades = [];
let theNumber = 0;


function Actividad(nombre, precio){
    this.nombre = nombre;
    this.precio = precio
}

let divActividades = document.getElementById('listadecosas')
let formActividades = document.getElementById('formAct')
let elGasto = document.getElementById('elGasto')

if(localStorage.getItem("Actividades")){
    actividades = JSON.parse(localStorage.getItem("Actividades"));
    actividades.forEach((act, index) => {
        divActividades.innerHTML += `
        <div class="js-content" id="act${index}">
        <p>Nombre: ${act.nombre} | Precio: ${act.precio} </p>
        <p class="boton-js"><button class="boton-small" type="submit" id="boton${index}"> Eliminar </button></p>
        </div>
        `
        theNumber += parseInt(act.precio);
        elGasto.innerHTML = `
        <p> ${theNumber} </p>
        `
    })
} else{
    localStorage.setItem("Actividades", actividades)
}

formActividades.addEventListener("submit", (e) =>{
    e.preventDefault();
    let nombre = document.getElementById("actividad").value;
    let precio = document.getElementById("precio").value;
    
    let actividad = new Actividad(nombre, precio)

    actividades.push(actividad)

    let thisIndex = actividades.findIndex(activ => activ.nombre == nombre)
    localStorage.setItem("Actividades", JSON.stringify(actividades))
    
    divActividades.innerHTML += `
    <div class="js-content" id="act${thisIndex}">
    <p>Nombre: ${actividad.nombre} | Precio: ${actividad.precio} </p>
    <p class="boton-js"><button class="boton-small" type="submit" id="boton${thisIndex}"> Eliminar </button></p>
    </div>
    `   
    theNumber += parseInt(actividad.precio);
    elGasto.innerHTML = `
    <p> ${theNumber} </p>
    `

    actividades.forEach((act, ind) =>{
        let thisBoton = document.getElementById(`boton${ind}`);
        thisBoton.addEventListener('click', ()=>{
            divActividades.removeChild(document.getElementById(`act${ind}`))
            let indiceArray = actividades.findIndex(activ => activ.nombre == act.nombre);
            actividades.splice(indiceArray, 1);
            localStorage.setItem("Actividades", JSON.stringify(actividades))
            theNumber = theNumber - parseInt(act.precio);
            elGasto.innerHTML = `
            <p> ${theNumber} </p>
            `
          })
    })
    

    Toastify({
        text: "Se agregó la actividad",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #070a61, #739ebf)",
        },
        onClick: function(){} // Callback after click
      }).showToast();

    formActividades.reset()
})

actividades.forEach((act, ind) =>{
    let thisBoton = document.getElementById(`boton${ind}`);
    thisBoton.addEventListener('click', ()=>{
        divActividades.removeChild(document.getElementById(`act${ind}`))
        let indiceArray = actividades.findIndex(activ => activ.nombre == act.nombre);
        actividades.splice(indiceArray, 1);
        localStorage.setItem("Actividades", JSON.stringify(actividades))
        theNumber = theNumber - parseInt(act.precio);
        elGasto.innerHTML = `
        <p> ${theNumber} </p>
        `
      })
})


// Sección de Ahorro



let presupuestoViaje = 0;
let gastos = [];

let formPresup = document.getElementById('formPresup')
let elPresu = document.getElementById('elPresu')


if(localStorage.getItem("Presup")){
    presu = JSON.parse(localStorage.getItem("Presup"));
    presupuestoViaje = presu;
    
    elPresu.innerHTML = `
        <p> ${presupuestoViaje} </p>
        `

} else{
    localStorage.setItem("Presup", presupuestoViaje)
}

formPresup.addEventListener("submit", (e) =>{
    e.preventDefault();
    let cantidad = document.getElementById("cantPresup").value;

    presupuestoViaje = presupuestoViaje + parseInt(cantidad)

    localStorage.setItem("Presup", JSON.stringify(presupuestoViaje))
    
    elPresu.innerHTML = `
        <p> ${presupuestoViaje} </p>
        `
    Toastify({
        text: "Se actualizó tu presupuesto",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #070a61, #739ebf)",
        },
        onClick: function(){} // Callback after click
        }).showToast();

    formPresup.reset()
})



let botonUsd = document.getElementById('usd')
let cotizacion = document.getElementById('cotizacion')

botonUsd.addEventListener("click", (e) =>{
    e.preventDefault();
    fetch('https://criptoya.com/api/dolar')
    .then((promesa) => promesa.json())
    .then(data =>{
        let {oficial, blue, solidario} = data;
        cotizacion.innerHTML = `
        <p>Oficial: $${oficial}</p>
        <p>Blue: $${blue}</p>
        <p>Solidario: $${solidario}</p>
        `
    })
})







/* NOT FOR THIS PROJECT
// Seccion Gastos

let formGasto = document.getElementById('formGasto')
let divGastos = document.getElementById('listadegastos')
let divPresuGastos = document.getElementById('elPresuGastos')
let dispoTotal = document.getElementById('totalDispo')
let totalGastado = 0;
let totalForNow = presupuestoViaje - totalGastado;

if(localStorage.getItem("Presup")){
    presu = JSON.parse(localStorage.getItem("Presup"));
    presupuestoViaje = presu;
    
    divPresuGastos.innerHTML = `
        <p> ${presupuestoViaje} </p>
        `

} else{
    localStorage.setItem("Presup", presupuestoViaje)
}

if(localStorage.getItem("Gastos")){
    gastos = JSON.parse(localStorage.getItem("Gastos"));
    gastos.forEach((gast, index) => {
        divGastos.innerHTML += `
        <div class="js-content" id="gast${index}">
        <p>Nombre: ${gast.nombre} | Precio: ${gast.precio} </p>
        <p class="boton-js"><button class="boton-small" type="submit" id="gastboton${index}"> Eliminar </button></p>
        </div>
        `
        totalGastado += parseInt(gast.precio);
        
        dispoTotal.innerHTML = `
        <p>¿Cuánto me queda?</p>
        <p> ${totalForNow} </p>
        `
    })
} else{
    localStorage.setItem("Actividades", actividades)
}

formGasto.addEventListener("submit", (e) =>{
    e.preventDefault();
    let nombre = document.getElementById("nombreGasto").value;
    let precio = document.getElementById("precioGasto").value;
    
    let gasto = new Actividad(nombre, precio)

    gastos.push(gasto)

    let thisIndex = gastos.findIndex(gast => gast.nombre == nombre)
    localStorage.setItem("Gastos", JSON.stringify(gastos))
    
    divGastos.innerHTML += `
    <div class="js-content" id="gast${thisIndex}">
    <p>Nombre: ${gasto.nombre} | Precio: ${gasto.precio} </p>
    </div>
    `   
    totalGastado += parseInt(gasto.precio);
    dispoTotal.innerHTML = `
    <p>¿Cuánto me queda?</p>
    <p> ${totalForNow} </p>
    `

    Toastify({
        text: "Se agregó el gasto",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #070a61, #739ebf)",
        },
        onClick: function(){} // Callback after click
      }).showToast();

    formGasto.reset()
})
*/