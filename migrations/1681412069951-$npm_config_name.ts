import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1681412069951 implements MigrationInterface {
    name = ' $npmConfigName1681412069951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile" ("profile_id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "second_name" character varying NOT NULL, "surname" character varying NOT NULL, "phone_number" character varying NOT NULL, "bio" character varying NOT NULL, "userUserId" integer, CONSTRAINT "REL_c645941c0a12a9e9934026e018" UNIQUE ("userUserId"), CONSTRAINT "PK_b0465dda30314a8786db3354a65" PRIMARY KEY ("profile_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("user_id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "profileProfileId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_6be5c052a2d1fb1ab60a40cf54" UNIQUE ("profileProfileId"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("role_id" SERIAL NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_367aad98203bd8afaed0d704093" UNIQUE ("role"), CONSTRAINT "PK_df46160e6aa79943b83c81e496e" PRIMARY KEY ("role_id"))`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_c645941c0a12a9e9934026e0189" FOREIGN KEY ("userUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6be5c052a2d1fb1ab60a40cf54b" FOREIGN KEY ("profileProfileId") REFERENCES "profile"("profile_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6be5c052a2d1fb1ab60a40cf54b"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_c645941c0a12a9e9934026e0189"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "profile"`);
    }

}
