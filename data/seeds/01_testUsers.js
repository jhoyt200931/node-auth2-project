
exports.seed = function(knex) {
  // Deletes ALL existing entries
  const users = [
    {
      username: "groot",
      password: "Iamgroot!",
      department: 'Forestry'
    },
    {
      username: "admin",
      password: "keepitsecret,keepitsafe.",
      department: 'Management'
    },
    {
      username: "me",
      password: "changethepass",
      department: 'Development'
    },
    {
      username: "nobody",
      password: "hasnorole",
      department: 'Forestry'
    },
    {
      username: "notme",
      password: "hasarole",
      department: 'Management'
    },
  ];

  return knex('users').insert(users);
};
