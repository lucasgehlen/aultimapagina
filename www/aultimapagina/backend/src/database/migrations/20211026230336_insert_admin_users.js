const crypto = require('crypto');
const {format} = require("date-fns");
const md5 = require("md5");
const {User} = require("../../models/User");

exports.up = async (knex) => {
    const timestamp = format(new Date(), "yyyy-MM-dd h:mm:ss");

    let lucas = new User(crypto.randomBytes(4).toString('HEX'),
        "Lucas Alves Coutinho Gehlen",
        "lucas@gehlen.dev",
        "(41) 9 9242-0186",
        md5("Teste@123"),
        "ADMIN",
        timestamp,
        timestamp);

    let victor = new User(crypto.randomBytes(4).toString('HEX'),
        "Victor Alfons Steuck",
        "victor.steuck@gmail.com",
        "(41) 9 8500-5722",
        md5("Teste@123"),
        "ADMIN",
        timestamp,
        timestamp);

    let gabriel = new User(crypto.randomBytes(4).toString('HEX'),
        "Gabriel Coutinho Gehlen",
        "gabrielcoutinho5@hotmail.com",
        "(41) 9 9202-0247",
        md5("Teste@123"),
        "ADMIN",
        timestamp,
        timestamp);

    return knex('users')
        .insert([
            lucas, victor, gabriel
        ]);

};

exports.down = async (knex) => {
    return knex('users').where('role', 'ADMIN').delete()
};