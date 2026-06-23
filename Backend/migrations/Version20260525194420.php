<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260525194420 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE weapon_stat_ranged_weapons (weapon_stat_id INT NOT NULL, ranged_weapons_id INT NOT NULL, INDEX IDX_32A9F0B7AC676F4F (weapon_stat_id), INDEX IDX_32A9F0B7B6BF914F (ranged_weapons_id), PRIMARY KEY (weapon_stat_id, ranged_weapons_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE weapon_stat_ranged_weapons ADD CONSTRAINT FK_32A9F0B7AC676F4F FOREIGN KEY (weapon_stat_id) REFERENCES weapon_stat (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE weapon_stat_ranged_weapons ADD CONSTRAINT FK_32A9F0B7B6BF914F FOREIGN KEY (ranged_weapons_id) REFERENCES ranged_weapons (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE weapon_stat_ranged_weapons DROP FOREIGN KEY FK_32A9F0B7AC676F4F');
        $this->addSql('ALTER TABLE weapon_stat_ranged_weapons DROP FOREIGN KEY FK_32A9F0B7B6BF914F');
        $this->addSql('DROP TABLE weapon_stat_ranged_weapons');
    }
}
