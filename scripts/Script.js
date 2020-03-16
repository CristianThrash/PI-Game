//Inicializaciones y variables Globales
var aux = [];
// Preguntas quemadas en código por cuestiones de tiempo.
aux.push({c: "Derechos de autor", d: "Protegen formas originales de expresión (ideas, procedimientos, conceptos matemáticos, software)"});
aux.push({c: "Propiedad industrial", d: "Derecho temporal de explotar en forma exclusiva las creaciones intelectuales que impactan áreas productivas"});
aux.push({c: "Patente", d: "Derecho que otorga el Estado a un inventor para la explotación comercial de su invención de manera exclusiva, durante un tiempo determinado"});
aux.push({c: "Secreto Industrial", d: "Información que se mantiene bajo el control de la empresa y se difunde de manera selectiva dentro"});
aux.push({c: "Derechos de obtentor", d: "Otorgado por el estado a los mejoradores de variedades vegetales, de 15 a 20 años"});
aux.push({c: "Propiedad intelectual", d: "Se divide en derechos de autor y propiedad industrial"});
aux.push({c: "Invenciones industriales", d: "Creaciones intelectuales con una clara aplicación industrial"});
aux.push({c: "Signos distintivos", d: "Permiten otorgar al cosumidor garantía de calidad, permiten fidelización"});
aux.push({c: "Bitacoras de investigación", d: "Se recomienda protegerlas mediante secreto industrial"});
aux.push({c: "Variedades vegetales", d: "Se recomienda protegerlas mediante derechos de obtentor"});
aux.push({c: "Software", d: "No es patentable"});
aux.push({c: "Circuitos integrados", d: "Se protegen mediante derechos de autor"});
aux.push({c: "Nuevos materiales", d: "deben ser patentados"});
aux.push({c: "Gestión efectiva", d: "permite a las empresas utilizar sus activos de propiedad intelectual para aumentar su competitividad"});
aux.push({c: "Inteligencia competitiva", d: "Facilita la vigilancia en las tendencias tecnológicas"});
aux.push({c: "Info dominio público", d: "Permite diseñar proyectos y tener un punto de referencia"});
aux.push({c: "Estrategia de protección PI", d: "Conjunto de políticas empresariales para apropiarse de los beneficios económicos de I+D"});
aux.push({c: "Descubrimientos", d: "No son patentables ya que no constituyen una invención"});
aux.push({c: "Título de patente", d: "Es equiparable a un título de propiedad"});
aux.push({c: "Secreto industrial", d: "Debe ser específicado en un soporte físico"});
aux.push({c: "Selección de proyectos de I+D", d: "Proceso administrativo de mayor injerencia en la consolidación de innovación"});
aux.push({c: "Vigilacia del patrimonio tecnológico", d: "Supervición de que terceras personas usen de forma no autorizada la PI"});
aux.push({c: "Auditoría de PI", d: "Conocer exactamente la cuál es la PI con la que cuenta una institución"});
aux.push({c: "Política de adquisición", d: "Permite evitar la invasión de derechos"});
var conceptos =[[]];
var descripciones =[[]];
iniciarPreguntas();
var cajas = [];
iniciarCajas();
var seleccionados = [];
var cajaPorSeleccionar = -1;
var tiempoRevision = 100;
var jugando = true;
var puntaje = 0;
var fallas = 0;
var nivel = 1;
var tab = new Tablero();
tab.inicializar();
var lienzo = $("#lienzo")[0];
var context = lienzo.getContext("2d");
var dibujador = new Dibujador();
//Fin inicializaciones y variables globales

