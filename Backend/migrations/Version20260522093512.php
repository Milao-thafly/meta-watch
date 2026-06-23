<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260522093512 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE melee_weapons_weapon_stat (melee_weapons_id INT NOT NULL, weapon_stat_id INT NOT NULL, INDEX IDX_1804CBD48E2877A7 (melee_weapons_id), INDEX IDX_1804CBD4AC676F4F (weapon_stat_id), PRIMARY KEY (melee_weapons_id, weapon_stat_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE ranged_weapons_weapon_stat (ranged_weapons_id INT NOT NULL, weapon_stat_id INT NOT NULL, INDEX IDX_1E1309B3B6BF914F (ranged_weapons_id), INDEX IDX_1E1309B3AC676F4F (weapon_stat_id), PRIMARY KEY (ranged_weapons_id, weapon_stat_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE melee_weapons_weapon_stat ADD CONSTRAINT FK_1804CBD48E2877A7 FOREIGN KEY (melee_weapons_id) REFERENCES melee_weapons (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE melee_weapons_weapon_stat ADD CONSTRAINT FK_1804CBD4AC676F4F FOREIGN KEY (weapon_stat_id) REFERENCES weapon_stat (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE ranged_weapons_weapon_stat ADD CONSTRAINT FK_1E1309B3B6BF914F FOREIGN KEY (ranged_weapons_id) REFERENCES ranged_weapons (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE ranged_weapons_weapon_stat ADD CONSTRAINT FK_1E1309B3AC676F4F FOREIGN KEY (weapon_stat_id) REFERENCES weapon_stat (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE melee_weapons_weapon_stat DROP FOREIGN KEY FK_1804CBD48E2877A7');
        $this->addSql('ALTER TABLE melee_weapons_weapon_stat DROP FOREIGN KEY FK_1804CBD4AC676F4F');
        $this->addSql('ALTER TABLE ranged_weapons_weapon_stat DROP FOREIGN KEY FK_1E1309B3B6BF914F');
        $this->addSql('ALTER TABLE ranged_weapons_weapon_stat DROP FOREIGN KEY FK_1E1309B3AC676F4F');
        $this->addSql('DROP TABLE melee_weapons_weapon_stat');
        $this->addSql('DROP TABLE ranged_weapons_weapon_stat');
    }
}
