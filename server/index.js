const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "crud_contact"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
    const { name, email, contact } = req.body;
    const sqlInsert = "INSERT INTO `contact_db` (`name`, `email`, `contact`) VALUES ( ?, ?, ?)";
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if (error) {
            console.log(error);
        }
    })
})

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    })
})

// app.get("/api/get:id", (req, res) => {
//     const 
//     const sqlGet = "SELECT * FROM contact_db";
//     db.query(sqlGet, (error, result) => {
//         res.send(result);
//     });
// });


app.get("/", (req, res) => {
    // const sqlInsert = "INSERT INTO `contact_db` (`id`, `name`, `email`, `contact`) VALUES ('2', 'saurabh', 'saurabhs@gmail.com', '08459113491')";
    // db.query(sqlInsert, (error, result) => {
    //     console.log("error", error);
    //     console.log("result", result);
    //     res.send("Hello Express");
    // });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})