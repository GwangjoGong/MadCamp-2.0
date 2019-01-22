var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MadCampUser');


var Schema = mongoose.Schema;

var userSchema = new Schema({

    id: String,
    pw: String,
    name: String,
    uid: String,
    class:{type: Number, min : 1, max : 3}

});

module.exports = mongoose.model('User',userSchema);
