<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Faction;
use App\Entity\Detachments;
use App\Entity\ListArmy;
use App\Entity\RangedWeapons;
use App\Entity\MeleeWeapons;
use App\Repository\UniteRepository;
use App\Repository\SectionRepository;
use App\Repository\ListArmyRepository;
use App\Repository\DetachmentsRepository;
use App\Repository\FactionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\DBAL\Exception\IntegrityConstraintViolationException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request; 
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;


class ListController extends AbstractController {
    #[Route('/addList', name: 'add_list', methods: ['POST'])]
    #[IsGranted('ROLE_USER')]
    public function AddList(Request $request, EntityManagerInterface $em, FactionRepository $factionRepository): Response{
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['error' => 'Données invalides'], Response::HTTP_BAD_REQUEST);
        }
        $factionId = $data['faction_id'] ?? null;
        $faction = $factionRepository->find($factionId);

        if (!$faction) {
            return $this->json(['error' => 'Faction non trouvée'], Response::HTTP_NOT_FOUND);
        }

        $listArmy = new ListArmy();
        $listArmy->setName($data['title'] ?? 'Sans nom');
        $listArmy->setDescription($data['description'] ?? null);
        $listArmy->setPoint($data['format'] ?? '0');
        $listArmy->setVisibility((bool)($data['is_public'] ?? false));

        $listArmy->setUser($this->getUser());

        $em->persist($listArmy);
        $em->flush();
        return $this -> json([
            'message' => 'List added',
            'id' => $listArmy->getId()
        ], Response::HTTP_CREATED);
    }

    #[Route('/api/lists', name: 'api_list_browse', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function listBrowse(ListArmyRepository $listArmyRepository): Response
    {
            /** @var User $user */
        $user = $this->getUser();
        
        return $this->json($listArmyRepository->findArrayByUser($this->getUser()));

    return new Response($json, 200, ['Content-Type' => 'application/json']);
    }

    #[Route('/addDetachment', 'add_detachment', methods: 'POST')]
    #[IsGranted('ROLE_USER')]
    public function AddDetachment (Request $request, EntityManagerInterface $em, ListArmyRepository $listArmyRepository, DetachmentsRepository $detachmentRepository)
    {
      $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['error' => 'Données invalides'], Response::HTTP_BAD_REQUEST);
        }

        $user = $this->getUser();
        
        $listArmy = $listArmyRepository->findOneBy(['user' => $user]);

        if (!$listArmy) {
        return $this->json(['error' => 'Aucune liste active trouvée pour cet utilisateur. Créer une liste d\'abord.'], Response::HTTP_NOT_FOUND);
    }
    $detachmentId = $data['detachment_id'] ;
    $detachment = $detachmentRepository->find($detachmentId);

    if(!$detachment) {
        return $this->json(['error' => 'Detachment not found'], Response::HTTP_NOT_FOUND);
    }

    $listArmy->setDetachment($detachment);

    $em->flush();
    return $this->json([
        'message' => 'Detachment added to the list',
        'list_id' => $listArmy->getId()
    ], Response::HTTP_OK);
    }

  

        #[Route('/api/detachments', name: 'api_detachment_list', methods: ['GET'])]
public function listDetachment(DetachmentsRepository $detachmentRepository): Response
{
    $detachments = $detachmentRepository->findAll();

    $data = array_map(function ($detachment) {
        return [
            'id' => $detachment->getId(),
            'name' => $detachment->getName(),
        ];
    }, $detachments);

    return $this->json($data);
}
#[Route('/api/units', name: 'api_units_list', methods: ['GET'])]
public function list(Request $request, UniteRepository $repo): Response
{
    $sectionId = $request->query->get('section');

    if ($sectionId) {
        $units = $repo->findBySection((int)$sectionId);
    } else {
        $units = $repo->findAll();
    }
    
    $data = array_map(function ($unit) {
        $sections = $unit->getSection();
        $sectionId = $sections->count() > 0 ? $sections->first()->getId() : null;
$ranged = [];
        foreach ($unit->getRangedWeapons() as $weapon) {
            $ranged[] = [
                'id' => $weapon->getId(),
                'name' => $weapon->getName(),
                'length' => $weapon->getLength(),
                'attack' => $weapon->getAttack(),
                'precision' => $weapon->getPrecision(),
                'strength' => $weapon->getStrength(),
                'damage' => $weapon->getDamage(),
            ];
        }

        $melee = [];
        foreach ($unit->getMeleeWeapons() as $weapon) {
            $melee[] = [
                'id' => $weapon->getId(),
                'name' => $weapon->getName(),
                'length' => $weapon->getLength(),
                'attack' => $weapon->getAttack(),
                'precision' => $weapon->getPrecision(),
                'strength' => $weapon->getStrength(),
                'damage' => $weapon->getDamage(),
                
            ];
        }

        return [
            'id' => $unit->getId(),
            'name' => $unit->getName(),
            'section_id' => $sectionId, 
            'mouvement' => $unit->getMouvement(),
            'stamina' => $unit->getStamina(),
            'save' => $unit->getSave(),
            'pv' => $unit->getPv(),
            'commandement' => $unit->getCommandement(),
            'co' => $unit->getCo(),
            'aptitude' => $unit->getAptitude(),
            'ranged_weapons' => $ranged,
            'melee_weapons' => $melee,
        ];
    }, $units);
    
    return $this->json($data);
}

