<?php

namespace App\Tests;

use PHPUnit\Framework\TestCase;
use App\Entity\Detachments; 
use App\Entity\User;
class ListCreationTest extends TestCase
{
    public function testListCreationWithDetachment(): void
    {
       
        $detachment = new Detachments();
        $detachment->setName('Lame d\'avant-garde');

        $user = new User();
        $user->setMail('player@test.com');

        $submittedData = [
            'name' => 'Ma super liste 2000 points',
            'detachment' => $detachment,
            'user' => $user
        ];

        $armyList = new \App\Entity\ListArmy(); 
        $armyList->setName($submittedData['name']);
        $armyList->setDetachment($submittedData['detachment']);
        $armyList->setUser($submittedData['user']);

        $this->assertEquals('Ma super liste 2000 points', $armyList->getName());

        $this->assertNotNull($armyList->getDetachment());
        $this->assertEquals('Lame d\'avant-garde', $armyList->getDetachment()->getName());

        $this->assertEquals('player@test.com', $armyList->getUser()->getMail());
} 
}