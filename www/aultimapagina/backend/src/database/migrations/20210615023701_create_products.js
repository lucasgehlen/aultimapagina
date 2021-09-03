
exports.up = function(knex) {
    knex.schema.createTable('products', function (table) {
        table.increments();
        table.string('name');
        table.string('description');
        table.timestamps();
    })
};

exports.down = function(knex) {
    knex.schema.dropTable('products')
};
