import Knex from "knex";

export async function seed(knex: Knex) {
  knex("items").insert([
    { title: "Lâmpadas", image: "lampadas.svg" },
    { title: "Pilhas e Baterias", image: "baterias.svg" },
    { title: "Papéis e Papelão", image: "papeis-papelao.svg" },
    { title: "Resíduos Eletrônicos", image: "eletronicos.svg" },
    { title: "Resíduos Orgânicos", image: "lampadas.svg" },
    { title: "Lâmpadas", image: "lampadas.svg" },
    { title: "Lâmpadas", image: "lampadas.svg" },
  ]);
}
