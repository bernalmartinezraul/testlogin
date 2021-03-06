const db = require("../models");
//console.log(db);
const Users = db.users;
const Op = db.Sequelize.Op;

/*
Rename to AdminUserOperations.controller.js
Admin user specific controller
includes validation and response status exception handling.
*/


//Create and save a user
exports.create = (req, res) => {

    //Check if all required fields are not empty for creating a user.
    if(!req.body.username || !req.body.email || !req.body.password){
        res.status(400).send({
            message: "Content can not be empty"
        });
        return;
    }

    //create user object with request body parameters.
    const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
    };

    //Save to database and error handle promises.
    Users.create(user)
    .then(user => {
            res.send({ message: "User was registered successfully!" });
      })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "some error occurred trying to create user."
        });
    });
};
//find a user by userId FindOne getUserById
exports.findOne = (req, res) => {
 const id = req.params.id;

 Users.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error occurred trying to retrieve User with id=" + id
        });
    });
};


//Retrieve all users from the database.
exports.findAll = (req, res) => {
const username = req.query.username;
var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;
    
Users.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Users."
        
        });
      });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Users.update(req.body, {
         where: { id: id } 
        })
         .then(num => {
            if(num == 1) {
                res.send({
                    message: "User update successfull"
                });
            } else {
                res.send({
                  message: `Cannot update user with id=${id}. Check if User exists or if the req.body is empty!`
                        });
                    }
                })
                .catch(err =>  {
                    res.status(500).send({
                        message: "An error occurred updating User with id=" + id
                    });
                });
        };

//delete a user or DeleteUser
exports.delete = (req, res) => {
    const id = req.params.id; 

    Users.destroy({
        where: { id: id }
    })
      .then(num => {
          if(num == 1) {
              res.send({
                  message: "User has been successfully deleted!"
              });
          } else {
              res.send({
                  message: `Cannot delete User with id=${id}. User was not found!`
              });
          }
      })
      .catch(err => {
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    });
  };