/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function comprobarMovimientos(){
    if(movimientos == 0)
    {
        guardarPartida();
        $('#puntuacion').html("<center><h1>" + puntoNumero + "</h1><h3>PUNTOS</h3></center>");
        $('#gameover').modal('show');
    }
}


function crono()
{
    tiempo--;
    actualizarMarcadores2();

    if(tiempo == 0)
    {
        clearInterval(control);
        guardarPartida();
        $('#puntuacion').html("<center><h1>" + puntoNumero + "</h1><h3>PUNTOS</h3></center>");
        $('#gameover').modal('show');
    }
	
}

