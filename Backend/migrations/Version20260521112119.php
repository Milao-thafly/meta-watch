<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260521112119 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE melee_weapons (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, length VARCHAR(7) NOT NULL, attack INT NOT NULL, precision_ VARCHAR(5) NOT NULL, strength VARCHAR(5) NOT NULL, penetration VARCHAR(5) NOT NULL, damage VARCHAR(5) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE ranged_weapons (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, length VARCHAR(8) NOT NULL, attack INT NOT NULL, precision_ VARCHAR(5) NOT NULL, strength VARCHAR(5) NOT NULL, damage VARCHAR(5) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE weapon_stat (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE melee_weapons');
        $this->addSql('DROP TABLE ranged_weapons');
        $this->addSql('DROP TABLE weapon_stat');
    }
}
