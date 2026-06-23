<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Faction;
use App\Entity\Section;
use App\Entity\Detachments;
use App\Entity\WeaponStat;
use App\Entity\RangedWeapons;
use App\Entity\MeleeWeapons;
use App\Entity\Unite;
use App\Repository\UniteRepository;
use App\Repository\SectionRepository;
use App\Repository\WeaponStatRepository;
use App\Repository\RangedWeaponsRepository;
use App\Repository\MeleeWeaponsRepository;
use App\Repository\FactionRepository;
use App\Repository\ListArmyRepository;
use App\Repository\DetachmentsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\DBAL\Exception\IntegrityConstraintViolationException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request; 
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\HttpFoundation\JsonResponse;

class AdminController extends AbstractController{


        #[Route('/addFaction', name: 'faction')]
        #[IsGranted('ROLE_ADMIN')]
        public function addFaction (Request $request, EntityManagerInterface $em): Response{
                $data = $request->toArray();

                if (!isset($data['name'])){
                        return $this->json([
                        'error' => 'Le payload JSON est vide ou mal formé.'
                        ], Response::HTTP_BAD_REQUEST);
                }
                $faction = new Faction();
                $faction->setName($data['name']);
                $faction->setDescription($data['description'] ?? null);

                try{
                        $em->persist($faction);
                        $em->flush();
                }catch (IntegrityConstraintViolationException $error){
                        return $this->json([
                        'message' => 'Faction already excist',
                ],Response::HTTP_BAD_REQUEST);
                }
                return $this->json([
                        'message' => 'Faction Created',

                ],Response::HTTP_CREATED);
        }

        #[Route('/api/admin/faction/{id}/modify', name: 'api_admin_modify_faction', methods: ['PUT'])]
        #[IsGranted('ROLE_ADMIN')]
        public function modifyFaction(int $id, Request $request, FactionRepository $factionRepository, EntityManagerInterface $em): Response
        {
                $faction = $factionRepository->find($id);

                if (!$faction) {
                        return $this->json(['error' => 'Faction introuvable'], Response::HTTP_NOT_FOUND);
                }

                $data = $request->toArray();

                if (!$data) {
                        $data = $request->request->all();
                }

                if (!$data) {
                        return $this->json(['error' => 'Invalid data or bad Json response given.'], Response::HTTP_BAD_REQUEST);
                }

                if (!isset($data['name']) || empty(trim($data['name']))) {
                        return $this->json(['error' => 'Le nom de la faction est obligatoire.'], Response::HTTP_BAD_REQUEST);
                }

                $faction->setName($data['name']);
                $faction->setDescription($data['description'] ?? null);

                try {
                        $em->flush();
                } catch (IntegrityConstraintViolationException $error) {
                        return $this->json([
                                'message' => 'Une faction avec ce nom existe déjà.',
                        ], Response::HTTP_BAD_REQUEST);
                }

                return $this->json([
                        'message' => 'Faction updated successfully',
                ], Response::HTTP_OK);
        }

        #[Route('/api/admin/faction/{id}', name: 'api_admin_get_faction', methods: ['GET'])]
        #[IsGranted('ROLE_ADMIN')]
        public function getFaction(int $id, FactionRepository $factionRepository): Response
        {
                $faction = $factionRepository->find($id);

                if (!$faction) {
                        return $this->json(['error' => 'Faction introuvable'], Response::HTTP_NOT_FOUND);
                }

                return $this->json([
                        'id' => $faction->getId(),
                        'name' => $faction->getName(),
                        'description' => $faction->getDescription() ?? '',
                ], Response::HTTP_OK);
        }

        #[Route('/api/admin/faction/{id}', name: 'app_faction_delete', methods: ['DELETE'])]
                        public function deleteFaction(int $id, EntityManagerInterface $entityManager, FactionRepository $repository): JsonResponse
                        {
                        $faction = $repository->find($id);

                        if (!$faction) {
                                return new JsonResponse(['error' => 'Faction not found'], 404);
                        }

                        $entityManager->remove($faction);
                        $entityManager->flush();

                        return new JsonResponse(['message' => 'Faction deleted successfully'], 200);
                        }
        
        
                
