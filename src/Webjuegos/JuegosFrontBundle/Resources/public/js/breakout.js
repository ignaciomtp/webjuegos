

var canvas = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var radioBola = 10;
var paddleAlto = 10;
var paddleAncho = 75;
var paddleX = (canvas.width - paddleAncho)/2;
// para los controles:
var dchaPulsar = false;
var izdaPulsar = false;
var filasLadrillos = 2;
var columnasLadrillos = 8;
var controlador;

var ladrillos = [];

function inicializarLadrillos(){
    for(c = 0; c < columnasLadrillos; c++) {
       ladrillos[c] = [];
       for(f = 0; f < filasLadrillos; f++) {
           ladrillos[c][f] = { x: 0, y: 0, status: 1 };
       }
   }   
}

inicializarLadrillos();

var puntos = 0;
var puntosNivel = 0;
var nivel = 1;
var velocidad = 10;
var temp = 0; // la utilizaremos para acelerar la bola. Cada 5 ladrillos la velocidad decrecerá.

var img = new Image();

function acelerar(){
    if(temp == 5){
        temp = 0;
        velocidad--;
    }
    else{
        temp++;
    }
}

img.onload = function(){
    ctx.drawImage(img, -75, 0);
};

img.src = "../bundles/webjuegosjuegosfront/images/ladrillo.png";

document.addEventListener("keydown", pulsarTecla, false);
document.addEventListener("keyup", soltarTecla, false);
document.addEventListener("mousemove", moverRaton, false);

function pulsarTecla(e) {
    if(e.keyCode == 39) {
        dchaPulsar = true;
    }
    else if(e.keyCode == 37) {
        izdaPulsar = true;
    }
}

function soltarTecla(e) {
    if(e.keyCode == 39) {
        dchaPulsar = false;
    }
    else if(e.keyCode == 37) {
        izdaPulsar = false;
    }
}

function moverRaton(e) {
    var mousePos = getMousePos(canvas, e);

    if(mousePos > paddleX && mousePos < (paddleX + paddleAncho)){
        paddleX = mousePos - paddleAncho/2;
    }
}

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return evt.clientX - rect.left;

}

function dibujarBola() {
    ctx.beginPath();
    ctx.arc(x, y, radioBola, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function dibujarPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleAlto, paddleAncho, paddleAncho);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function dibujarLadrillos(){
    for(c = 0; c < columnasLadrillos; c++) {
        
        for(f = 0; f < filasLadrillos; f++) {
            if(ladrillos[c][f].status == 1){
                if(f % 2 == 0){
                    var ladrilloX = c * 75;
                }
                else{
                    var ladrilloX = c * 75 - 37 ;
                }
                
                var ladrilloY = f * 25
                ladrillos[c][f].x = ladrilloX;
                ladrillos[c][f].y = ladrilloY;
                ctx.drawImage(img, ladrilloX, ladrilloY);                
            }

        }
    }    
}

function detectarColision(){
    for(c = 0; c < columnasLadrillos; c++) {
        
        for(f = 0; f < filasLadrillos; f++) {
            var b = ladrillos[c][f];
            if(b.status == 1){
                if(x > b.x && x < (b.x + 75) && y > b.y && y < (b.y + 25)) {
                    dy = -dy;
                    b.status = 0;
                    puntos++;
                    puntosNivel++;
                    $('#puntos').html(puntos);
                    acelerar();
                    if(puntosNivel == filasLadrillos * columnasLadrillos){
                        clearInterval(controlador);
                        
                        $('#numnextlevel').html(nivel);
                        $('#nextlevel').modal('show');
                    }
                }                
            }

        }
    }
}

function subirNivel(){
    velocidad--;
    filasLadrillos++;
    nivel++;
    puntosNivel = 0;
    x = canvas.width/2;
    y = canvas.height-30;
    dy = -2;
    $('#nivel').html(nivel);
    inicializarLadrillos();
    $('#nextlevel').modal('hide');
    empezar();
}

function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarBola();
    dibujarPaddle();
    dibujarLadrillos();
    detectarColision();
    
    if(x + dx > canvas.width-radioBola || x + dx < radioBola) {
        dx = -dx;
    }
    if(y + dy < radioBola) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-radioBola) {
        if(x > paddleX && x < paddleX + paddleAncho) {
            dy = -dy;
        }
        else{
          //alert("GAME OVER");
          clearInterval(controlador);
          $('#gameover').modal('show');
          //document.location.reload();
        }
    }

    if(dchaPulsar && paddleX < canvas.width-paddleAncho) {
        paddleX += 7;
    }
    else if(izdaPulsar && paddleX > 0) {
        paddleX -= 7;
    }    
    
    x += dx;
    y += dy;
}



function empezar(){
    controlador = setInterval(dibujar, velocidad);
    $('#empezar').prop("disabled",true);
}

dibujar();