<?php

namespace Webjuegos\JuegosFrontBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Webjuegos\JuegosFrontBundle\Entity\Partida;

class Guardar2Controller extends Controller
{
    public function guardarPuntuacionAction(){

        //$fecha = date('Y-m-d H:i:s');
        $fecha = new \DateTime(date('Y-m-d H:i:s'));
 
        $puntos = $_POST['puntos'];
        
        
        $usuario = $this->getUser()->getId();
        $juego = $_POST['juego'];
        
        $partida = new Partida();
        
        $partida->setFecha($fecha);
        $partida->setPuntos($puntos);
        $partida->setIdJuego($juego);
        $partida->setIdUsuario($usuario);
        
        $em = $this->getDoctrine()->getManager();
        $em->persist($partida);
        $em->flush();        


    }
}
