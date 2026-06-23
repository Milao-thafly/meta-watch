<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\ListArmy;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ListArmy>
 */
class ListArmyRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ListArmy::class);
    }

public function findArrayByUser(User $user)
{
    $results = $this->createQueryBuilder('l')
        ->leftJoin('l.detachment', 'd')
        ->addSelect('d')
        ->where('l.user = :user')
        ->setParameter('user', $user)
        ->getQuery()
        ->getResult();

    return array_map(function (ListArmy $list) {
        return [
            'id' => $list->getId(),
            'name' => $list->getName(),
            'detachment' => $list->getDetachment() ? ['name' => $list->getDetachment()->getName()] : null,
        ];
    }, $results);
}

public function findDetachmentNameByListId(int $listId)
{
    return $this->createQueryBuilder('l')
        ->select('d.name')
        ->innerJoin('l.detachment', 'd')
        ->where('l.id = :listId')
        ->setParameter('listId', $listId)
        ->getQuery()
        ->getSingleScalarResult();
}
}
