const mongoose = require("mongoose")

const crypto = require("crypto")

//User Picture should be added
//default salonid = 0
const adminSchema = new mongoose.Schema({
    salonId:{
        type: Number,
        default: 0
    },
    registeredSalons: [{
        type: Number
    }],
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    emailVerified:{
        type: Boolean,
        default: false
    },
    verificationCode:{
        type: String,
        // required:true
    },
    password: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    },
    role:{
        type:String
    },
    AuthType: {
        type: String,
        default: "local"
    },
    gender:{
        type:String,
    },

    profile: [
        {
            public_id: {
                type: String
            },
            url: {
                type: String,
            }
        }
    ],

    dateOfBirth:{
        type: Date,
    },
    mobileNumber:{
        type: Number,
    },
    mobileVerified:{
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },{ timestamps: true });
  //Generating Password Reset Token
adminSchema.methods.getResetPasswordToken = function () {

    //generate token
    const resetToken = crypto.randomBytes(20).toString("hex")

    //Hashing and adding resetPasswordtoken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    //We return this because when user click then this resetPasswordToken will form .so thast why 
    return resetToken
}
  const Admin = mongoose.model('Admin', adminSchema);
  
  module.exports = Admin;