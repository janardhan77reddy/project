const { reject } = require("bcrypt/promises");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const SECRET_CODE = "qwertyuioplkjhgfdsa";
const { offer } = require("../schema/offer-schema");

const getUserByToken = (token) => {
    new Promise((resolve, reject) => {
        if (token) {
            let userData
            try {
                userData = jwt.verify(token, SECRET_CODE);
                resolve(userData);
            } catch (err) {
                reject("Invaild token")
            }
        } else {
            reject("Token not found")
        }
    })
}

router.post("/list", async (req, res) => {
    const validOffers = [];
    offer.find().then((offers) => {
        offers.filter((offer) => {
            const rules = offer.target.split("and")
            rules.forEach((rule) => {
                let ruleKey = {}
                if (rule.includes(">")) {
                    ruleKey = { key: rule.trim().split(">")[0], value: rule.trim().split(">")[1], operator: ">" }
                    console.log(rule.trim.split(">")[0])
                    if (req.body[ruleKey.key] > ruleKey.value) {
                        validOffers.push(offer)
                    }
                    console.log(validOffers)
                } else {
                    ruleKey = { key: rule.trim().split("<")[0], value: rule.trim().split("<")[1], operator: "<" }
                    if (req.body[ruleKey.key] < ruleKey.value) {
                        validOffers.push(offer)
                    }
                    console.log(validOffers)
                }
            })
            res.status(200).send(validOffers);
        })
    }).catch(()=> {
        res.status(500).send("Internal server error");
    })
});


router.post("/create", async (req, res) => {
    getUserByToken(req.headers.authorization).then((user) => {
        offer.create({ ...req.body, username: user.username }).then((offer) => {
            res.status(200).send(offer);
        }).catch((err) => {
            res.status(400).send({ message: err.message })
        })
    }).catch((err) => {
        res.status(400).send(err)
    })
});

router.put("/update", async () => {
    offer.updateOne("identifier data", "newData");
});
router.delete("/delete", async () => {
    offer.deleteOne({ _id: req.body.id });
});


module.exports = router;