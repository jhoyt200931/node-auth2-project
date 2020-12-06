const db = require('../data/db-config.js');

module.exports = {
    add, 
    find,
    findBy,
    findById,

}

async function add(user) {
    try {
        const {id} = await db('users').insert(user);
        return {id};
    } catch (err) {
       throw err; 
    }
}

async function find() {
    try {
        const users = await db('users').select('id', 'username', 'department');
        return users
    } catch (err) {
        throw err;
    }
}

async function findById({id}) {
    try {
        const user = await db('users').select('id', 'username', 'department').where({id}).first();
        return user;
    } catch (err) {
        throw err;
    }
}

async function findBy(filter) {
   try {
    const user = await db('users').where(filter).orderBy('id');
    return user;
   } catch (err) {
       throw err;
   }
}