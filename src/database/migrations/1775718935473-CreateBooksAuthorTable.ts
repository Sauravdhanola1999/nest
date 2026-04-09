import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateBooksAuthorTable1775718935473 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'book_authors',
        columns: [
          {
            name: 'book_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'author_id',
            type: 'int',
            isPrimary: true,
          },
        ],
      }),
      true,
    );

    // FK → books
    await queryRunner.createForeignKey(
      'book_authors',
      new TableForeignKey({
        columnNames: ['book_id'],
        referencedTableName: 'books',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    // FK → authors
    await queryRunner.createForeignKey(
      'book_authors',
      new TableForeignKey({
        columnNames: ['author_id'],
        referencedTableName: 'authors',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('book_authors');

    if (table) {
      for (const fk of table.foreignKeys) {
        await queryRunner.dropForeignKey('book_authors', fk);
      }
    }

    await queryRunner.dropTable('book_authors');
  }
}
