exports.up = knex => knex.schema.createTable("notes", table => {
  table.increments("id");
  table.text("title");
  table.text("descriptions");
  table.integer("user_id").references("id").inTable("users");// Estamos dizendo aqui que este id faz referencia ao id dentro da tabela users

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
}) // Aqui 'e o processo de criar a tabela 
  


exports.down = knex => knex.schema.dropTable("notes");
