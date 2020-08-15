const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    	name: {
        type: String,
        required: true
   	}, //name is allowed to be duplicated due to practical reasons an additional unique username field is included instead
    	username: {
        type: String,
        required: true,
        unique: true
    	},  
   	password: {
        type: String,
        required: true,
		unique:true,
		//minlength:12,
		//maxlength:15
    	},
	//password should be 12-15 characters
	email: {
        type: String,
        required: true
	},
	telnum: {
        type: Number,
	},
	address:{
		type:String
	},
	accounttype:{
		type:String
	}
	//account type:"true"(1) is for admin and "false"(0) is for student. unless adding an admin record it is not necessary to enter account type as default value will be set to false which is for student.
},{
    timestamps: true
});

var Students = mongoose.model('Student', studentSchema);

module.exports = Students;
