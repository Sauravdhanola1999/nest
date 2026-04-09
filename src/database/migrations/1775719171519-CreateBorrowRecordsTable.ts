import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateBorrowRecordsTable1775719171519 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'borrow_records',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                    },
                    {
                        name: 'book_id',
                        type: 'int',
                    },
                    {
                        name: 'borrow_date',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'due_date',
                        type: 'timestamp',
                    },
                    {
                        name: 'return_date',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: ['borrowed', 'returned', 'overdue'],
                        default: `'borrowed'`,
                    },
                ],
            }),
            true,
        );

        // FK → users
        await queryRunner.createForeignKey(
            'borrow_records',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        // FK → books
        await queryRunner.createForeignKey(
            'borrow_records',
            new TableForeignKey({
                columnNames: ['book_id'],
                referencedTableName: 'books',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('borrow_records');

        if (table) {
            for (const fk of table.foreignKeys) {
                await queryRunner.dropForeignKey('borrow_records', fk);
            }
        }

        await queryRunner.dropTable('borrow_records');
    }

}
