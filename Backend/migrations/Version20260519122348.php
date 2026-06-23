<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260519122348 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE list_army ADD detachment_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE list_army ADD CONSTRAINT FK_49EFF0DF8EF6F40B FOREIGN KEY (detachment_id) REFERENCES detachments (id)');
        $this->addSql('CREATE INDEX IDX_49EFF0DF8EF6F40B ON list_army (detachment_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE list_army DROP FOREIGN KEY FK_49EFF0DF8EF6F40B');
        $this->addSql('DROP INDEX IDX_49EFF0DF8EF6F40B ON list_army');
        $this->addSql('ALTER TABLE list_army DROP detachment_id');
    }
}
