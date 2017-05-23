<?php

namespace Webjuegos\JuegosFrontBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Partida
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Webjuegos\JuegosFrontBundle\Entity\PartidaRepository")
 */
class Partida
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
     * @var integer
     *
     * @ORM\Column(name="puntos", type="integer")
     */
    private $puntos;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="fecha", type="datetime")
     */
    private $fecha;

    /**
     * @var integer
     *
     * @ORM\Column(name="id_usuario", type="integer")
     * @ORM\ManyToOne(targetEntity="Usuario")
     */
    private $idUsuario;

    /**
     * @var integer
     *
     * @ORM\Column(name="id_juego", type="integer")
     * @ORM\ManyToOne(targetEntity="Usuario")
     */
    private $idJuego;


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
     * Set puntos
     *
     * @param integer $puntos
     * @return Partida
     */
    public function setPuntos($puntos)
    {
        $this->puntos = $puntos;
    
        return $this;
    }

    /**
     * Get puntos
     *
     * @return integer 
     */
    public function getPuntos()
    {
        return $this->puntos;
    }

    /**
     * Set fecha
     *
     * @param \DateTime $fecha
     * @return Partida
     */
    public function setFecha($fecha)
    {
        $this->fecha = $fecha;
    
        return $this;
    }

    /**
     * Get fecha
     *
     * @return \DateTime 
     */
    public function getFecha()
    {
        return $this->fecha;
    }

    /**
     * Set idUsuario
     *
     * @param integer $idUsuario
     * @return Partida
     */
    public function setIdUsuario($idUsuario)
    {
        $this->idUsuario = $idUsuario;
    
        return $this;
    }

    /**
     * Get idUsuario
     *
     * @return integer 
     */
    public function getIdUsuario()
    {
        return $this->idUsuario;
    }

    /**
     * Set idJuego
     *
     * @param integer $idJuego
     * @return Partida
     */
    public function setIdJuego($idJuego)
    {
        $this->idJuego = $idJuego;
    
        return $this;
    }

    /**
     * Get idJuego
     *
     * @return integer 
     */
    public function getIdJuego()
    {
        return $this->idJuego;
    }
}