<?php

namespace Webjuegos\JuegosFrontBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('WebjuegosJuegosFrontBundle:Default:index.html.twig');
    }
    
    public function verDotsAction()
    {
        return $this->render('WebjuegosJuegosFrontBundle:Default:dots.html.twig');
    }

    public function verTetrisAction()
    {
        return $this->render('WebjuegosJuegosFrontBundle:Default:tetris.html.twig');
    }    
    
    public function verBreakoutAction()
    {
        return $this->render('WebjuegosJuegosFrontBundle:Default:breakout.html.twig');
    }    
    

    public function loginAction()
    {
        return $this->render('WebjuegosJuegosFrontBundle:Security:login.html.twig');
    }    
    

    public function registroAction()
    {
        return $this->render('WebjuegosJuegosFrontBundle:Default:registro.html.twig');
    }    
        
    public function usuarioAction(){
        $session = $this->get('session');
        $user = $this->getUser();
        $em = $this->getDoctrine()->getEntityManager();
        
        $idUsuario = $user->getId();
    

        $query = $em
       ->createQuery(
         "SELECT n FROM WebjuegosJuegosFrontBundle:Partida n where n.idUsuario = :id and n.idJuego = :idj")
       ->setParameter('id', "$idUsuario")
       ->setParameter('idj', 1);
        
        $partidasTetris = $query->getResult();
       
        $query = $em
       ->createQuery(
         "SELECT n FROM WebjuegosJuegosFrontBundle:Partida n where n.idUsuario = :id and n.idJuego = :idj")
       ->setParameter('id', "$idUsuario")
       ->setParameter('idj', 3);
        
        $partidasDots = $query->getResult();
        
       // $partidasUsuario = $em->getRepository('WebjuegosJuegosFrontBundle:Partida')->findAll();

        return $this->render('WebjuegosJuegosFrontBundle:Default:perfil.html.twig', array('partidasTetris' => $partidasTetris,
                'partidasDots' => $partidasDots, 'usuario' => $user));
    }
    
}
