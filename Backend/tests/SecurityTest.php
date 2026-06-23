<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use App\Entity\User; 

class SecurityTest extends WebTestCase
{
    public function testRegisterAndLoginScenario(): void
    {
        $client = static::createClient();
        $uniqueEmail = 'warhammer_player_' . uniqid() . '@test.com';
        $client->request(
            'POST',
            '/register', 
            [],
            [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'mail' => $uniqueEmail,
                'username' => 'Aventurier40k',
                'first_name' => 'Milao ',
                'last_name' => 'Milao',
                'birth_date' => '1995-05-21',
                'postal' => '3793 milwahkiy france 58900',
                'role' => 'ROLE_USER',
                'password' => 'SafePassword123!',
            ])
        );
        $this->assertResponseIsSuccessful();
        $client->request(
            'POST',
            '/login', 
            [],
            [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'mail' => $uniqueEmail, 
                'password' => 'SafePassword123!',
            ])
        );
        $this->assertResponseIsSuccessful();
    }
}