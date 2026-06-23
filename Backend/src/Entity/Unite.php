<?php

namespace App\Entity;

use App\Repository\UniteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UniteRepository::class)]
class Unite
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    #[Groups(['unit:read'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    /**
     * @var Collection<int, Faction>
     */
    #[Groups(['unit:read'])]
    #[ORM\ManyToMany(targetEntity: Faction::class, inversedBy: 'unites')]
    private Collection $faction;

    #[Groups(['unit:read'])]
    #[ORM\Column(length: 255)]
    private ?string $number = null;

    #[Groups(['unit:read'])]
    #[ORM\Column(length: 255)]
    private ?string $mouvement = null;

    #[Groups(['unit:read'])]
    #[ORM\Column(length: 255)]
    private ?string $stamina = null;

    #[Groups(['unit:read'])]
    #[ORM\Column(length: 255)]
    private ?string $save = null;

    #[Groups(['unit:read'])]
    #[ORM\Column(length: 255)]
    private ?string $pv = null;

    #[Groups(['unit:read'])]
    #[ORM\Column(length: 255)]
    private ?string $commandement = null;

    #[Groups(['unit:read'])]
    #[ORM\Column(length: 255)]
    private ?string $co = null;

    /**
     * @var Collection<int, RangedWeapons>
     */
    #[Groups(['unit:read'])]
    #[ORM\ManyToMany(targetEntity: RangedWeapons::class, inversedBy: 'unites')]
    private Collection $ranged_weapons;

    /**
     * @var Collection<int, MeleeWeapons>
     */
    #[Groups(['unit:read'])]
    #[ORM\ManyToMany(targetEntity: MeleeWeapons::class, inversedBy: 'unites')]
    private Collection $melee_weapons;

    #[Groups(['unit:read'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $aptitude = null;

    /**
     * @var Collection<int, Section>
     */
    #[ORM\ManyToMany(targetEntity: Section::class, inversedBy: 'unites')]
    #[Groups(['unit:read'])]
    private Collection $section;






    public function __construct()
    {
        $this->faction = new ArrayCollection();
        $this->ranged_weapons = new ArrayCollection();
        $this->melee_weapons = new ArrayCollection();
        $this->section = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, Faction>
     */
    public function getFaction(): Collection
    {
        return $this->faction;
    }

    public function addFaction(Faction $faction): static
    {
        if (!$this->faction->contains($faction)) {
            $this->faction->add($faction);
        }

        return $this;
    }

    public function removeFaction(Faction $faction): static
    {
        $this->faction->removeElement($faction);

        return $this;
    }

    public function getNumber(): ?string
    {
        return $this->number;
    }

    public function setNumber(string $number): static
    {
        $this->number = $number;

        return $this;
    }

    public function getMouvement(): ?string
    {
        return $this->mouvement;
    }

    public function setMouvement(string $mouvement): static
    {
        $this->mouvement = $mouvement;

        return $this;
    }

    public function getStamina(): ?string
    {
        return $this->stamina;
    }

    public function setStamina(string $stamina): static
    {
        $this->stamina = $stamina;

        return $this;
    }

    public function getSave(): ?string
    {
        return $this->save;
    }

    public function setSave(string $save): static
    {
        $this->save = $save;

        return $this;
    }

    public function getPv(): ?string
    {
        return $this->pv;
    }

    public function setPv(string $pv): static
    {
        $this->pv = $pv;

        return $this;
    }

    public function getCommandement(): ?string
    {
        return $this->commandement;
    }

    public function setCommandement(string $commandement): static
    {
        $this->commandement = $commandement;

        return $this;
    }

    public function getCo(): ?string
    {
        return $this->co;
    }

    public function setCo(string $co): static
    {
        $this->co = $co;

        return $this;
    }

    /**
     * @return Collection<int, RangedWeapons>
     */
    public function getRangedWeapons(): Collection
    {
        return $this->ranged_weapons;
    }

    public function addRangedWeapon(RangedWeapons $rangedWeapon): static
    {
        if (!$this->ranged_weapons->contains($rangedWeapon)) {
            $this->ranged_weapons->add($rangedWeapon);
        }

        return $this;
    }

    public function removeRangedWeapon(RangedWeapons $rangedWeapon): static
    {
        $this->ranged_weapons->removeElement($rangedWeapon);

        return $this;
    }

    /**
     * @return Collection<int, MeleeWeapons>
     */
    public function getMeleeWeapons(): Collection
    {
        return $this->melee_weapons;
    }

    public function addMeleeWeapon(MeleeWeapons $meleeWeapon): static
    {
        if (!$this->melee_weapons->contains($meleeWeapon)) {
            $this->melee_weapons->add($meleeWeapon);
        }

        return $this;
    }

    public function removeMeleeWeapon(MeleeWeapons $meleeWeapon): static
    {
        $this->melee_weapons->removeElement($meleeWeapon);

        return $this;
    }

    public function getAptitude(): ?string
    {
        return $this->aptitude;
    }

    public function setAptitude(?string $aptitude): static
    {
        $this->aptitude = $aptitude;

        return $this;
    }

    /**
     * @return Collection<int, Section>
     */
    public function getSection(): Collection
    {
        return $this->section;
    }

    public function addSection(Section $section): static
    {
        if (!$this->section->contains($section)) {
            $this->section->add($section);
        }

        return $this;
    }

    public function removeSection(Section $section): static
    {
        $this->section->removeElement($section);

        return $this;
    }


  


}
