import postgres from "postgres";

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sqlQuery = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
});

export const InitDB = async (excercises: any[]) => {
  // -- Create a database (if it doesn't exist)
  //   const db = await sqlQuery`CREATE DATABASE IF NOT EXISTS tabata`;

  // -- Create the 'exercises' table
  const excercisesTable = await sqlQuery`CREATE TABLE IF NOT EXISTS exercises (
          id SERIAL PRIMARY KEY,
          excercise VARCHAR(255) NOT NULL unique,
          workGroup VARCHAR(255) NOT NULL
  )`;

  const newOnes: any = [];
  excercises.forEach((group) => {
    group.excercises.forEach((ex: String) => {
      newOnes.push({
        excercise: ex,
        workgroup: group.workGroup,
      });
    });
  });

  if (newOnes) {
    const populateExercises = await sqlQuery`insert into exercises ${sqlQuery(newOnes, "excercise", "workgroup")}`;
  }
};

export async function insertExercise({ excercise, workgroup }: { excercise: string; workgroup: string }) {
  const users = await sqlQuery`
      insert into exercises
        (excercise, workgroup)
      values
        (${excercise}, ${workgroup})
      returning excercise, workgroup
    `;
  console.log(users);

  return users;
}

export async function getExcercises() {
  const response = await sqlQuery`SELECT * FROM exercises`;
  //   console.log(response);
  return response;
}
