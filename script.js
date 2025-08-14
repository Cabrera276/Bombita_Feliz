//DECLARAR UN ARREGLO PARA GUARDAR LOS EVENTOS
let eventos = [];

//FUNCION PARA QUE LA PAGINA SE RECARGA AUTOMATICAMENTE 
window.onload = () => {
	//RETORNAR LOS EVENTOS ALMACENADOS
	 const datos = localStorage.getItem('eventoBombita');
	//CONVERSION DE LOS DATOS
	eventos = datos ? JSON.parse(datos) : [];
	//MOSTRAR LOS ENVENTOS EN PANTALLA
	mostrarEventos();
	//AGREGAR LOS EVENTOS CON EL BOTON
	document.getElementById('btnAgregar').onclick= agregarEvento;
}

//FUNCION PARA AGREGAR EVENTOS
function agregarEvento(){
	//DECLARAR Y RETORNAR EL TITULO Y LA FECHA
	const titulo = document.getElementById('tituloEvento').value.trim();
	const fecha = document.getElementById('fechaEvento').value;
	
	//CONDICIONAL PARA VALIDAD FECHA Y TITULO
	
	if (!titulo || !fecha) {
		alert('Por favor completa el titulo y la fecha');
		return;
	}
	//CODIGO PARA VALIDAR LA FECHA DEL CALENDARIO
	const hoy = new Date().toISOString().split('T')[0];
	//VALIDAR FECHA ACTUAL
	if (fecha < hoy){
		alert('La fecha no puede ser anterior a hoy');
		return;
	}
	//AGREGAR EL EVENTO AL ARREGLO
	eventos.push({ titulo,fecha});
	//GUARDAR EN LA MEMORIA VIRTUAL 
	guardarYMostrar();
	//LIMPIAR LOS CAMPOS
	document.getElementById('tituloEvento').value = '';
	document.getElementById('fechaEvento').value = '';
}

//FUNCION PARA ELIMINAR UN EVENTO
function eliminarEvento(indice) {
	eventos.splice(indice, 1);
	guardarYMostrar();
}

//GUARDAR LOS EVENTOS EN LA MEMORIA VIRTUAL
function guardarYMostrar(){
	localStorage.setItem('eventosBombitas', JSON.stringify(eventos));
    mostrarEventos();
}

//FUNCION  PARA MOSTRAR LOS EVENTOS EN LA LISTA
function mostrarEventos(){
	const lista = document.getElementById('listaEventos');
	lista.innerHTML = '';
	
	//EMOJI DE GLOBO PARA EVENTOS
	const emojiGlobito = "\u{1F388}";
	//EVENTO PARA RECORRER LA FECHA Y EVENTOS
	eventos.forEach((e, i) => {
	const fechaObj = new Date(e.fecha);
	const fechaForm = fechaObj.toLocaleDateString('es-BO',{
		day: '2-digit',
		month: 'long',
		year: 'numeric'
	});
		//VALIDAR LA LISTA PARA LOS EVENTOS
	const li = document.createElement('li');
		li.innerHTML = `<strong>${emojiGlobito} ${e.titulo}</strong> -${fechaForm} <button onclick="eliminarEvento(${i})">Eliminar</button`;
		lista.appendChild(li);
	
	});

}