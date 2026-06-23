<?php

namespace App\Entity;

use App\Repository\FactionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FactionRepository::class)]
class Faction
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(['list_info'])]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    /**
     * @var Collection<int, Detachments>
     */
    #[ORM\OneToMany(targetEntity: Detachments::class, mappedBy: 'faction')]
    private Collection $detachments;

    /**
     * @var Collection<int, Unite>
     */
    #[ORM\ManyToMany(targetEntity: Unite::class, mappedBy: 'faction')]
    private Collection $unites;

    /**
     * @var Collection<int, ListArmy>
     */
    #[ORM\OneToMany(targetEntity: ListArmy::class, mappedBy: 'faction')]
    private Collection $listArmies;




    public function __construct()
    {
        $this->detachments = new ArrayCollection();
        $this->unites = new ArrayCollection();
        $this->listArmies = new ArrayCollection();
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
     * @return Collection<int, Detachments>
     */
    public function getDetachments(): Collection
    {
        return $this->detachments;
    }

    public function addDetachment(Detachments $detachment): static
    {
        if (!$this->detachments->contains($detachment)) {
            $this->detachments->add($detachment);
            $detachment->setFaction($this);
        }

        return $this;
    }

    public function removeDetachment(Detachments $detachment): static
    {
        if ($this->detachments->removeElement($detachment)) {
            // set the owning side to null (unless already changed)
            if ($detachment->getFaction() === $this) {
                $detachment->setFaction(null);
            }
        }

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
            $unite->addFaction($this);
        }

        return $this;
    }

    public function removeUnite(Unite $unite): static
    {
        if ($this->unites->removeElement($unite)) {
            $unite->removeFaction($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, ListArmy>
     */
    public function getListArmies(): Collection
    {
        return $this->listArmies;
    }

    public function addListArmy(ListArmy $listArmy): static
    {
        if (!$this->listArmies->contains($listArmy)) {
            $this->listArmies->add($listArmy);
            $listArmy->setFaction($this);
        }

        return $this;
    }

    public function removeListArmy(ListArmy $listArmy): static
    {
        if ($this->listArmies->removeElement($listArmy)) {
            // set the owning side to null (unless already changed)
            if ($listArmy->getFaction() === $this) {
                $listArmy->setFaction(null);
            }
        }

        return $this;
    }



}
