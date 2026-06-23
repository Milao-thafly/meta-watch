<?php

namespace App\Repository;

use App\Entity\Unite;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Unite>
 */
class UniteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Unite::class);
    }

    public function findWithFactions(int $id): ?Unite
{
    return $this->createQueryBuilder('u')
        ->leftJoin('u.faction', 'f')
        ->addSelect('f')
        ->andWhere('u.id = :id')
        ->setParameter('id', $id)
        ->getQuery()
        ->getOneOrNullResult();
}

public function findBySection(int $sectionId): array
{
    return $this->createQueryBuilder('u')
        ->innerJoin('u.section', 's') // Jointure avec la collection de sections
        ->where('s.id = :sectionId')
        ->setParameter('sectionId', $sectionId)
        ->getQuery()
        ->getResult();
}
}
