<?php

namespace Webjuegos\JuegosFrontBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Juego
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Webjuegos\JuegosFrontBundle\Entity\JuegoRepository")
 */
class Juego
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
     * @ORM\Column(name="nombre", type="string", length=100)
     */
    private $nombre;

    /***************************************************************/
    
    /**
    * @ORM\ManyToMany(targetEntity="Partida", mappedBy="idJuego")
    */
   private $partidas;

   public function __construct()
   {
       $this->partidas = new ArrayCollection();
   }    
    
    
    
    /****************************************************************/   
    
    

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
     * Set nombre
     *
     * @param string $nombre
     * @return Juego
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    
        return $this;
    }

    /**
     * Get nombre
     *
     * @return string 
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * Add partidas
     *
     * @param \Webjuegos\JuegosFrontBundle\Entity\Partida $partidas
     * @return Juego
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