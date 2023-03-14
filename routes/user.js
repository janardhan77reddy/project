const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const SECRET_CODE = "qwertyuioplkjhgfdsa";
const salt = 10;
const user = require("../schema/user-schema");


router.post("/singup", async(req, res)=> {
    bcrypt.genSalt(salt, (saltErr, saltValue)=> {
        if(saltErr){
            res.status(401).send("unable to process");
        } else {
            bcrypt.hash(req.body.password,saltValue, (hashErr, hashValue)=> {
                if(hashErr){
                    res.status(401).send("unable to process");
                } else {
                    user.create({username: req.body.username, password: hashValue, email: req.body.email | "", mobile: req.body.mobile | ""}).then((user)=> {
                        res.status(200).send(user.username + " " + "created sucessfully");
                    }).catch((err)=> {
                        res.status(400).send(err.message)
                    })
                }
            })
        }
    })

});


router.post("/singin", async(req, res)=> {
    user.findOne({username: req.body.username}).then((user)=> {
        if(!user) {
            res.status(401).send("user not exists");
        } else {
            if(!bcrypt.compareSync(req.body.password, user.password)) {
                res.status(401).send("Invalid password");
            } else {
                const token = jwt.sign({id: user._id, username: user.username}, SECRET_CODE);
                res.status(200).send({message: "user loggined sucessfully", token: token})

            }
        }
    }).catch(()=> {

    })

});


module.exports = router;