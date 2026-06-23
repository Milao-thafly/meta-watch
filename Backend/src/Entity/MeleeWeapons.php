<?php

namespace App\Entity;

use App\Repository\MeleeWeaponsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MeleeWeaponsRepository::class)]
class MeleeWeapons
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 7)]
    private ?string $length = null;

    #[ORM\Column]
    private ?int $Attack = null;

    #[ORM\Column(length: 5)]
    private ?string $precision_ = null;

    #[ORM\Column(length: 5)]
    private ?string $strength = null;

    #[ORM\Column(length: 5)]
    private ?string $penetration = null;

    #[ORM\Column(length: 5)]
    private ?string $damage = null;

    /**
     * @var Collection<int, Unite>
     */
    #[ORM\ManyToMany(targetEntity: Unite::class, mappedBy: 'melee_weapons')]
    private Collection $unites;

    /**
     * @var Collection<int, WeaponStat>
     */
    #[ORM\ManyToMany(targetEntity: WeaponStat::class, mappedBy: 'melee_weapons')]
    private Collection $weaponStats;

    public function __construct()
    {
        $this->unites = new ArrayCollection();
        $this->weaponStats = new ArrayCollection();
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

    public function getLength(): ?string
    {
        return $this->length;
    }

    public function setLength(string $length): static
    {
        $this->length = $length;

        return $this;
    }

    public function getAttack(): ?int
    {
        return $this->Attack;
    }

    public function setAttack(int $Attack): static
    {
        $this->Attack = $Attack;

        return $this;
    }

    public function getPrecision(): ?string
    {
        return $this->precision_;
    }

    public function setPrecision(string $precision_): static
    {
        $this->precision_ = $precision_;

        return $this;
    }

    public function getStrength(): ?string
    {
        return $this->strength;
    }

    public function setStrength(string $strength): static
    {
        $this->strength = $strength;

        return $this;
    }

    public function getPenetration(): ?string
    {
        return $this->penetration;
    }

    public function setPenetration(string $penetration): static
    {
        $this->penetration = $penetration;

        return $this;
    }

    public function getDamage(): ?string
    {
        return $this->damage;
    }

    public function setDamage(string $damage): static
    {
        $this->damage = $damage;

        return $this;
    }

    /**
     * @return Collection<int, Unite>
     */
    public function getUnites(): Collection
    {
        return $this->unites;
    }

    public function addUnite(Unite $unite): static
    {
        if (!$this->unites->contains($unite)) {
            $this->unites->add($unite);
            $unite->addMeleeWeapon($this);
        }

        return $this;
    }

    public function removeUnite(Unite $unite): static
    {
        if ($this->unites->removeElement($unite)) {
            $unite->removeMeleeWeapon($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, WeaponStat>
     */
    public function getWeaponStats(): Collection
    {
        return $this->weaponStats;
    }

    public function addWeaponStat(WeaponStat $weaponStat): static
    {
        if (!$this->weaponStats->contains($weaponStat)) {
            $this->weaponStats->add($weaponStat);
            $weaponStat->addMeleeWeapon($this);
        }

        return $this;
    }

    public function removeWeaponStat(WeaponStat $weaponStat): static
    {
        if ($this->weaponStats->removeElement($weaponStat)) {
            $weaponStat->removeMeleeWeapon($this);
        }

        return $this;
    }


   

}
