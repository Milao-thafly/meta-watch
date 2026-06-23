<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260527181252 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE unite_section (unite_id INT NOT NULL, section_id INT NOT NULL, INDEX IDX_971A3B4CEC4A74AB (unite_id), INDEX IDX_971A3B4CD823E37A (section_id), PRIMARY KEY (unite_id, section_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE unite_section ADD CONSTRAINT FK_971A3B4CEC4A74AB FOREIGN KEY (unite_id) REFERENCES unite (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE unite_section ADD CONSTRAINT FK_971A3B4CD823E37A FOREIGN KEY (section_id) REFERENCES section (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE unite DROP section');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE unite_section DROP FOREIGN KEY FK_971A3B4CEC4A74AB');
        $this->addSql('ALTER TABLE unite_section DROP FOREIGN KEY FK_971A3B4CD823E37A');
        $this->addSql('DROP TABLE unite_section');
        $this->addSql('ALTER TABLE unite ADD section VARCHAR(50) NOT NULL');
    }
}