        #[Route('/addDetachments', name: 'detachments', methods: ['POST'])]
        #[IsGranted('ROLE_ADMIN')]
        public function addDetachments (Request $request, FactionRepository $factionRepository,EntityManagerInterface $em): Response{
                $data = $request->toArray();
                if (!$data) {
                        return $this->json(['error' => 'Donnée invalide'], Response::HTTP_BAD_REQUEST);
                }

                $factionId = $data['faction_id'] ?? null;
                $faction = $factionRepository->find($factionId);

                if(!$faction) {
                        return $this->json(['error' => 'Faction non trouvée'], Response::HTTP_NOT_FOUND);
                }
                $detachment = new Detachments();
                $detachment->setName($data['name'] ?? '');
                $detachment->setDescription($data['description'] ?? '');
                $detachment->setFaction($faction);

                $detachment->setStratagems($data['stratagems'] ?? []);
                $detachment->setOptimisations($data['enhancements'] ?? []);

                $em->persist($detachment);
                $em->flush();
                
                return $this->json([
                'message' => 'Detachment created.',
        ],      Response::HTTP_CREATED);
        }   

        #[Route('/api/sections', name: 'api_sections', methods: ['GET'])]
        public function getSections(SectionRepository $repo): JsonResponse
        {
        $sections = $repo->findAll();
        $data = [];
        foreach ($sections as $section) {
                $data[] = ['id' => $section->getId(), 'name' => $section->getName()];
        }
        return new JsonResponse($data);
        }

        #[Route('/addUnitsAdmin', name: 'add_units_admin', methods: ['POST'])]
        #[IsGranted('ROLE_ADMIN')]
        public function addUnitsAdmin(
        Request $request, 
        UniteRepository $uniteRepository,
        FactionRepository $factionRepository,
        RangedWeaponsRepository $rangedWeaponsRepository,
        MeleeWeaponsRepository $meleeWeaponsRepository, 
        SectionRepository $sectionRepository, 
        EntityManagerInterface $em
        ): Response {
        $data = $request->toArray();  
        if (!$data) {
                return $this->json(['error' => 'Invalid Data'], Response::HTTP_BAD_REQUEST);
        }

        $unite = new Unite();
        $unite->setName($data['name'] ?? '');
        $unite->setAptitude($data['aptitude'] ?? null);
        $unite->setNumber($data['number'] ?? '');
        $unite->setMouvement($data['mouvement'] ?? '');
        $unite->setStamina($data['stamina'] ?? '');
        $unite->setSave($data['save'] ?? '');
        $unite->setPv($data['pv'] ?? '');
        $unite->setCommandement($data['commandement'] ?? '');
        $unite->setCo($data['co'] ?? '');
        if (!empty($data['section'])) {
                $section = $sectionRepository->find($data['section']);
                if ($section) {
                $unite->addSection($section);
                }
        }
        

        if (!empty($data['faction_id'])) {
                $faction = $factionRepository->find($data['faction_id']);
                if ($faction) {
                $unite->addFaction($faction);
                }
        }
        
        if (isset($data['ranged_weapons']) && is_array($data['ranged_weapons'])) {
                foreach ($data['ranged_weapons'] as $weaponId) {
                $weapon = $rangedWeaponsRepository->find($weaponId);
                if ($weapon) $unite->addRangedWeapon($weapon);
                }
        }

        if (isset($data['melee_weapons']) && is_array($data['melee_weapons'])) {
                foreach ($data['melee_weapons'] as $weaponId) {
                $weapon = $meleeWeaponsRepository->find($weaponId);
                if ($weapon) $unite->addMeleeWeapon($weapon);
                }
        }
        $em->persist($unite);
        $em->flush();

        return $this->json(['message' => 'Unite added.'], Response::HTTP_CREATED);
        }

