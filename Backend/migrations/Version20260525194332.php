<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260525194332 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE weapon_stat_melee_weapons (weapon_stat_id INT NOT NULL, melee_weapons_id INT NOT NULL, INDEX IDX_A8B7B1BAAC676F4F (weapon_stat_id), INDEX IDX_A8B7B1BA8E2877A7 (melee_weapons_id), PRIMARY KEY (weapon_stat_id, melee_weapons_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE weapon_stat_melee_weapons ADD CONSTRAINT FK_A8B7B1BAAC676F4F FOREIGN KEY (weapon_stat_id) REFERENCES weapon_stat (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE weapon_stat_melee_weapons ADD CONSTRAINT FK_A8B7B1BA8E2877A7 FOREIGN KEY (melee_weapons_id) REFERENCES melee_weapons (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE weapon_stat_melee_weapons DROP FOREIGN KEY FK_A8B7B1BAAC676F4F');
        $this->addSql('ALTER TABLE weapon_stat_melee_weapons DROP FOREIGN KEY FK_A8B7B1BA8E2877A7');
        $this->addSql('DROP TABLE weapon_stat_melee_weapons');
    }
}
