<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\User;

class AppFixtures extends Fixture
{
        public function __construct(
    private UserPasswordHasherInterface $hasher)               
    {
    }
    public function load(ObjectManager $manager): void
    {
            $user = new User();
        $user->setUsername('Peta');
        $user->setMail('peter.griffin@fuckme.com');
        $user->setPassword('123');
        $user->setLastName('Peter');
        $user->setFirstName('Griffin');        
        $user->setBirthDate(new \DateTime('1965-07-10'));
        $user->setPostal('00093');
        $user->setRoles(['ROLE_USER']);

        $hashedFixturesPass = $this->hasher->hashPassword($user, '123');
        $user->setPassword($hashedFixturesPass);

        $manager->persist($user);

        $manager->flush();

    }
}
