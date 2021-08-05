const Bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    columns: 
        {
            type: Schema.Types.ObjectId,
            ref: "columns"
        },
    
    
   
}, {timestamps: true});


userSchema.pre("save", function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = Bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function(plaintext, callback){
    return callback(null, Bcrypt.compareSync(plaintext, this.password));
};


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;