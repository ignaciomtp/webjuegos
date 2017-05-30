<?php

namespace Webjuegos\JuegosFrontBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;


use Symfony\Component\HttpFoundation\File\UploadedFile;

class UsuarioType extends AbstractType{
    
    public function buildForm(FormBuilderInterface $builder, array $options){
        $builder->add('nombre_usuario', 'text')
                ->add('email', 'email')
                ->add('password', 'password')
                ->add('imagen', 'file', array('label' => 'Imagen (jpg file)'))

                ->add('guardar', 'submit', array('label' => 'Guardar'));
    }
    
    public function getName()
    {
        return 'usuario';
    }


    public function getDefaultOptions(array $options)
    {
        return array(
            'data_class' => 'Webjuegos\JuegosFrontBundle\Entity\Usuario',
        );
    }    
}
 