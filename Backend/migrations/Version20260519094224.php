<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260519094224 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE list_army ADD CONSTRAINT FK_49EFF0DFA76ED395 FOREIGN KEY (user_id) REFERENCES user (id_user)');
        $this->addSql('CREATE INDEX IDX_49EFF0DFA76ED395 ON list_army (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE list_army DROP FOREIGN KEY FK_49EFF0DFA76ED395');
        $this->addSql('DROP INDEX IDX_49EFF0DFA76ED395 ON list_army');
    }
}