#[Route('/api/sections', name: 'api_sections_list', methods: ['GET'])]
    public function sections(SectionRepository $sectionRepository): JsonResponse
    {
        $sections = $sectionRepository->findAll();
        
        $data = [];
        foreach ($sections as $section) {
            $data[] = [
                'id' => $section->getId(),
                'name' => $section->getName(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/api/admin/ranged_weapons/{id}', name: 'api_admin_get_ranged_weapon', methods: ['GET'])]
                        #[IsGranted('ROLE_ADMIN')]
                        public function getRangedWeapon(int $id, RangedWeaponsRepository $rangedWeaponsRepository): Response
                        {
                                $weapon = $rangedWeaponsRepository->find($id);

                                if (!$weapon) {
                                        return $this->json(['error' => 'Weapon not found'], Response::HTTP_NOT_FOUND);
                                }

                                $statsData = [];
                                foreach ($weapon->getWeaponStats()->toArray() as $stat) {
                                        $statsData[] = [
                                                'id' => $stat->getId(),
                                                'name' => $stat->getName(),
                                                'length' => $weapon->getLength(),
                                                'attack' => $weapon->getAttack(),
                                                'precision' => $weapon->getPrecision(),
                                                'strength' => $weapon->getStrength(),
                                                'damage' => $weapon->getDamage(),
                                        ];
                                }

                                return $this->json([
                                        'id' => $weapon->getId(),
                                        'name' => $weapon->getName(),
                                        'length' => $weapon->getLength(),
                                        'Attack' => $weapon->getAttack(),
                                        'precision' => $weapon->getPrecision(),
                                        'strength' => $weapon->getStrength(),
                                        'damage' => $weapon->getDamage(),
                                        'weapon_stats' => $statsData,
                                ], Response::HTTP_OK);
                        }

                        #[Route('/api/admin/melee_weapons/{id}', name: 'api_admin_get_melee_weapon', methods: ['GET'])]
                        #[IsGranted('ROLE_ADMIN')]
                        public function getMeleeWeapon(int $id, MeleeWeaponsRepository $meleeWeaponsRepository): Response
                        {
                                $weapon = $meleeWeaponsRepository->find($id);

                                if (!$weapon) {
                                        return $this->json(['error' => 'Weapon not found'], Response::HTTP_NOT_FOUND);
                                }

                                $statsData = [];
                                foreach ($weapon->getWeaponStats()->toArray() as $stat) {
                                        $statsData[] = [
                                                'id' => $stat->getId(),
                                                'name' => $stat->getName(),
                                                'length' => $weapon->getLength(),
                                                'attack' => $weapon->getAttack(),
                                                'precision' => $weapon->getPrecision(),
                                                'strength' => $weapon->getStrength(),
                                                'damage' => $weapon->getDamage(),
                                        ];
                                }

                                return $this->json([
                                        'id' => $weapon->getId(),
                                        'name' => $weapon->getName(),
                                        'length' => $weapon->getLength(),
                                        'Attack' => $weapon->getAttack(),
                                        'precision' => $weapon->getPrecision(),
                                        'strength' => $weapon->getStrength(),
                                        'damage' => $weapon->getDamage(),
                                        'weapon_stats' => $statsData,
                                ], Response::HTTP_OK);
                        }
}