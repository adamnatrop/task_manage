
const { UserModel } = require('../models');

module.exports = {
    register: async (req, res) => {
        
        console.log("register module hit!")
        try {
            
            const user = await UserModel.create(req.body)
            const userData = await user.save();
            req.session.save(() => {
                req.session.userId = userData._id;
                req.session.loggedIn = true;
                res.status(200).json(userData);
                console.log(userData)
                console.log(req.session)
            });
            
            // userData.loggedIn = true
            // console.log("userData", userData)
            // res.status(200).json(userData);
        } catch (err) {
            res.status(400).json(err);
        }   
    },

    login: async (req, res) => {
        
        try {
            const userData = await UserModel.findOne({email: req.body.email}).exec();
            console.log(userData)
            if(!userData){
                return res.status(400).send({message: "Wrong email or password, please try again"})
            }
            userData.comparePassword(req.body.password, (error, match) => {
                if(!match) {
                    return res.status(400).send({ message: "The password is invalid"});
                }
            });
            req.session.save(() => {
                req.session.userId = userData._id;
                req.session.loggedIn = true;
                res.json({ 
                    user: userData,
                    message: "The username and password are correct!"
                });
            });
        } catch (error) {
            res.send(500).send(error);
        }
    },

    logout: async (req, res) => {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    },

    currentSession: async (req, res) => {
        if (req.session.loggedIn) {
            res.send(true)
        } else {
            res.send(false)
        }
    }

}