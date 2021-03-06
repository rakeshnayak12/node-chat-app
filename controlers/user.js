let UserCollection = require('../models/user').user;

function User() {}

User.prototype.storeUser = function(data,callback){

    let userObj = new UserCollection({
        userName: data.userName,
        emailId: data.emailId,
        password: data.password,
        fullName: data.fullName,
        registeredDate: new Date()
    });
    
    userObj.save(function(error,result){
        if(error){
            console.log("Something went wrong");
            result = "Something went wrong while saving the user"
        }

        callback(error,result)
    });
};

User.prototype.getUsers = function(callback){
    UserCollection.find({}).lean().exec(function(error, result) {
        callback(error, result)
    });
};

User.prototype.getUser = function(fullName, callback){
    UserCollection.find({fullName: {"$regex": fullName}}, function(error, result){
        callback(error, result);
    });
}

User.prototype.updateUser = (userName, fullName, callback) => {
    UserCollection.update({userName: userName}, {$set:{fullName: fullName}}, (error, result) => {
        if(result.n === 0){
            msg = "User not found";
            return callback(error, result, msg);
        }
        msg = "User is updated"
        callback(error, result, msg);
    });
};

User.prototype.deleteUser = (userName, callback) => {
    UserCollection.deleteOne({userName: userName}, (error, result) => {
        callback(error, result);
    });
};

User.prototype.loginUser = (userName, password, callback) => {
    UserCollection.find({userName: userName, password: password}, (error, result) => {
        console.log(userName + " is logged in");
        callback(error, result);
    });
};

module.exports = User;