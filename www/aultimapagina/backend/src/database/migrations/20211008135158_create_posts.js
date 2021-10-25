
exports.up = async (knex) => {
    return knex.schema.createTable('posts', function (table) {
        table.string('id').primary();
        table.string('title').notNullable();
        table.string('writer');
        table.string('text', 50000).notNullable();
        table.timestamps();
    });
};

exports.down = async (knex) => {
    return knex.schema.dropTable('users')
};