        #[Route('/api/admin/unite/{id}/modify', name: 'api_admin_modify_unite', methods: ['POST', 'PUT', 'PATCH'])]
        #[IsGranted('ROLE_ADMIN')]
        public function modifyUnite(int $id, Request $request, 
        UniteRepository $uniteRepository, 
        SectionRepository $sectionRepository, 
        FactionRepository $factionRepository,
        RangedWeaponsRepository $rangedWeaponsRepository,
    MeleeWeaponsRepository $meleeWeaponsRepository,
        EntityManagerInterface $em): Response {
        $unite = $uniteRepository->find($id);
        if (!$unite) return $this->json(['error' => 'Unit not found'], Response::HTTP_NOT_FOUND);

        $data = $request->toArray();
        $unite->setName($data['name'] ?? '');
        $unite->setAptitude($data['aptitude'] ?? null);
                $unite->setNumber($data['number'] ?? '');
                $unite->setMouvement($data['mouvement'] ?? '');
                $unite->setStamina($data['stamina'] ?? '');
                $unite->setSave($data['save'] ?? '');
                $unite->setPv($data['pv'] ?? '');
                $unite->setCommandement($data['commandement'] ?? '');
                $unite->setCo($data['co'] ?? '');
                if (isset($data['section'])) {
                foreach ($unite->getSection() as $old) $unite->removeSection($old);
                if ($s = $sectionRepository->find($data['section'])) $unite->addSection($s);
        }

        if (isset($data['faction_id'])) {
                foreach ($unite->getFaction() as $old) $unite->removeFaction($old);
                if ($f = $factionRepository->find($data['faction_id'])) $unite->addFaction($f);
        }

        if (isset($data['ranged_weapons'])) {
                foreach ($unite->getRangedWeapons() as $old) $unite->removeRangedWeapon($old);
                foreach ($data['ranged_weapons'] as $id) {
                if ($w = $rangedWeaponsRepository->find($id)) $unite->addRangedWeapon($w);
                }
        }

        if (isset($data['melee_weapons'])) {
                foreach ($unite->getMeleeWeapons() as $old) $unite->removeMeleeWeapon($old);
                foreach ($data['melee_weapons'] as $id) {
                if ($w = $meleeWeaponsRepository->find($id)) $unite->addMeleeWeapon($w);
                }
        }

        $em->flush();
        return $this->json(['message' => 'Unite updated.'], Response::HTTP_OK);

        }


                        #[Route('/api/admin/unite/{id}', name: 'api_admin_get_unite', methods: ['GET'])]
                        #[IsGranted('ROLE_ADMIN')]
                        public function getUnite(int $id, UniteRepository $uniteRepository): Response
                        {
                        $unite = $uniteRepository->findWithFactions($id);

                        if (!$unite) {
                                return $this->json(['error' => 'Unit not found'], Response::HTTP_NOT_FOUND);
                        }

                        
                        $factionsData = [];
                        foreach ($unite->getFaction() as $oldFaction) {
                        $unite->removeFaction($oldFaction);
                        }

                        return $this->json([
                                'id' => $unite->getId(),
                                'name' => $unite->getName(),
                                'number' => $unite->getNumber(),
                                'mouvement' => $unite->getMouvement(),
                                'stamina' => $unite->getStamina(),
                                'save' => $unite->getSave(),
                                'pv' => $unite->getPv(),
                                'commandement' => $unite->getCommandement(),
                                'co' => $unite->getCo(),
                                'aptitude' => $unite->getAptitude() ?? '', 
                                'factions' => $factionsData, 
                        ], Response::HTTP_OK);
                        }

                        #[Route('/api/admin/unite/{id}', name: 'app_unite_delete', methods: ['DELETE'])]
                        public function deleteUnite(int $id, EntityManagerInterface $entityManager, UniteRepository $uniteRepository): JsonResponse
                        {
                        $unite = $uniteRepository->find($id);

                        if (!$unite) {
                                return new JsonResponse(['error' => 'Unite not found'], 404);
                        }

                        $entityManager->remove($unite);
                        $entityManager->flush();

                        return new JsonResponse(['message' => 'Unite deleted successfully'], 200);
                        }

                        #[Route('/addWeaponStatAdmin', name: 'add_weapon_stat', methods: ['POST'])]
                        #[IsGranted('ROLE_ADMIN')]
                        public function addWeaponStatAdmin (Request $request, EntityManagerInterface $em): Response{
                                $data = $request->toArray();

                                if (!$data || !isset($data['name'])){
                                return $this->json([
                                'error' => 'Le payload JSON est vide ou mal formé.'
                                ], Response::HTTP_BAD_REQUEST);
                        }

                                $weapon_stat = new WeaponStat();
                                $weapon_stat->setName($data['name'] ?? '');
                                $weapon_stat->setDescription($data['description'] ?? '');
                                
                                $em->persist($weapon_stat);
                                $em->flush();

                                return $this->json([
                                'message' => 'Stat added.',
                        ],      Response::HTTP_CREATED);
                        }

