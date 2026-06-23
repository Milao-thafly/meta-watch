<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260524210531 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE unite (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, number VARCHAR(255) NOT NULL, mouvement VARCHAR(255) NOT NULL, stamina VARCHAR(255) NOT NULL, save VARCHAR(255) NOT NULL, pv VARCHAR(255) NOT NULL, commandement VARCHAR(255) NOT NULL, co VARCHAR(255) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE unite_faction (unite_id INT NOT NULL, faction_id INT NOT NULL, INDEX IDX_396DCA33EC4A74AB (unite_id), INDEX IDX_396DCA334448F8DA (faction_id), PRIMARY KEY (unite_id, faction_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE unite_ranged_weapons (unite_id INT NOT NULL, ranged_weapons_id INT NOT NULL, INDEX IDX_90DC00C8EC4A74AB (unite_id), INDEX IDX_90DC00C8B6BF914F (ranged_weapons_id), PRIMARY KEY (unite_id, ranged_weapons_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE unite_melee_weapons (unite_id INT NOT NULL, melee_weapons_id INT NOT NULL, INDEX IDX_BA36BC99EC4A74AB (unite_id), INDEX IDX_BA36BC998E2877A7 (melee_weapons_id), PRIMARY KEY (unite_id, melee_weapons_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE unite_faction ADD CONSTRAINT FK_396DCA33EC4A74AB FOREIGN KEY (unite_id) REFERENCES unite (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE unite_faction ADD CONSTRAINT FK_396DCA334448F8DA FOREIGN KEY (faction_id) REFERENCES faction (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE unite_ranged_weapons ADD CONSTRAINT FK_90DC00C8EC4A74AB FOREIGN KEY (unite_id) REFERENCES unite (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE unite_ranged_weapons ADD CONSTRAINT FK_90DC00C8B6BF914F FOREIGN KEY (ranged_weapons_id) REFERENCES ranged_weapons (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE unite_melee_weapons ADD CONSTRAINT FK_BA36BC99EC4A74AB FOREIGN KEY (unite_id) REFERENCES unite (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE unite_melee_weapons ADD CONSTRAINT FK_BA36BC998E2877A7 FOREIGN KEY (melee_weapons_id) REFERENCES melee_weapons (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE melee_weapons_weapon_stat DROP FOREIGN KEY `FK_1804CBD48E2877A7`');
        $this->addSql('ALTER TABLE melee_weapons_weapon_stat DROP FOREIGN KEY `FK_1804CBD4AC676F4F`');
        $this->addSql('ALTER TABLE ranged_weapons_weapon_stat DROP FOREIGN KEY `FK_1E1309B3AC676F4F`');
        $this->addSql('ALTER TABLE ranged_weapons_weapon_stat DROP FOREIGN KEY `FK_1E1309B3B6BF914F`');
        $this->addSql('DROP TABLE melee_weapons_weapon_stat');
        $this->addSql('DROP TABLE ranged_weapons_weapon_stat');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE melee_weapons_weapon_stat (melee_weapons_id INT NOT NULL, weapon_stat_id INT NOT NULL, INDEX IDX_1804CBD48E2877A7 (melee_weapons_id), INDEX IDX_1804CBD4AC676F4F (weapon_stat_id), PRIMARY KEY (melee_weapons_id, weapon_stat_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE ranged_weapons_weapon_stat (ranged_weapons_id INT NOT NULL, weapon_stat_id INT NOT NULL, INDEX IDX_1E1309B3AC676F4F (weapon_stat_id), INDEX IDX_1E1309B3B6BF914F (ranged_weapons_id), PRIMARY KEY (ranged_weapons_id, weapon_stat_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE melee_weapons_weapon_stat ADD CONSTRAINT `FK_1804CBD48E2877A7` FOREIGN KEY (melee_weapons_id) REFERENCES melee_weapons (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE melee_weapons_weapon_stat ADD CONSTRAINT `FK_1804CBD4AC676F4F` FOREIGN KEY (weapon_stat_id) REFERENCES weapon_stat (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE ranged_weapons_weapon_stat ADD CONSTRAINT `FK_1E1309B3AC676F4F` FOREIGN KEY (weapon_stat_id) REFERENCES weapon_stat (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE ranged_weapons_weapon_stat ADD CONSTRAINT `FK_1E1309B3B6BF914F` FOREIGN KEY (ranged_weapons_id) REFERENCES ranged_weapons (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE unite_faction DROP FOREIGN KEY FK_396DCA33EC4A74AB');
        $this->addSql('ALTER TABLE unite_faction DROP FOREIGN KEY FK_396DCA334448F8DA');
        $this->addSql('ALTER TABLE unite_ranged_weapons DROP FOREIGN KEY FK_90DC00C8EC4A74AB');
        $this->addSql('ALTER TABLE unite_ranged_weapons DROP FOREIGN KEY FK_90DC00C8B6BF914F');
        $this->addSql('ALTER TABLE unite_melee_weapons DROP FOREIGN KEY FK_BA36BC99EC4A74AB');
        $this->addSql('ALTER TABLE unite_melee_weapons DROP FOREIGN KEY FK_BA36BC998E2877A7');
        $this->addSql('DROP TABLE unite');
        $this->addSql('DROP TABLE unite_faction');
        $this->addSql('DROP TABLE unite_ranged_weapons');
        $this->addSql('DROP TABLE unite_melee_weapons');
    }
}
