import express from "express";

const app = express();
//middle ware to print the post request body
app.use(express.json());

const TODOS = [
  {
    id: 1,
    toIteam: "study",
    priority: "high",
    emoji: "🎁",
    isDone: false,
    createdDate: new Date().toString(),
  },
  {
    id: 2,
    toIteam: "play",
    priority: "low",
    emoji: "🎉",
    isDone: false,
    createdDate: new Date().toString(),
  },
  {
    id: 3,
    toIteam: "work",
    priority: "high",
    emoji: "❤️‍🔥",
    isDone: false,
    createdDate: new Date().toString(),
  },
  {
    id: 4,
    toIteam: "sleep",
    priority: "low",
    emoji: "😴",
    isDone: false,
    createdDate: new Date().toString(),
  },
  {
    id: 5,
    toIteam: "eat",
    priority: "high",
    emoji: "🍔",
    isDone: false,
    createdDate: new Date().toString(),
  },
];
app.get("/todos", (req, res) => {
  res.json({
    success: true,
    data: TODOS,
    message: "data is retiurve successfull",
  });
  console.log(TODOS);
});

// for creating the resource or getting the data
app.post("/addTodos", (req, res) => {
  //request
  //console.log("Request Body",req.body);
  const { toIteam, priority, emoji } = req.body;

  const id = TODOS[TODOS.length - 1].id + 1; // for the next object the id is last lement+1

  const todoObj = {
    id: id,
    toIteam: toIteam,
    priority: priority,
    emoji: emoji,
    isDone: false,
    createdDate: new Date().toString(),
  };
  TODOS.push(todoObj);
  console.log(todoObj);

  //respnase
  res.json({
    success: true,
    data: todoObj,
    message: "to iteam added successfullt",
  });
});

// searching api using a query parameter
app.get("/todos/search", (req, res) => {
  console.log(req.query);
  const { item, priority } = req.query;

  const filterItem = TODOS.filter((itemOBJ) => {
    if (itemOBJ.toIteam.includes(item) && itemOBJ.priority == priority) {
      return true;
    }
    return false;
  });

  res.json({
    success: "true",
    data: filterItem,
    message: "filter data fetch successfully",
  });
});

//to get the specific id = (:) represet the id is dynamic, its call path paramenter
//to read the path parameter we use the req.param that givs gies the parameter,
//  that present in url like that http://localhost:8080/todos/4 output is 4
app.get("/todos/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const todoItem = TODOS.find((item) => {
    if (item.id == id) {
      return item;
    }
  });
  if (todoItem) {
    res.json({
      success: true,
      data: todoItem,
      message: "perticular to do item find",
    });
  } else {
    res.json({
      success: false,
      message: "data not found",
    });
  }
});

//for deleting the specific id from todos
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;

  const index = TODOS.findIndex((item) => item.id == id);
  if (index == -1) {
    res.json({
      success: false,
      message: `${id} not found`,
    });
  } else {
    TODOS.splice(index, 1);
    res.json({
      success: true,
      message: `${id} deleted sucessfully`,
    });
  }
});

//patch = for the partial update of data
//at a time only one field can be updated
app.patch("/todos/:id/status", (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body; // taken from req body to show the status

  const index = TODOS.findIndex((item) => item.id == id);
  if (index == -1) {
    //if id is not found
    res.json({
      success: false,
      message: `${id} not found`,
    });
  } else {
    TODOS[index].isDone = isDone;
    res.json({
      success: true,
      data: TODOS[index],
      message: `${id} updated successfully !`,
    });
  }
});

//put is used to update multiple thing in data
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const index = TODOS.findIndex((item) => item.id == id);

  if (index === -1) {
    res.json({
      success: false,
      message: `${id} not found`,
    });
    return;
  } else {
    const { toIteam, priority, emoji, isDone } = req.body;

    const newObj = {
      id: TODOS[index].id,
      createdDate: TODOS[index].createdDate,
      toIteam,
      priority,
      emoji,
      isDone,
    };

    TODOS[index] = newObj; // replace with updated object

    res.json({
      success: true,
      data: newObj,
      message: `id ${id} data updated successfully`,
    });
  }
});

app.listen(8080, () => {
  console.log("server is running successfully ❤️‍🔥!!");
});
