<?php

namespace Webjuegos\JuegosFrontBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\AdvancedUserInterface;

/**
 * Usuario
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Webjuegos\JuegosFrontBundle\Entity\UsuarioRepository")
 * @UniqueEntity(fields="email", message="Email already taken")
 * 
 */
class Usuario implements AdvancedUserInterface
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre_usuario", type="string", length=100)
     * @Assert\NotBlank()
     */
    private $nombreUsuario;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=100, unique=true)
     * @Assert\NotBlank()
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=255)
     * @Assert\NotBlank()
     * 
     */
    private $password;

/********************************************************************/
    
    /**
    * @ORM\OneToMany(targetEntity="Partida", mappedBy="idUsuario")
    */
    private $partidas;
/********************************************************************/

    /**
    * @ORM\Column(type="string")
    *
    * @Assert\NotBlank(message="Subir imagen con formato jpg.")
    * @Assert\File(mimeTypes={ "image/jpeg" })
    */
    private $imagen;
 
    public function getImagen()
    {
       return $this->imagen;
    }

    public function setImagen($imagen)
    {
       $this->imagen = $imagen;

       return $this;
    }
    

/*******************************************************************/    
     public function __construct()
    {
        $this->partidas = new ArrayCollection();
    }
    
/********************************************************************/
    
    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set nombreUsuario
     *
     * @param string $nombreUsuario
     * @return Usuario
     */
    public function setNombreUsuario($nombreUsuario)
    {
        $this->nombreUsuario = $nombreUsuario;
    
        return $this;
    }

    /**
     * Get nombreUsuario
     *
     * @return string 
     */
    public function getNombreUsuario()
    {
        return $this->nombreUsuario;
    }

    /**
     * Set email
     *
     * @param string $email
     * @return Usuario
     */
    public function setEmail($email)
    {
        $this->email = $email;
    
        return $this;
    }

    /**
     * Get email
     *
     * @return string 
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set password
     *
     * @param string $password
     * @return Usuario
     */
    public function setPassword($password)
    {
        $this->password = $password;
    
        return $this;
    }

    /**
     * Get password
     *
     * @return string 
     */
    public function getPassword()
    {
        return $this->password;
    }


/*******************/    

/***********************/
        
    //// Métodos de la interfaz AdvancedUserInterface que faltan ////


     public function getRoles()
     {
        return array('ROLE_USER');
     }

     public function isAccountNonExpired()
     {
         return true;
     }

     public function isAccountNonLocked()
     {
         return true;
     }

     public function isCredentialsNonExpired()
     {
         return true;
     }

     public function isEnabled()
     {
         return true;
     }
 
     
             public function getSalt(){
            
        }
        
        public function getUsername(){
             return $this->nombreUsuario;
        }
        
        public function eraseCredentials(){
            return true;
        }
        

    /**
     * Add partidas
     *
     * @param \Webjuegos\JuegosFrontBundle\Entity\Partida $partidas
     * @return Usuario
     */
    public function addPartida(\Webjuegos\JuegosFrontBundle\Entity\Partida $partidas)
    {
        $this->partidas[] = $partidas;
    
        return $this;
    }

    /**
     * Remove partidas
     *
     * @param \Webjuegos\JuegosFrontBundle\Entity\Partida $partidas
     */
    public function removePartida(\Webjuegos\JuegosFrontBundle\Entity\Partida $partidas)
    {
        $this->partidas->removeElement($partidas);
    }

    /**
     * Get partidas
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getPartidas()
    {
        return $this->partidas;
    }
}