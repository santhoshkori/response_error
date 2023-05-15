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
  let { status, priority, search_q = "", category } = request.query;
  //console.log(has_priority_and_has_status(request.query));
  let todo_query = "";
  switch (true) {
    case has_status(request.query):
      todo_query = `
      SELECT
      *
      FROM
      todo
      WHERE
      status="${status}" AND todo LIKE "%${search_q}%" 
      ;`;
      break;
    case has_prority(request.query):
      todo_query = `
      SELECT
      *
      FROM
      todo
      WHERE 
      priority="${priority}" AND todo LIKE "%${search_q}%"

      ;`;
      break;
    case has_priority_and_has_status(request.query):
      todo_query = `
      SELECT
      *
      FROM
      todo
      WHERE
      priority='${priority}' AND status='${status}'
      ;`;
      break;

    default:
      todo_query = `
      SELECT
      *
      FROM
      todo
      WHERE
      todo LIKE '%${search_q}%'
      ;`;
  }
  const get_data = await todo_DB.all(todo_query);
  console.log(has_priority_and_has_status(request.query));
  console.log(todo_query, request.query);
  console.log(get_data);
});
module.exports = app;
