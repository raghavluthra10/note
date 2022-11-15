/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").insert([
    { id: 1, email: "raghav@raghav.com", password: "raghav", name: "raghav" },
    { id: 2, email: "test@test.com", password: "test", name: "test" },
  ]);
  await knex("todo").insert([
    {
      id: 1,
      title: "title 1",
      description: "random task has no description 1",
      completed: false,
    },
    {
      id: 2,
      title: "title 2",
      description: "random task has no description 2",
      completed: true,
    },
  ]);
};
