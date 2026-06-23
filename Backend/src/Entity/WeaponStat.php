<?php

namespace App\Entity;

use App\Repository\WeaponStatRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: WeaponStatRepository::class)]
class WeaponStat
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    /**
     * @var Collection<int, MeleeWeapons>
     */
    #[ORM\JoinTable(name: 'weapon_stat_melee_weapons')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    #[ORM\ManyToMany(targetEntity: MeleeWeapons::class, inversedBy: 'weaponStats')]
    private Collection $melee_weapons;

    /**
     * @var Collection<int, RangedWeapons>
     */
    #[ORM\JoinTable(name: 'weapon_stat_ranged_weapons')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    #[ORM\ManyToMany(targetEntity: RangedWeapons::class, inversedBy: 'weaponStats')]
    private Collection $ranged_weapons;

    public function __construct()
    {
        $this->melee_weapons = new ArrayCollection();
        $this->ranged_weapons = new ArrayCollection();
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, MeleeWeapons>
     */
    public function getMeleeWeapons(): Collection
    {
        return $this->melee_weapons;
    }

    public function addMeleeWeapon(MeleeWeapons $melee_weapons): static
    {
        if (!$this->melee_weapons->contains($melee_weapons)) {
            $this->melee_weapons->add($melee_weapons);
        }

        return $this;
    }

    public function removeMeleeWeapon(MeleeWeapons $melee_weapons): static
    {
        if ($this->melee_weapons->removeElement($melee_weapons)) {
            $melee_weapons->removeMeleeWeapon($this);
        }

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





}
