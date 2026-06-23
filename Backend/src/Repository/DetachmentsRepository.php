<?php

namespace App\Repository;

use App\Entity\Detachments;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Detachments>
 */
class DetachmentsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Detachments::class);
    }

       /**
        * @return Detachments[] 
        */
       public function findByExampleField($value): array
       {
           return $this->createQueryBuilder('d')
               ->andWhere('d.id = :val')
               ->setParameter('val', $value)
               ->orderBy('d.id', 'ASC')
               ->getQuery()
               ->getResult()
           ;
       }

       public function findOneBySomeField($value): ?Detachments
       {
           return $this->createQueryBuilder('d')
               ->andWhere('d.name = :val')
               ->setParameter('val', $value)
               ->getQuery()
               ->getOneOrNullResult()
           ;
       }
}