//Funciones auxiliares
function iniciarPreguntas(){
	conceptos = [[new Carta(aux[0].c,"Concepto",1),new Carta(aux[1].c,"Concepto",2),new Carta(aux[2].c,"Concepto",3),new Carta(aux[3].c,"Concepto",4),new Carta(aux[4].c,"Concepto",5),new Carta(aux[5].c,"Concepto",6),new Carta(aux[6].c,"Concepto",7),new Carta(aux[7].c,"Concepto",8)],
				 [new Carta(aux[8].c,"Concepto",1),new Carta(aux[9].c,"Concepto",2),new Carta(aux[10].c,"Concepto",3),new Carta(aux[11].c,"Concepto",4),new Carta(aux[12].c,"Concepto",5),new Carta(aux[13].c,"Concepto",6),new Carta(aux[14].c,"Concepto",7),new Carta(aux[15].c,"Concepto",8)],
				 [new Carta(aux[16].c,"Concepto",1),new Carta(aux[17].c,"Concepto",2),new Carta(aux[18].c,"Concepto",3),new Carta(aux[19].c,"Concepto",4),new Carta(aux[20].c,"Concepto",5),new Carta(aux[21].c,"Concepto",6),new Carta(aux[22].c,"Concepto",7),new Carta(aux[23].c,"Concepto",8)]];

	descripciones = [[new Carta(aux[0].d,"Descripción",1),new Carta(aux[1].d,"Descripción",2),new Carta(aux[2].d,"Descripción",3),new Carta(aux[3].d,"Descripción",4),new Carta(aux[4].d,"Descripción",5),new Carta(aux[5].d,"Descripción",6),new Carta(aux[6].d,"Descripción",7),new Carta(aux[7].d,"Descripción",8)],
				 [new Carta(aux[8].d,"Descripción",1),new Carta(aux[9].d,"Descripción",2),new Carta(aux[10].d,"Descripción",3),new Carta(aux[11].d,"Descripción",4),new Carta(aux[12].d,"Descripción",5),new Carta(aux[13].d,"Descripción",6),new Carta(aux[14].d,"Descripción",7),new Carta(aux[15].d,"Descripción",8)],
				 [new Carta(aux[16].d,"Descripción",1),new Carta(aux[17].d,"Descripción",2),new Carta(aux[18].d,"Descripción",3),new Carta(aux[19].d,"Descripción",4),new Carta(aux[20].d,"Descripción",5),new Carta(aux[21].d,"Descripción",6),new Carta(aux[22].d,"Descripción",7),new Carta(aux[23].d,"Descripción",8)]];

}

function iniciarCajas(){
	cajas = [];
	for (i = 0; i<16; i++){
		cajas.push({x: 0, y: 0,width: 0, height: 0,state: 'des',i: 0,j: 0});
	}
}

function terminado(){
	for (i = 0; i<cajas.length; i++){
		if(cajas[i].state!='bloq'){
			return false;
		}
	}
	return true;
}

function ajusteDeTexto(texto, x, y, maxWidth, alturaDeLinea){
	var palabrasRy = texto.split(" ");
	var lineaDeTexto = "";
	for(var i = 0; i < palabrasRy.length; i++) {
		var testTexto = lineaDeTexto + palabrasRy[i] + " ";
		var textWidth = context.measureText(testTexto).width;
		if (textWidth > maxWidth  && i > 0) {
			context.fillText(lineaDeTexto, x, y);		
			lineaDeTexto = palabrasRy[i]+ " "
			y += alturaDeLinea;
		}else {
			lineaDeTexto = testTexto;
		}
	}
	context.fillText(lineaDeTexto, x, y);
}
//Fin funciones auxiliares.

window.onload = dibujar(); //Función principal

//Lógica de negocio
function Carta(texto, tipo, iden){
	this.texto = texto;
	this.tipo = tipo;
	this.iden = iden;
}

function Tablero(){
	this.matriz = [[],[],[],[]];

	this.inicializar = function(){
		this.matriz = [[],[],[],[]];
		var k = 0;
		for(i = 0; i<4; i++){
			for(j=0;j<2; j++){
				k = Math.floor((Math.random() * (conceptos[nivel-1].length)));
				console.log('long: '+conceptos[nivel-1].length);
				console.log('Alea: '+k);
				this.matriz[i].push(conceptos[nivel-1][k]);
				conceptos[nivel-1].splice(k,1);
				k = Math.floor((Math.random() * (descripciones[nivel-1].length)));
				console.log('long: '+descripciones[nivel-1].length);
				console.log('Alea: '+k);
				this.matriz[i].push(descripciones[nivel-1][k]);
				descripciones[nivel-1].splice(k,1);
			}
		}
	}

	this.mostrar = function(){
		for(i = 0; i<4; i++){
			console.log(this.matriz[i][0].texto+' '+this.matriz[i][1].texto+' '+this.matriz[i][2].texto+' '+this.matriz[i][3].texto);
		}
	}
}

//Elementos Gráficos
function Dibujador(){
	this.img = new Image();

	this.dibujar = function(ctx,x1,y1,width,height,src){
		this.img.src = src;
		ctx.save();
		ctx.drawImage(this.img,x1,y1,width,height);
		ctx.restore();
	}
}
//Fin elementos gráficos

//Gestión de eventos
lienzo.onmousemove = function(event){
	var cx = event.clientX - lienzo.getBoundingClientRect().left;
	var cy = event.clientY - lienzo.getBoundingClientRect().top;
	for (var i = 0; i < cajas.length; i++){
	if(cajas[i].x < cx 
	&& (cajas[i].width + cajas[i].x > cx)
	&& cajas[i].y < cy
	&& (cajas[i].height + cajas[i].y > cy) && cajas[i].state=='des' && jugando){
		cajaPorSeleccionar = i;
		break;
	}else{
		cajaPorSeleccionar = -1;
	}
	}
};

