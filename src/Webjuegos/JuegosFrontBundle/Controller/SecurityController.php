<?php

namespace Webjuegos\JuegosFrontBundle\Controller;

 use Symfony\Bundle\FrameworkBundle\Controller\Controller;
 use Symfony\Component\Security\Core\SecurityContext;
 use Symfony\Component\Security\Core\SecurityContextInterface;
 use Symfony\Component\HttpFoundation\Request;

 class SecurityController extends Controller
 {

     public function loginAction()
     {
         $request = $this->getRequest();
         $session = $request->getSession();

         // get the login error if there is one
         if ($request->attributes->has(SecurityContextInterface::AUTHENTICATION_ERROR)) {
             $error = $request->attributes->get(
                 SecurityContextInterface::AUTHENTICATION_ERROR
             );
         } elseif (null !== $session && $session->has(SecurityContextInterface::AUTHENTICATION_ERROR)) {
             $error = $session->get(SecurityContextInterface::AUTHENTICATION_ERROR);
             $session->remove(SecurityContextInterface::AUTHENTICATION_ERROR);
         } else {
             $error = '';
         }


         return $this->render(
             'WebjuegosJuegosFrontBundle:Security:login.html.twig',
             array(
                'error' => $error,
             )
         );
     }

     
 }