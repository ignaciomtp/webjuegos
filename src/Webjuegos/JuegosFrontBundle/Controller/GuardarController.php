<?php

namespace Webjuegos\JuegosFrontBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Webjuegos\JuegosFrontBundle\Entity\Usuario;
use Webjuegos\JuegosFrontBundle\Form\Type\UsuarioType;

class GuardarController extends Controller
{
    public function formUsuarioAction(){
         $request = $this->getRequest();
         $usuario = new Usuario();
         $factory = $this->get('security.encoder_factory');
         $encoder = $factory->getEncoder($usuario);

         $form = $this->createForm(new UsuarioType(), $usuario);

         $form->handleRequest($request);

         if ($form->isSubmitted() && $form->isValid())
         {
            /** @var Symfony\Component\HttpFoundation\File\UploadedFile $file */ 
            $archivo = $usuario->getImagen(); 
            
            // Generate a unique name for the file before saving it
            $fileName = md5(uniqid()).'.'.$archivo->guessExtension();
 /*           
            $archivo->move(
                $this->getParameter('carpeta_imagenes'),
                $fileName
            ); 
            
  */
            
            $raiz = $this->get('kernel')->getRootDir();
            $destino = $raiz."/../web/uploads/imagenes/";
                    
            move_uploaded_file($archivo, $destino.$fileName);   
            
            $usuario->setImagen($fileName);
             
            $passwordEncriptada = $encoder->encodePassword($usuario->getPassword(), $usuario->getSalt());
            $usuario->setPassword($passwordEncriptada);
            
            $em = $this->getDoctrine()->getManager();
            $task = $form->getData();
            $em->persist($task);
            $em->flush();
             
            // Se procesa el formulario
             $this
                 ->get('session')
                 ->getFlashBag()->add('mensaje','El formulario era válido');

             return
                 $this
                     ->redirect($this->generateUrl('webjuegos_juegos_front_homepage'));
         }

         return $this->render(
             'WebjuegosJuegosFrontBundle:Default:formUsuario.html.twig',
             array('form' => $form->createView())
         );        
    }
    

    
}