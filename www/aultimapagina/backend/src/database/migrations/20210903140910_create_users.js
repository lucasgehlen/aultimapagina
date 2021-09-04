
exports.up = async (knex) => {
    return knex.schema.createTable('users', function (table) {
        table.string('id').primary();
        table.string('email').unique().notNullable();
        table.string('name').notNullable();
        table.string('password').notNullable();
        table.string('cellphone').notNullable();
        table.string('role').notNullable();
        table.timestamps();
    });
};

exports.down = async (knex) => {
    return knex.schema.dropTable('users')
};
