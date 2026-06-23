<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260527114843 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE list_army ADD faction_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE list_army ADD CONSTRAINT FK_49EFF0DF4448F8DA FOREIGN KEY (faction_id) REFERENCES faction (id)');
        $this->addSql('CREATE INDEX IDX_49EFF0DF4448F8DA ON list_army (faction_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE list_army DROP FOREIGN KEY FK_49EFF0DF4448F8DA');
        $this->addSql('DROP INDEX IDX_49EFF0DF4448F8DA ON list_army');
        $this->addSql('ALTER TABLE list_army DROP faction_id');
    }
}
