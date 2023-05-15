const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();
const main_path = path.join(__dirname, "todoApplication.db");

let todo_DB = null;
const connect_to_todo_DB = async () => {
  try {
    todo_DB = await open({
      filename: main_path,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server running at port 3000");
    });
  } catch (e) {
    console.log(`${e.message}`);
    process.exit(1);
  }
};
connect_to_todo_DB();

const has_status = (request_query) => {
  return request_query.status !== undefined;
};

const has_prority = (request_query) => {
  return request_query.priority !== undefined;
};

const has_priority_and_has_status = (request_query) => {
  return (
    request_query.priority !== undefined && request_query.status !== undefined
  );
};

const has_category_and_has_status = (request_query) => {
  return (
    request_query.category !== undefined && request_query.status !== undefined
  );
};

const has_category = (request_query) => {
  return request_query.category !== undefined;
};

const has_category_and_has_priority = (request_query) => {
  return (
    request_query.category !== undefined && request_query.category !== undefined
  );
};

app.get("/todos/", async (request, response) => {
  const get_query = `
  SELECT
  *
  FROM 
  todo
  WHERE
  todo="TO DO"
  ;`;
  console.log(get_query);
  const get_todo_det = await todo_DB.all(get_query);
  response.send(get_todo_det);
});
