/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function comprobarMovimientos(){
    if(movimientos == 0)
    {

        $('#gameover').modal('show');
        
        $('#puntuacion').html("<center><h1>" + puntoNumero + "</h1><h3>PUNTOS</h3></center>");


    }
}


function crono()
{
    tiempo--;
    actualizarMarcadores2();

    if(tiempo == 0)
    {
        clearInterval(control);
        $('#gameover').modal('show');

        document.getElementById("puntuacion").innerHTML = "<center><h1>" + puntoNumero + "</h1><h3>PUNTOS</h3></center>";
    }
	
}