                        #[Route('/addRangedAdmin', name: 'add_ranged_admin', methods: ['POST'])]
                        #[IsGranted('ROLE_ADMIN')]
                        public function addRangedAdmin (Request $request, WeaponStatRepository $weaponStatRepository ,EntityManagerInterface $em): Response{
                        $data = $request->toArray();

                                if (!isset($data['name'])){
                                return $this->json([
                                'error' => 'Le payload JSON est vide ou mal formé.'
                                ], Response::HTTP_BAD_REQUEST);
                        }

                                $ranged_weapon = new RangedWeapons();
                                $ranged_weapon->setName($data['name'] ?? '');
                                $ranged_weapon->setLength($data['length'] ?? '');
                                $ranged_weapon->setAttack((int)($data['Attack'] ?? 0));
                                $ranged_weapon->setPrecision ($data['precision'] ?? '');
                                $ranged_weapon->setStrength ($data['strength'] ?? '');
                                $ranged_weapon->setDamage ($data['damage'] ?? '');
                                
                        if (isset($data['weapon_stats']) && is_array($data['weapon_stats'])) {
                                foreach ($data['weapon_stats'] as $statId) {
                                $stat = $weaponStatRepository->find($statId);
                                if ($stat) {
                                        $ranged_weapon->addWeaponStat($stat); 
                                        }
                                }
                        }

                                $em->persist($ranged_weapon);
                                $em->flush();

                                return $this->json([
                                'message' => 'Weapon added.',
                        ],      Response::HTTP_CREATED);
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

                        #[Route('/api/admin/ranged_weapons/{id}/modify', name: 'api_admin_modify_ranged_weapon', methods: ['PUT'])]
                        #[IsGranted('ROLE_ADMIN')]
                        public function modifyRangedWeapon(
                                int $id, 
                                Request $request, 
                                RangedWeaponsRepository $rangedWeaponsRepository, 
                                WeaponStatRepository $weaponStatRepository, 
                                EntityManagerInterface $em
                        ): Response {
                                $weapon = $rangedWeaponsRepository->find($id);

                                if (!$weapon) {
                                        return $this->json(['error' => 'weapon not found'], Response::HTTP_NOT_FOUND);
                                }

                                $data = $request->toArray();
                                if (!$data) {
                                        $data = $request->request->all();
                                }

                                if (!$data || !isset($data['name']) || empty(trim($data['name']))) {
                                        return $this->json(['error' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
                                }

                                $weapon->setName($data['name']);
                                $weapon->setLength($data['length'] ?? '');
                                $weapon->setAttack((int)($data['Attack'] ?? 0));
                                $weapon->setPrecision($data['precision'] ?? '');
                                $weapon->setStrength($data['strength'] ?? '');
                                $weapon->setDamage($data['damage'] ?? '');

                                foreach ($weapon->getWeaponStats()->toArray() as $oldStat) {
                                        $weapon->removeWeaponStat($oldStat);
                                }

                                if (isset($data['weapon_stats']) && is_array($data['weapon_stats'])) {
                                        foreach ($data['weapon_stats'] as $statId) {
                                                $stat = $weaponStatRepository->find($statId);
                                                if ($stat) {
                                                        $weapon->addWeaponStat($stat);
                                                }
                                        }
                                }

                                try {
                                        $em->flush();
                                } catch (\Exception $error) {
                                        return $this->json([
                                                'message' => 'Error',
                                        ], Response::HTTP_BAD_REQUEST);
                                }

                                return $this->json([
                                        'message' => 'Ranged weapon updated successfully',
                                ], Response::HTTP_OK);
                        }
                        #[Route('/api/admin/ranged_weapons/{id}', name: 'app_ranged_delete', methods: ['DELETE'])]
                        public function deleteRanged(int $id, EntityManagerInterface $entityManager, RangedWeaponsRepository $repository): JsonResponse
                        {
                        $weapon = $repository->find($id);

                        if (!$weapon) {
                                return new JsonResponse(['error' => 'Weapon not found'], 404);
                        }

                        $entityManager->remove($weapon);
                        $entityManager->flush();

                        return new JsonResponse(['message' => 'Weapon deleted successfully'], 200);
                        }

                        

                        #[Route('/addMeleeAdmin', name: 'add_melee_admin', methods: ['POST'])]
                        #[IsGranted('ROLE_ADMIN')]
                        public function addMeleeAdmin (Request $request, WeaponStatRepository $weaponStatRepository ,EntityManagerInterface $em): Response{
                                $data = $request->toArray();

                                if (!$data || !isset($data['name'])){
                                return $this->json([
                                'error' => 'Le payload JSON est vide ou mal formé.'
                                ], Response::HTTP_BAD_REQUEST);
                        }

                                $melee_weapon = new MeleeWeapons();
                                $melee_weapon->setName($data['name'] ?? '');
                                $melee_weapon->setLength($data['length'] ?? '');
                                $melee_weapon->setAttack((int)($data['Attack'] ?? 0));
                                $melee_weapon->setPrecision ($data['precision'] ?? '');
                                $melee_weapon->setStrength ($data['strength'] ?? '');
                                $melee_weapon->setDamage ($data['damage'] ?? '');
                                $melee_weapon->setPenetration($data['penetration'] ?? '');
                                
                                
                                if (isset($data['weapon_stats']) && is_array($data['weapon_stats'])) {
                                        foreach ($data['weapon_stats'] as $statId) {
                                                $stat = $weaponStatRepository->find($statId);
                                                if ($stat) {
                                                $melee_weapon->addWeaponStat($stat); 
                                                }
                                        }
                                }
                                $em->persist($melee_weapon);
                                $em->flush();

                                return $this->json([
                                'message' => 'Weapon added.',
                        ],      Response::HTTP_CREATED);
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

                        #[Route('/api/admin/melee_weapons/{id}/modify', name: 'api_admin_modify_melee_weapon', methods: ['PUT'])]
                        #[IsGranted('ROLE_ADMIN')]
                        public function modifyMeleeWeapon(
                                int $id, 
                                Request $request, 
                                MeleeWeaponsRepository $meleeWeaponsRepository, 
                                WeaponStatRepository $weaponStatRepository, 
                                EntityManagerInterface $em
                        ): Response {
                                $weapon = $meleeWeaponsRepository->find($id);

                                if (!$weapon) {
                                        return $this->json(['error' => 'weapon not found'], Response::HTTP_NOT_FOUND);
                                }

                                $data = $request->toArray();
                                if (!$data) {
                                        $data = $request->request->all();
                                }

                                if (!$data || !isset($data['name']) || empty(trim($data['name']))) {
                                        return $this->json(['error' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
                                }

                                $weapon->setName($data['name']);
                                $weapon->setLength($data['length'] ?? '');
                                $weapon->setAttack((int)($data['Attack'] ?? 0));
                                $weapon->setPrecision($data['precision'] ?? '');
                                $weapon->setStrength($data['strength'] ?? '');
                                $weapon->setDamage($data['damage'] ?? '');

                                foreach ($weapon->getWeaponStats()->toArray() as $oldStat) {
                                        $weapon->removeWeaponStat($oldStat);
                                }

                                if (isset($data['weapon_stats']) && is_array($data['weapon_stats'])) {
                                        foreach ($data['weapon_stats'] as $statId) {
                                                $stat = $weaponStatRepository->find($statId);
                                                if ($stat) {
                                                        $weapon->addWeaponStat($stat);
                                                }
                                        }
                                }

                                try {
                                        $em->flush();
                                } catch (\Exception $error) {
                                        return $this->json([
                                                'message' => 'Error',
                                        ], Response::HTTP_BAD_REQUEST);
                                }

                                return $this->json([
                                        'message' => 'Melee weapon updated successfully',
                                ], Response::HTTP_OK);
                        }

                        #[Route('/api/admin/melee_weapons/{id}', name: 'app_melee_delete', methods: ['DELETE'])]
                        public function deleteMelee(int $id, EntityManagerInterface $entityManager, MeleeWeaponsRepository $repository): JsonResponse
                        {
                        $weapon = $repository->find($id);

                        if (!$weapon) {
                                return new JsonResponse(['error' => 'Weapon not found'], 404);
                        }

                        $entityManager->remove($weapon);
                        $entityManager->flush();

                        return new JsonResponse(['message' => 'Weapon deleted successfully'], 200);
                        }

                        #[Route('/api/faction', name: 'api_faction_list', methods: ['GET'])]
                        public function listFactions(FactionRepository $factionRepository): Response
                        {
                                $factions = $factionRepository->findAll();
                
                                $data = [];
                                foreach ($factions as $faction) {
                                $data[] = [
                                        'id' => $faction->getId(),
                                        'name' => $faction->getName(),
                                        'description' => $faction->getDescription(),
                                ];
                        }
                        return $this->json($data, Response::HTTP_OK);

                }

    
        #[Route('/api/detachment', name: 'api_detachment_list', methods: ['GET'])]
        public function listDetachment(DetachmentsRepository $detachmentRepository): Response
        {
                $detachments = $detachmentRepository->findAll();
    
                $data = [];
                foreach ($detachments as $detachment) {
                $stratagems = $detachment->getStratagems();
                $optimisation = $detachment->getOptimisations();
                        $data[] = [
                                'id' => $detachment->getId(),
                                'name' => $detachment->getName(),
                                'description' => $detachment->getDescription() ?? '',
                                'stratagems' => $detachment->getStratagems(),
                                'optimisations' => $detachment->getOptimisations()
                        ];
                }

                return $this->json($data, Response::HTTP_OK);
        }

        
        #[Route('/api/my-active-list', methods: ['GET'])]
        #[IsGranted('ROLE_USER')]
        public function checkActiveList(ListArmyRepository $listArmyRepository): Response {
        $user = $this->getUser();
        
        $userList = $listArmyRepository->findOneBy(['user' => $user]);

        if (!$userList) {
                return $this->json(['error' => 'No list found'], Response::HTTP_NOT_FOUND);
        }

        return $this->json(['status' => 'ok'], Response::HTTP_OK);
        }



        #[Route('/api/weapon-stats', methods: ['GET'])]
        #[IsGranted('ROLE_USER')]
        public function weaponStatList(WeaponStatRepository $weaponStatRepository): Response {
        
                $stats = $weaponStatRepository->findAll();
        
                $data = [];
                foreach ($stats as $stat) {
                $data[] = [
                'id' => $stat->getId(),
                'name' => $stat->getName(),
                'description' => $stat->getDescription() ?? '',
                ];
        }

                if (empty($data)) {
                return $this->json(['error' => 'No stat found'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($data, Response::HTTP_OK);
        }


        #[Route('/api/ranged_weapons', name: 'api_ranged_weapons_list', methods: ['GET'])]
        public function listRangedWeapons(RangedWeaponsRepository $rangedWeaponsRepository): Response
        {
                $weapons = $rangedWeaponsRepository->findAll();
                $data = [];
                
                foreach ($weapons as $weapon) {
                        $data[] = [
                        'id' => $weapon->getId(),
                        'name' => $weapon->getName(),
                        ];
                }

                return $this->json($data, Response::HTTP_OK);
        }

        #[Route('/api/melee_weapons', name: 'api_melee_weapons_list', methods: ['GET'])]
        public function listMeleeWeapons(MeleeWeaponsRepository $meleeWeaponsRepository): Response
        {
                $weapons = $meleeWeaponsRepository->findAll();
                $data = [];
                
                foreach ($weapons as $weapon) {
                        $data[] = [
                        'id' => $weapon->getId(),
                        'name' => $weapon->getName(),
                        ];
                }

                return $this->json($data, Response::HTTP_OK);
        }
        


    #[Route('/api/csrf-token', name: 'api_csrf_token', methods: ['GET'])]
    public function getToken(CsrfTokenManagerInterface $csrfTokenManager): JsonResponse
    {
        $submittedToken = $request->headers->get('X-CSRF-TOKEN');

        if (!$csrfTokenManager->isTokenValid(new CsrfToken('delete_unit', $submittedToken))) {
        return new JsonResponse(['error' => 'Invalid CSRF token'], 403);
    }

        $token = $csrfTokenManager->getToken('delete_unit');

        return new JsonResponse(['token' => $token->getValue()]);
    }
}
