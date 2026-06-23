<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\DBAL\Exception\IntegrityConstraintViolationException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request; 
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AuthController extends AbstractController
{
    #[Route('/login', name: 'login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        $error = $authenticationUtils->getLastAuthenticationError();

        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->json([
            'last_username' => $lastUsername,
            'error' => $error ? $error->getMessage() : null,
        ]);
    }

    #[Route('/register', name: 'register')]
    public function register(Request $request, UserPasswordHasherInterface $passwordHasher,EntityManagerInterface $entityManager): Response
    {
        
    $data = $request->toArray();
    $user = new User();
    $user->setMail($data['mail']);
    $user->setUsername($data['username']);
    $user->setFirstName($data['first_name']);
    $user->setLastName($data['last_name']);
    $user->setPostal($data['postal']);
    if (!empty($data['birth_date'])) {
        $user->setBirthDate(new \DateTime($data['birth_date']));
    }
    $hashedPassword = $passwordHasher->hashPassword(
        $user,
        $data['password']
    );
    $user->setPassword($hashedPassword);
    $user->setRoles(['ROLE_USER']);
    $entityManager->persist($user);
    $entityManager->flush();

        return $this->json([
        'message' => 'Utilisateur creation succed',
            'user' => $user->getUserIdentifier()
        
        ], Response::HTTP_CREATED);
    }
}