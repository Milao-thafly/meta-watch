<?php

namespace App\Repository;

use App\Entity\RangedWeapons;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<RangedWeapons>
 */
class RangedWeaponsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, RangedWeapons::class);
    }

 
}
