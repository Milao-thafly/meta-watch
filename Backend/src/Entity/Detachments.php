<?php

namespace App\Entity;

use App\Repository\DetachmentsRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: DetachmentsRepository::class)]
class Detachments
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['list_info'])]
    private ?string $name = null;

    #[ORM\Column(type: 'text')]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'detachments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Faction $faction = null;

    #[ORM\Column]
    private array $stratagems = [];

    #[ORM\Column]
    private array $optimisations = [];

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

    public function getFaction(): ?Faction
    {
        return $this->faction;
    }

    public function setFaction(?Faction $faction): static
    {
        $this->faction = $faction;

        return $this;
    }

    public function getStratagems(): array
    {
        return $this->stratagems;
    }

    public function setStratagems(array $stratagems): static
    {
        $this->stratagems = $stratagems;

        return $this;
    }

    public function getOptimisations(): array
    {
        return $this->optimisations;
    }

    public function setOptimisations(array $optimisations): static
    {
        $this->optimisations = $optimisations;

        return $this;
    }
}
