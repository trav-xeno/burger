const { Router } = require("express");
const db = require("../models");
/*
  "username": "root",
  "password": null,
  "database": "database_production",
  "host": "127.0.0.1",
*/
const router = Router();

db.Burger.sync({ force: true }).then(() => {
  // Now the table in the database corresponds to the model definition
  return db.Burger.bulkCreate([
    {
      burger_name: "kraby Patty Deluxe",
      devoured: false
    },
    {
      burger_name: "kraby Patty with no pickles",
      devoured: true
    },
    {
      burger_name: "kraby Patty with jelly fish jelly",
      devoured: false
    },
    {
      burger_name: "kraby Patty royal with cheese",
      devoured: true
    },
    {
      burger_name: "kraby Patty OG",
      devoured: false
    }
  ]);
});

router.post("/api/eat", function(req, res) {
  console.log("-------------------");
  console.log(req.body.meal);
  db.Burger.create({
    burger_name: req.body.meal,
    devoured: false
  }).then(result => {
    // Send back the ID of the new quote
    console.log("data");
    console.log(result.id);
    res.json(`created Id: ${result.id}`);
    //  res.send(200);
  });
});

router.put("/api/devour/:id", function({ params }, res) {
  let id = params.id;

  console.log("id", id);
  console.log(typeof id);
  db.Burger.update(
    { devoured: true },
    {
      where: {
        id: id
      }
    }
  ).then(() => {
    res.status(200).end();
  });
});

router.get("/", function(req, res) {
  db.Burger.findAll({
    order: [["id", "DESC"]]
  }).then(dbGet => {
    //res.json(dbPost);
    const handlebarsObj = {
      burgers: dbGet.map(burger => burger.toJSON())
    };
    // console.log(handlebarsObj);
    // res.json(handlebarsObj)
    res.render("index", handlebarsObj);
  });

  // console.log(res.json(data));
  // res.render("index", data);
});

module.exports = router;
