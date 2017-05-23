/**
 * @author Nacho
 */

var canvas = document.getElementById("recuadro");
var context = canvas.getContext("2d");
//creamos el tablero, un array de 6 x 6
var tablero = new Array(6);
for(var i=0; i < 6; i++){
	tablero[i] = new Array(6);
}

var tableroColores = new Array(6);
for(var i=0; i < 6; i++)
{
	tableroColores[i] = new Array(6);
}


//creamos un array con colores
var colores = ["orange", "red", "green", "purple", "blue"];
var puntoNumero = 0;
var movimientos = 30;

var dibujando = 0;
var lineax = 0;
var lineay = 0;
var colorLinea;
var sig; //la usaremos en la animación
var seleccionados = 0;

var coloresPuntosGlobal = [];
for(var i=0; i < 6; i++){
	coloresPuntosGlobal[i] = new Array(6);
}

var borradosPorCol = [0, 0, 0, 0, 0, 0];


var cuadro = false;
var colorCuadro;
var puntosSeleccionados = [];
var ladosHor = 0;
var ladosVer = 0;

//******************************
var emp = [0, 0, 0, 0, 0, 0];

var coloresPuntos = [];
var puntosNuevos = [];
var controles = [];
var inicio = -25;


function startup() {
    canvas.addEventListener('mousedown', function(evt) {
      var mousePos = getMousePos(canvas, evt);
      seleccionar(comprobarCoordenadaX(mousePos.x), comprobarCoordenadaY(mousePos.y));
    }, false);    
    
    canvas.addEventListener('mousemove', function(evt){
        var mousePos = getMousePos(canvas, evt);
        dibujarLinea(comprobarCoordenadaX(mousePos.x), comprobarCoordenadaY(mousePos.y));
    }, false);
        
    canvas.addEventListener('mouseup', function(evt){
        soltar();
    }, false);
    
    
    canvas.addEventListener("touchstart", function(evt) {
        evt.preventDefault();
        var touch = evt.targetTouches[0];
        var rect = canvas.getBoundingClientRect();
       
        var px = touch.pageX - rect.left;
        var py = touch.pageY - rect.top;
        seleccionar(comprobarCoordenadaX(px), comprobarCoordenadaY(py));

    }, false);    
    
    canvas.addEventListener("touchmove", function(evt){
        evt.preventDefault();
        var touch = evt.targetTouches[evt.targetTouches.length - 1];
        var rect = canvas.getBoundingClientRect();
       
        var px = touch.pageX - rect.left;
        var py = touch.pageY - rect.top;        
        dibujarLinea(comprobarCoordenadaX(px), comprobarCoordenadaY(py));
    }, false);
    
    canvas.addEventListener("touchend", function(evt){
        evt.preventDefault();
        soltar();
    }, false);
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function comprobarCoordenadaX(posX){
    var x;
    if(posX < 50){
        x = 0;
    }else if(posX < 100){
        x = 1;
    }else if(posX < 150){
        x = 2;
    }else if(posX < 200){
        x = 3;
    }else if(posX < 250){
        x = 4;
    }
    else{
        x = 5;
    }
    
    return x;
}

function comprobarCoordenadaY(posY){
    var y;
    
    if(posY < 50){
        y = 0;
    }else if(posY < 100){
        y = 1;
    }else if(posY < 150){
        y = 2;
    }else if(posY < 200){
        y = 3;
    }else if(posY < 250){
        y = 4;
    }else{
        y = 5;
    }    
    
    return y;
}



function llenarTablero(){

	context.fillStyle = "white";
	context.fillRect(0, 0, 300, 300);	
	
	for(var i = 5; i > -1; i--)
	{
		for(var j = 5; j > -1; j--)
		{
			tablero[i][j] = new Punto(i, j);
			tableroColores[i][j] = tablero[i][j].color;
		}
	}
        

}

function obtenerPosicion(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}



function dibujarCirculo(color, x, y){

	context.beginPath();
	context.arc(x, y, 12, 0, degreesToRadians(360), true);
	context.fillStyle = color;
	context.fill();
}


function degreesToRadians(degrees) {
	return (degrees * Math.PI)/180;
}


function Punto(posicionX, posicionY){
	var colorNum = Math.round(Math.random()*4);  //generamos un color aleatoriamente
	this.color = colores[colorNum];
	this.posicionX = posicionX;
	this.posicionY = posicionY;
	this.pulsado = false;
	this.seleccionado = false;
	this.ctrlCaida;
	this.borrado = false;

	var x = 0;
	var y = 0;
	
	switch(this.posicionX){
		case 0: 
			x = 25;
			break;
		
		case 1:
			x = 75;
			break;
		
		case 2:
			x = 125;
			break;
		
		case 3:
			x = 175;
			break;
		
		case 4:
			x = 225;
			break;
			
		case 5:
			x = 275;
			break;
	}
	
		switch(this.posicionY){
			case 0: 
				y = 25;
				break;
			
			case 1:
				y = 75;
				break;
			
			case 2:
				y = 125;
				break;
			
			case 3:
				y = 175;
				break;
			
			case 4:
				y = 225;
				break;
				
			case 5:
				y = 275;
				break;
		}
	
	this.dibujar = dibujarCirculo(this.color, x, y);
	this.px = x;
	this.caida = y;
	this.resetY = y;
	


}


function cayendo(array, xx, yy, x){
		sig = tablero[xx][yy - 1].caida;
		
		blanquear1(xx, yy);
		for(var i = 0; i < array.length; i++) //volvemos a dibujar los círculos superiores
		{
			blanquear2(x - 25, sig - 25);
			
			dibujarCirculo(array[i], x, sig);
			sig = sig - 50;
		
		}	
		
		tablero[xx][yy -1].caida = tablero[xx][yy - 1].caida + 1;
		
		if(tablero[xx][yy - 1].caida >= tablero[xx][yy].caida)
		{
			clearInterval(controles[xx]); 
		} 

}

function cayendoVar(array, xx, yy, x, a){
	//alert(a);
	if(yy - a >= 0)
	{
		sig = tablero[xx][yy - a].caida;
		blanquear1(xx, yy);
		for(var i = 0; i < array.length; i++) //volvemos a dibujar los círculos superiores
		{
			blanquear2(x - 25, sig - 25);
				
			dibujarCirculo(array[i], x, sig);
			sig = sig - 50;
			
		}	
			
		tablero[xx][yy - a].caida = tablero[xx][yy - a].caida + 1;
			
		if(tablero[xx][yy - a].caida >= tablero[xx][yy].caida)
		{
			clearInterval(controles[xx]); 
		} 		
			
		
	}
	else
	{
		sig = tablero[xx][0].caida;
		blanquear1(xx, yy);
		for(var i = 0; i < array.length; i++) //volvemos a dibujar los círculos superiores
		{
			blanquear2(x - 25, sig - 25);
				
			dibujarCirculo(array[i], x, sig);
			sig = sig - 50;
			
		}	
			
		tablero[xx][0].caida = tablero[xx][0].caida + 1;
			
		if(tablero[xx][0].caida >= tablero[xx][yy].caida)
		{
			clearInterval(controles[xx]); 
		} 				
	}
	

}


function cayendoPrimero(array, xx, yy, x)
{
	
	blanquear1(xx, yy);
	
	dibujarCirculo(array[0], x, inicio);
	
	inicio++;
	
	if(inicio >= tablero[xx][yy].caida)
	{
            clearInterval(controles[xx]); 
	}
	
}

function seleccionar(x, y){
	tablero[x][y].pulsado = true;
	colorLinea = tablero[x][y].color;
	lineax = x;
	lineay = y;
	dibujando = 1;
	var seleccionado = x + ", " + y;
	puntosSeleccionados.push(seleccionado);
}

function dibujarLinea(x, y){
	if(dibujando == 1)
	{
		var este = x + ", " + y;
		var existe = false;
		var canvas = document.getElementById("recuadro");
		var context = canvas.getContext("2d");
		context.fillStyle = colorLinea;
		if(y == lineay && x != lineax)
		{
			
			if(colorLinea == tablero[x][y].color)
			{
				if(x == lineax + 1 || x == lineax - 1) //sólo si es un punto contiguo
				{
	
					if(x > lineax)
					{
						context.fillRect(calcularPosicionX(lineax), calcularPosicionY(lineay)-3, 50, 12);
	
					}
					else
					{
						context.fillRect(calcularPosicionX(lineax), calcularPosicionY(lineay)-3, -50, 12);
					}
		
					//Comprobar si este punto está ya seleccionado o no
					if(!tablero[x][y].seleccionado)
					{
						ladosHor++; //si no lo estaba, incrementamos el número de lados horizontales
					}
					
					
					//comprobar si esta casilla está en el array de seleccionados, 
					
					for(var i = 0; i < puntosSeleccionados.length; i++)
					{
						if(este == puntosSeleccionados[i])
						{
							existe = true;
						}
					}
					
					tablero[x][y].seleccionado = true;
					seleccionados ++;
					lineax = x;				
					
					//si está en el array de seleccionados, y hay dos o más lados horizontales y verticales, es que 
					//se ha cerrado un cuadro
					if(existe && ladosHor >= 2 && ladosVer >= 2)
					{
						cerrarCuadro();
						//setTimeout(cerrarCuadro, 1000);
					}
					else
					{
						var seleccionado = x + ", " + y;
						puntosSeleccionados.push(seleccionado);				
					}
				
				}
				
			}
			
			
		}
		else if(x == lineax && y != lineay)
		{
			
			if(colorLinea == tablero[x][y].color)
			{
				if(y == lineay + 1 || y == lineay - 1)
				{
					
					
					if(y > lineay)
					{
						context.fillRect(calcularPosicionX(lineax)-3, calcularPosicionY(lineay), 12, 50);
					}
					else
					{
						context.fillRect(calcularPosicionX(lineax)-3, calcularPosicionY(lineay), 12, -50);
					}
					
					//Mismo de antes: comprobar si este punto está ya seleccionado o no
					if(!tablero[x][y].seleccionado)
					{
						ladosVer++; //incrementamos el número de lados verticales
					}
					
					tablero[x][y].seleccionado = true;
					seleccionados ++;
					lineay = y;
					
					//Comprobar otra vez
					
					for(var i = 0; i < puntosSeleccionados.length; i++)
					{
						if(este == puntosSeleccionados[i])
						{
							existe = true;
						}
					}
					
					if(existe && ladosHor >= 2 && ladosVer >= 2)
					{
						cerrarCuadro();
					}
					else
					{
						var seleccionado = x + ", " + y;
						puntosSeleccionados.push(seleccionado);				
					}
				
				}
				
			}
			

		}
			

	}
	

}

function soltar(){


		if(seleccionados == 0)
		{
			tablero[lineax][lineay].pulsado = false;
		}
		else
		{
		
				for(var i = 5; i > -1; i--)
				{
					for(var j = 5; j > -1; j--)
					{
						if(tablero[i][j].seleccionado || tablero[i][j].pulsado)
						{
							tablero[i][j].borrado = true;
							borradosPorCol[i]++;
						
						}
						
				
					}
				}
				
				for(var i = 5; i > -1; i--)
				{
					if(borradosPorCol[i] > 0)
					{
						borrarPuntos(i);
					}
				}
				
				movimientos--;
						
				reemplazar();
				coloresMovimiento();
				resetear();
                                if(tipoPartida == "m"){
                                    actualizarMarcadores();
                                    comprobarMovimientos();	
                                    
                                }else{
                                    actualizarMarcadores2();
                                }
								
			
		}
		


}

function borrarPuntos(x)
{
	var coloresPuntos = [];
	var b = 0;
	
	for(var i = 5; i > -1; i--)
	{
	
		
		if(tablero[x][i].borrado)
		{
			puntoNumero++;
			blanquearCasilla(x, i);
			if(emp[x] == 0)
			{
				emp[x] = i; 
			}
		
		}
	} // end for
	
	//alert(emp[x]);
	
	for(var j = emp[x] - 1; j > -1; j--)
	{
		if(!tablero[x][j].borrado)
		{
			coloresPuntos[b] = tablero[x][j].color;
		}
		else
		{
			coloresPuntos[b] = "white";
		}
						
		b++;
	}
	
	var puntosBorrados = borradosPorCol[x];
	
	do
	{
		if(cuadro)
		{
			var e = -1;
			do
			{
				var a = Math.round(Math.random()*4);
				var nueva = colores[a];
				if(nueva != colorLinea)
				{
					e = 0;
				}
			}while(e < 0);
		}
		else
		{
			var a = Math.round(Math.random()*4);
			var nueva = colores[a];	
		}
		
		coloresPuntos.push(nueva);
		puntosBorrados--;
		
	}while(puntosBorrados > 0);
	
	
	

	for(var c = 0; c < coloresPuntos.length; c++)
	{
		coloresPuntosGlobal[x][c] = coloresPuntos[c];
	}

	if(borradosPorCol[x] == 1)
	{
		var y = emp[x];
		if(y != 0)
		{
			controles[x] = setInterval(cayendo, 5, coloresPuntos, x, y, tablero[x][y].px);
		}
		else
		{
			controles[x] = setInterval(cayendoPrimero, 5, coloresPuntos, x, y, tablero[x][y].px);
		}
		
	}
	else
	{
		
		var y = emp[x];
		var nuevoArray = [];
		var c = 0;
		
		for(var k = 0; k < coloresPuntos.length; k++)
		{
			if(coloresPuntos[k] != "white")
			{
				nuevoArray[c] = coloresPuntos[k];
				c++;
			}
			
			
		}
		
	
		controles[x] = setInterval(cayendoVar, 5, nuevoArray, x, y, tablero[x][y].px, borradosPorCol[x]);
		
	}
	
}



function calcularPosicionX(x){
	var px;
	switch(x){
		case 0: 
			px = 22;
			break;
		
		case 1:
			px = 72;
			break;
		
		case 2:
			px = 122;
			break;
		
		case 3:
			px = 172;
			break;
		
		case 4:
			px = 222;
			break;
			
		case 5:
			px = 272;
			break;
	}
	
	return px;
	
}


function calcularPosicionY(y){
	var py;
	switch(y){
		case 0: 
			py = 22;
			break;
		
		case 1:
			py = 72;
			break;
		
		case 2:
			py = 122;
			break;
		
		case 3:
			py = 172;
			break;
		
		case 4:
			py = 222;
			break;
			
		case 5:
			py = 272;
			break;
	}
	
	return py;
	
}



function blanquear1(x, y){
	
	var px;
	var py;
	

	
	switch(x){
		case 0: 
			px = 0;
			break;
		
		case 1:
			px = 50;
			break;
		
		case 2:
			px = 100;
			break;
		
		case 3:
			px = 150;
			break;
		
		case 4:
			px = 200;
			break;
			
		case 5:
			px = 250;
			break;
	}
	
		switch(y){
			case 0: 
				py = 50;
				break;
			
			case 1:
				py = 100;
				break;
			
			case 2:
				py = 150;
				break;
			
			case 3:
				py = 200;
				break;
			
			case 4:
				py = 250;
				break;
				
			case 5:
				py = 300;
				break;
		}	
	
		

	context.fillStyle = "white";
	context.fillRect(px, py, 50, -py);
	
	
}


function blanquear2(a, b){
	
		var j = b + 50;
		var canvas2 = document.getElementById("recuadro");
		var context2 = canvas2.getContext("2d");
		context2.fillStyle = "white";
		context2.fillRect(a, 0, 50, j);	


}

function blanquear3(px, alto)
{
		var canvas2 = document.getElementById("recuadro");
		var context2 = canvas2.getContext("2d");
		context2.fillStyle = "white";
		context2.fillRect(px, 0, 50, alto);		
}


function verColores(){
	var a = "a";
	var posicion;
	
	for(var i = 5; i > -1; i--)
	{
		for(var j = 5; j > -1; j--)
		{
			//tablero[i][j] = new Punto(i, j);
			posicion = a + i + a + j;
			document.getElementById(posicion).innerHTML = posicion + " - " + tableroColores[i][j];
		}
	}	
	
}

function resetear()
{
	
	for(var i = 5; i > -1; i--)
	{
		for(var j = 5; j > -1; j--)
		{
			tablero[i][j].seleccionado = false;
			tablero[i][j].pulsado = false;
			tablero[i][j].borrado = false;
			tablero[i][j].caida = tablero[i][j].resetY;
		}
	}	
	
	lineax = 0;
	lineay = 0;
	dibujando = 0;
	seleccionados = 0;	
	borradosPorCol = [0, 0, 0, 0, 0, 0];
	
	
	puntosSeleccionados.length = 0;		
	ladosHor = 0;
	ladosVer = 0;
	
	inicio = -25;
	for(var k = 5; k > -1; k--)
	{
		
		emp[k] = 0;
	}
}

function reemplazar()
{
	for(var i = 5; i > -1; i--)
	{
		if(borradosPorCol[i] > 0)
		{
			var coloresPuntosReemp = [];
			var a = 0;
			for(var k = 0; k < coloresPuntosGlobal[i].length; k++)
			{
				if(coloresPuntosGlobal[i][k] != "white")
				{
					//coloresPuntosGlobal.splice(k, 1);
					coloresPuntosReemp[a] = coloresPuntosGlobal[i][k];
					a++;
					
				}
			}
			
			var b = 0;
			for(var j = emp[i]; j > -1; j--)
			{
				tableroColores[i][j] = coloresPuntosReemp[b];
				b++;
			}
			
				
		}
	}

	
}

function coloresMovimiento()
{
	for(var i = 5; i > -1; i--)
	{
		for(var j = 5; j > -1; j--)
		{
			
			tablero[i][j].color = tableroColores[i][j];
		}
	}	
}

function borrarUno(x, y)
{
	if(barredor)
	{
		var aa = tablero[x][y].color;
		borrarColor(aa);
		barredor = false;
		document.getElementById('boton-poder3').disabled = true;
	}
	else{
		if(eliminadores > 0)
		{
			eliminadores--;
			
			document.getElementById("pod2").innerHTML = eliminadores;
			tablero[x][y].borrado = true;
			borradosPorCol[x]++;
			borrarPuntos(x);
	
			movimientos--;
			reemplazar();
			coloresMovimiento();
			actualizarMarcadores();
			resetear();
			comprobarMovimientos();
		}
				
	}
	
	

}

function cerrarCuadro()
{
	//alert("Cuadroooooo!!!");
	cuadro = true;		
	movimientos--;	
	for(var i = 5; i > -1; i--)
	{
		for(var j = 5; j > -1; j--)
		{
			if(tablero[i][j].color == colorLinea)
			{
				tablero[i][j].borrado = true;
				borradosPorCol[i]++;
					
			}

		}
	}
			
	for(var i = 5; i > -1; i--)
	{
		if(borradosPorCol[i] > 0)
		{
			borrarPuntos(i);
		}
	}

		
		reemplazar();
                if(tipoPartida == "m"){
                    actualizarMarcadores();
                }else{
                    actualizarMarcadores2();
                }
		
		coloresMovimiento();
		resetear();
		comprobarMovimientos();
	
	
}

function borrarColor(color)
{
	for(var i = 5; i > -1; i--)
	{
		for(var j = 5; j > -1; j--)
		{
			if(tablero[i][j].color == color)
			{
				tablero[i][j].borrado = true;
				borradosPorCol[i]++;
					
			}
					
			
		}
	}
			
	
			for(var i = 5; i > -1; i--)
			{
				if(borradosPorCol[i] > 0)
				{
					borrarPuntos(i);
				}
			}

		
		reemplazar();
		actualizarMarcadores();		
		coloresMovimiento();
		resetear();
		comprobarMovimientos();
			
}

function blanquearCasilla(x, y)
{
	
	var px;
	var py;
	

	
	switch(x){
		case 0: 
			px = 0;
			break;
		
		case 1:
			px = 50;
			break;
		
		case 2:
			px = 100;
			break;
		
		case 3:
			px = 150;
			break;
		
		case 4:
			px = 200;
			break;
			
		case 5:
			px = 250;
			break;
	}
	
		switch(y){
			case 0: 
				py = 0;
				break;
			
			case 1:
				py = 50;
				break;
			
			case 2:
				py = 100;
				break;
			
			case 3:
				py = 150;
				break;
			
			case 4:
				py = 200;
				break;
				
			case 5:
				py = 250;
				break;
		}	

	context.fillStyle = "white";
	context.fillRect(px, py, 50, 50);	
}





function otraPartida()
{

	
	setTimeout(redireccionar, 1000);
}


//***********************************************


var tipoPartida;
var tiempo = 60;
var control;

var relojesM;
var barredor = false;
var barredores;
var eliminadores;
	
function partidaMovimientos(){
        puntoNumero = 0;
	movimientos = 30;
        tipoPartida = "m";
        actualizarMarcadores();
	$('#tipopartida').modal('hide');
        document.getElementById("clasePartida").innerHTML = "Movimientos";
	llenarTablero();
	
	
	
}

function partidaContra(){

        puntoNumero = 0;
        tiempo = 60;
	$('#tipopartida').modal('hide');
	document.getElementById("clasePartida").innerHTML = "Tiempo";
	llenarTablero();
	tipoPartida = "c";
	actualizarMarcadores2();	
	
	control = setInterval(crono, 1000);
}




function actualizarMarcadores()
{
    document.getElementById("mov").innerHTML = movimientos;
    document.getElementById("ptos").innerHTML = puntoNumero;
}

function actualizarMarcadores2()
{
	document.getElementById("mov").innerHTML = tiempo;
        document.getElementById("ptos").innerHTML = puntoNumero;
	
}

function aplicarPoder1(){
	if(tipoPartida == "m")
	{
		relojesM--;
		movimientos = movimientos + 5;

		document.getElementById('mov').innerHTML = movimientos;		
	}
	else{
		relojesM--;
		tiempo = tiempo + 10;
		actualizarMarcadores2;
		
	}
	
	document.getElementById('pod1').innerHTML = relojesM;
	document.getElementById('boton-poder1').disabled = true;
	document.getElementById('boton-poder1').style.backgroundColor = '#95D195';	

	
}

function nuevaPartida(){
    tiempo = 60;
    movimientos = 30;
    puntoNumero = 0;
    resetear();
}





