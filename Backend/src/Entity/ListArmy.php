<?php

namespace App\Entity;

use App\Repository\ListArmyRepository;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: ListArmyRepository::class)]
class ListArmy
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[SerializedName('name')]
    public ?string $name = null;

    #[ORM\Column(length: 5)]
    public ?string $point = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['list_info'])]
    private ?bool $visibility = null;

    #[ORM\Column(length: 260, unique: true, nullable: true)]
    #[Gedmo\Slug(fields: ['name'])]
    private $slug;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    #[Gedmo\Timestampable(on: 'create')]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    #[Gedmo\Timestampable(on: 'update')]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\ManyToOne(inversedBy: 'listArmies')]
    #[Groups(['list_info'])]
    #[ORM\JoinColumn(name: "user_id", referencedColumnName: "id_user", nullable: false)]
    private ?User $user = null;

    #[ORM\ManyToOne]
    
    public ?Detachments $detachment = null;

    #[ORM\ManyToOne(inversedBy: 'listArmies')]
    #[Groups(['list_info'])]
    public ?Faction $faction = null;

    #[Groups(['list_info'])]
    public function getId(): ?int
    {
        return $this->id;
    }
    #[Groups(['list_info'])]
    public function getName(): ?string 
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getPoint(): ?string
    {
        return $this->point;
    }

    public function setPoint(string $point): static
    {
        $this->point = $point;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function isVisibility(): ?bool
    {
        return $this->visibility;
    }

    public function setVisibility(bool $visibility): static
    {
        $this->visibility = $visibility;

        return $this;
    }

    public function getSlug() 
    {
        return $this->slug; 
    }
    #[Groups(['list_info'])]
    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self 
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt):self
    {
        $this->updatedAt = $updatedAt;
        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
    #[Groups(['list_info'])]
    public function getDetachment(): ?Detachments
    {
        return $this->detachment;
    }

    public function setDetachment(?Detachments $detachment): static
    {
        $this->detachment = $detachment;

        return $this;
    }
    #[Groups(['list_info'])]
    public function getFaction(): ?Faction
    {
        return $this->faction;
    }

    public function setFaction(?Faction $faction): static
    {
        $this->faction = $faction;

        return $this;
    }

    
}