lienzo.onclick = function(event){
	var cx = event.clientX - lienzo.getBoundingClientRect().left;
	var cy = event.clientY - lienzo.getBoundingClientRect().top;
	for (var i = 0; i < cajas.length; i++){
	if(cajas[i].x < cx 
	&& (cajas[i].width + cajas[i].x > cx)
	&& cajas[i].y < cy
	&& (cajas[i].height + cajas[i].y > cy) && cajas[i].state=='des' && jugando){
		cajas[i].state='sel';
		seleccionados.push(cajas[i]);
		break;
	}
	}
};
//Fin gestión de eventos

//Función principal
function dibujar(){
	if(jugando && nivel<4){
		context.fillStyle = "white";
		context.fillRect(0,0,640,480);
		context.fillStyle = "black";
		context.font = "italic 20px Times New Roman";
		context.fillText('Puntaje: '+puntaje, 380, 15);
		context.fillText('Fallas: '+fallas, 480, 15);
		context.fillText('Nivel: '+nivel, 570, 15);
		context.font = "italic 30px Times New Roman";
		var cont = 0;
		for(i = 0; i<tab.matriz.length; i++){
			for(j=0;j<tab.matriz[i].length; j++){
				dibujador.dibujar(context, j*100, i*100, 70, 90, "imgs/cartaAtras.jpg");
				cajas[cont].x = j*100;
				cajas[cont].y = i*100;
				cajas[cont].width = 70;
				cajas[cont].height = 90;
				cajas[cont].i = i;
				cajas[cont].j = j;
				cont++;
				//context.fillText(tab.matriz[i][j].texto, j*100+25, i*100+55);
			}
		}
		for(i = 0; i<cajas.length; i++){
			if((cajaPorSeleccionar==i) && (cajas[i].state!='sel')){
				dibujador.dibujar(context,cajas[i].x,cajas[i].y,cajas[i].width,cajas[i].height, "imgs/cartaAtrasSel.jpg");
			}
			if((cajas[i].state=='sel')){
				dibujador.dibujar(context,cajas[i].x,cajas[i].y,cajas[i].width,cajas[i].height, "imgs/carta.png");
				context.fillText(tab.matriz[cajas[i].i][cajas[i].j].tipo.substring(0,1), cajas[i].x+25, cajas[i].y+55);
			}
			if((cajas[i].state=='bloq')){
				context.fillRect(cajas[i].x,cajas[i].y,cajas[i].width,cajas[i].height);
			}
		}
		for (i = 0; i<seleccionados.length; i++){
			var lx1 = 0;
			var lx2 = 0;
			if(i == 0){
				var lx1 = 40;
				var lx2 = 60;
			}else{
				var lx1 = 250;
				var lx2 = 270;
			}
			context.font = "italic 20px Times New Roman";
			context.fillText(tab.matriz[seleccionados[i].i][seleccionados[i].j].tipo, 380, lx1);
			ajusteDeTexto(tab.matriz[seleccionados[i].i][seleccionados[i].j].texto,380,lx2,250,30);
			context.font = "italic 30px Times New Roman";
		}
		if(seleccionados.length==2){
			if (tab.matriz[seleccionados[0].i][seleccionados[0].j].iden == tab.matriz[seleccionados[1].i][seleccionados[1].j].iden){
				seleccionados[0].state = 'bloq';
				seleccionados[1].state = 'bloq';
				tiempoRevision = 100;
				jugando = false;
				context.fillText("CORRECTO", 100, 450);
				puntaje++;
			}else{
				seleccionados[0].state = 'des';
				seleccionados[1].state = 'des';
				tiempoRevision = 100;
				jugando = false;
				context.fillText("FALLASTE", 100, 450);
				fallas++;
			}
			seleccionados = [];
			if(terminado()){
				nivel++;
				if(nivel == 4){
					mensaje="Ganaste Volver a Jugar F5";
				}
				tab.inicializar();
				puntaje=0;
				fallas=0;
				iniciarCajas();
			}
			if(fallas ==20){
				nivel = 4;
				mensaje="Perdiste Reintentar F5";
			}
		}
	}else {
		if(tiempoRevision>0){
			tiempoRevision--;
		}else{
			jugando = true;
		}
		if(nivel == 4){
			context.fillStyle = "white";
			context.fillRect(0,0,640,480);
			context.fillStyle = "black";
			context.fillText(mensaje,200,240);
		}
	}

	setTimeout("dibujar()",20);
}