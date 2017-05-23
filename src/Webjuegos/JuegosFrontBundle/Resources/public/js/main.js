
function iniciarPartida(){

    $('#inicio').css("display", "none");
    $('#tablero').css("display", "block");
    $('#tipopartida').modal('show');
}

function continuar()
{
	document.getElementById("formularioPartida").submit();
}

function otravez()
{
        $('#btnGuardar').attr( "disabled", false );
	$('#gameover').modal('hide');
        $('#topscores').modal('hide');
        nuevaPartida();
	iniciarPartida();
}

function ini(){
	$('#gameover').modal('hide');
	location.reload();   
        
}

