
const { validateSignUp } = require("../../middlewares/registerValidator");
const adminService = require("../../services/admin/adminRegisterService")
const Admin = require("../../models/adminRegisterModel")
const Barber = require("../../models/barberRegisterModel")
const Salon = require("../../models/salonsRegisterModel")

const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const emailWithNodeMail = require('../../utils/nodeMailer.js');
const crypto = require("crypto");
const bcrypt = require("bcrypt")

const JWT_ACCESS_SECRET = "accessTokenAdmin"
const JWT_REFRESH_SECRET = "refreshToken"

//Upload Profile Picture Config
const path = require("path");
const fs = require('fs');
const { sendPasswordResetEmail } = require("../../utils/emailSender");
const { validateEmail } = require("../../middlewares/validator");
const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name: 'dfrw3aqyp',
    api_key: '574475359946326',
    api_secret: 'fGcEwjBTYj7rPrIxlSV5cubtZPc',
});


//DESC:REGISTER A ADMIN 
//====================
const registerController = async (req, res, next) => {
    try {
        const { email, password } = req.body

        // Validate email format
        if (!email || !validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        // Validate password length
        if (!password || password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }


        // Check if the email is already registered
        const existingUser = await Admin.findOne({ email, role: 'Admin' }).exec()

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create a new user
        const newUser = new Admin({
            email,
            password: hashedPassword,
            role: "Admin",
        })

        await newUser.save()

        res.status(200).json({
            success: true,
            message: 'Admin registered successfully',
            newUser
        })
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}

//DESC:LOGIN A USER =========================
const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        // Validate password length
        if (!password || password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }

        const foundUser = await Admin.findOne({ email, role: 'Admin'  }).exec()

        if (!foundUser) {
            return res.status(400).json({
                success: false,
                message: 'Unauthorized Admin'
            })
        }

        const match = await bcrypt.compare(password, foundUser.password)

        if (!match) return res.status(400).json({
            message: false,
            message: 'Unauthorized Admin'
        })

        const accessToken = jwt.sign(
            {
                "email": foundUser.email,
                "role": foundUser.role
            },
            JWT_ACCESS_SECRET,
            { expiresIn: '1d' }
        )

        // const refreshToken = jwt.sign(
        //     { "email": foundUser.email, "role": foundUser.role },
        //     REFRESH_TOKEN_SECRET,
        //     { expiresIn: '1d' }
        // )

        // Create secure cookie with refresh token 
        res.cookie('AdminToken', accessToken, {
            httpOnly: true, //accessible only by web server 
            secure: true, //https
            maxAge: 1 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
        })

        // Send accessToken containing username and roles 
        res.status(201).json({
            success: true,
            message: "Admin Logged In Successfully",
            accessToken,
            foundUser
        })
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};


//GOOGLE SIGNIN ===================================
const googleAdminSignup = async (req, res, next) => {
    try {
        const CLIENT_ID = '508224318018-quta6u0n38vml0up7snscdrtl64555l1.apps.googleusercontent.com'

        const token = req.query.token;

        console.log(token)

        if (!token) {
            return res.status(404).json({
                success: false,
                message: "UnAuthorized Admin or Token not present"
            })
        }

        const client = new OAuth2Client(CLIENT_ID);

        // Call the verifyIdToken to
        // varify and decode it
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });

        // Get the JSON with all the user info
        const payload = ticket.getPayload();

        console.log("Google payload ", payload)

        // Check if the email is already registered
        const existingUser = await Admin.findOne({ email: payload.email, role: 'Admin' }).exec()

        if (existingUser) {
            return res.status(404).json({ success: false, message: 'Admin Email already exists' })
        }

        // Create a new user
        const newUser = new Admin({
            email: payload.email,
            role: "Admin",
            AuthType: "google"
        })

        await newUser.save()

        res.status(201).json({ success: true, message: 'Admin registered successfully', newUser })

    }
    catch (error) {
        console.log(error);
        next(error);
    }
}


const googleAdminLogin = async (req, res, next) => {
    try {
        const CLIENT_ID = '508224318018-quta6u0n38vml0up7snscdrtl64555l1.apps.googleusercontent.com'

        const token = req.query.token;

        if (!token) {
            return res.status(404).json({ success: false, message: "UnAuthorized Admin or Token not present" })
        }

        const client = new OAuth2Client(CLIENT_ID);

        // Call the verifyIdToken to
        // varify and decode it
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });

        // Get the JSON with all the user info
        const payload = ticket.getPayload();

        console.log("Google Login payload ", payload)

        const foundUser = await Admin.findOne({ email: payload.email, role: 'Admin' }).exec()

        if (!foundUser) {
            return res.status(401).json({ success: false, message: 'Unauthorized Admin' })
        }

        const accessToken = jwt.sign(
            {

                "email": foundUser.email,
                "role": foundUser.role,
            },
            JWT_ACCESS_SECRET,
            { expiresIn: '1d' }
        )


        // Create secure cookie with refresh token 
        res.cookie('AdminToken', accessToken, {
            httpOnly: true, //accessible only by web server 
            secure: true, //https
            maxAge: 1 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
        })
        res.status(201).json({
            success: true,
            message: "Admin Logged In Successfully",
            accessToken,
            foundUser
        })
    } catch (error) {
        console.log(error)
    }
}

//DESC:REFRESH TOKEN ==============================
// const refreshTokenController = async (req, res, next) => {
//     const refreshToken = req.cookies.refreshToken;

//     if (!refreshToken) {
//         return res.status(401).json({ success: false, message: "Refresh token not provided." });
//     }

//     try {
//         const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

//         const newAccessToken = jwt.sign({ user: decoded.user }, JWT_ACCESS_SECRET, { expiresIn: "20s" });

//         // Set the new access token as an HTTP-only cookie
//         res.cookie('accessToken', newAccessToken, {
//             httpOnly: true,
//             expires: new Date(Date.now() + 20 * 1000),
//             secure: true,
//             sameSite: "None"
//         });

//         res.status(200).json({ success: true, message: "New accessToken generated" });
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// }

//DESC:LOGOUT A USER ========================
const handleLogout = async (req, res, next) => {
    try {
        //cookie parse na use korle ata kaj korbe na
        const cookies = req.cookies

        // Ai line ta lagia ami logout error check korbo
        // if(cookies) { return res.status(401).json({ message:"Unauthorize Admin" }) }

        if (!cookies?.AdminToken) return res.status(404).json({
            success: false,
            message: "Unauthorize Admin"
        }) //No content
        res.clearCookie('AdminToken', {
            httpOnly: true,
            secure: true
        })
        res.status(200).json({
            success: true,
            message: 'Admin Cookie cleared'
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const AdminLoggedIn = async (req, res, next) => {
    try {
        const admincookie = req.cookies

        console.log(admincookie)

        if (!admincookie?.AdminToken) {
            return res.status(401).json({
                success: false,
                message: "UnAuthorized Admin"
            })
        }

        jwt.verify(
            admincookie?.AdminToken,
            JWT_ACCESS_SECRET,
            async (err, decoded) => {
                if (err) return res.status(403).json({ success: false, message: 'Forbidden Admin' })

                console.log(decoded)
                const adminEmail = decoded.email

                const loggedinUser = await Admin.findOne({email:adminEmail})
                res.status(201).json({
                    success: true,
                    user: [loggedinUser]
                })

            }
        )
    }
    catch (error) {
        console.log(error);
        next(error);
    }

}

const updateAdmin = async (req, res) => {
    try{
        const { email, name, mobileNumber, gender, dateOfBirth } = req.body

          // Check if the provided email and password match any existing admin
          const foundUser = await Admin.findOne({ email, role: 'Admin'}).exec()
    
          if (!foundUser) {
              return res.status(400).json({
                  success: false,
                  message: 'Unauthorized Admin'
              })
          }
  
  
          // Update user information
          foundUser.name = name
          foundUser.mobileNumber = mobileNumber
          foundUser.gender = gender
          foundUser.dateOfBirth = dateOfBirth
  
          const updatedAdmin = await foundUser.save()
  
          const accessToken = jwt.sign(
              {
                  "email": email,
                  "role": foundUser.role,
              },
              JWT_ACCESS_SECRET,
              { expiresIn: '1d' }
          )
  
          // const refreshToken = jwt.sign(
          //     { "email": email, "role": foundUser.role },
          //     REFRESH_TOKEN_SECRET,
          //     { expiresIn: '1d' }
          // )
  
          // Create secure cookie with refresh token 
          res.cookie('AdminToken', accessToken, {
              httpOnly: true, //accessible only by web server 
              secure: true, //https
              maxAge: 1 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
          })
  
          // Send accessToken containing username and roles 
          res.status(201).json({
              success: true,
              message: 'Admin information updated successfully',
              accessToken,
              updatedAdmin
          })
    }   catch (error) {
        console.log(error);
        next(error);
    }
}



//DESC:FORGOT PASSWORD SENDING EMAIL TO USER ===========
const handleForgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body

        // Validate email format
        if (!email || !validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }


        const user = await Admin.findOne({ email: email })

        if (!user) {
            return res.status(200).json({
                success: false,
                message: "Admin with this email does not exist. Please register first."
            });
        }

        //get ResetPassword Token
        const resetToken = user.getResetPasswordToken()

        await user.save({ validatebeforeSave: false })

        const CLIENT_URL = "https://iqb-react-frontend.netlify.app/"

        //prepare email
        const emailData = {
            email,
            subject: 'Reset Password Email',
            html: `
                <h2>Hello ${user.name}!</h2>
                <p>Please click here to link <a style="background-color: #c2e7ff; padding: 8px 12px; border-radius: 15px; color: white; text-decoration: none; border: none; margin-left:10px;color:black;font-weigth:bold" href="${CLIENT_URL}${resetToken}" target="_blank">Reset your password</a></p>
            `
        };

        try {
            await emailWithNodeMail(emailData)
        } catch (error) {
            console.log(error);
            next(error);
        }

        res.status(200).json({
            success: true,
            message: `Please go to your ${email} for reseting the password`,
            payload: {
                resetToken
            }
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}


//DESC:RESET PASSWORD =================================
const handleResetPassword = async (req, res, next) => {
    try {
        const { password } = req.body;


        // Validate password length
        if (!password || password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }

        //creating token hash
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

        const user = await Admin.findOne({
            resetPasswordToken: resetPasswordToken, resetPasswordExpire: {
                $gt: Date.now()
            }
        })

        if (!user) {
            res.status(201).json({
                success: false,
                message: "Reset Password Token is invalid or has been expired"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save()

        res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
}


//MIDDLEWARE FOR ALL PROTECTED ROUTES ==================

// const isLogginMiddleware = async (req, res) => {
//     try {
//         const accessToken = req.cookies.accessToken;
//         const refreshToken = req.cookies.refreshToken;

//         if (!refreshToken) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Refresh Token not present. Please Login Again",
//             });
//         }

//         // Verify old refresh token
//         const decodeToken = jwt.verify(accessToken, JWT_ACCESS_SECRET);

//         const loggedinUser = await Admin.findOne({ email: decodeToken.user.email});

//          //Fetch the salon details using the salonId of the logged-in admin
//         const loggedInSalon = await Salon.findOne({ salonId: loggedinUser.salonId });

//         if (!decodeToken) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid Access Token. Unauthorized User",
//             });
//         }
//         return res.status(200).json({
//             success: true,
//             message: "User already logged in",
//             user: [loggedinUser]
//         });
//         // if (loggedinUser) {
//         //     return res.status(200).json({
//         //         success: true,
//         //         message: "User already logged in",
//         //         user: [loggedinUser]
//         //     });
//         // } else {
//         //     return res.status(400).json({
//         //         success: false,
//         //         message: "You are not an admin",
//         //         user: [loggedinUser]
//         //     });
//         // }

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//             error: error.message
//         });
//     }
// }

const isLogginMiddleware = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(403).json({
                success: false,
                message: "Refresh Token not present. Please Login Again",
            });
        }

        // Verify old refresh token
        const decodeToken = jwt.verify(accessToken, JWT_ACCESS_SECRET);

        const loggedinUser = await Admin.findOne({ email: decodeToken.user.email, admin: decodeToken.user.admin });

        if (!decodeToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid Access Token. Unauthorized User",
            });
        }
        if (loggedinUser === null) {
            return res.status(400).json({
                success: false,
                message: "You are not an Admin.",
                user: [loggedinUser]
            });
        }

        return res.status(201).json({
            success: true,
            message: "User already logged in",
            user: [loggedinUser]
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
}

// const isLogginMiddleware = async (req, res) => {
//     try {
//         const accessToken = req.cookies.accessToken;
//         const refreshToken = req.cookies.refreshToken;

//         if (!refreshToken) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Refresh Token not present.Please Login Again",
//             });
//         }

//         // Verify old refresh token
//         const decodeToken = jwt.verify(accessToken, JWT_ACCESS_SECRET);

//         const loggedinUser = await Admin.findOne({ email: decodeToken.user.email })

//         // Fetch the salon details using the salonId of the logged-in admin
//         const loggedInSalon = await Salon.findOne({ salonId: loggedinUser.salonId });

//         if (!decodeToken) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid Access Token. UnAuthorize User",
//             });
//         }

//         res.setHeader('Cache-Control', 'no-cache');

//         const generateETag = (data) => {
//             const hash = crypto.createHash('sha256');
//             hash.update(JSON.stringify(data));
//             return hash.digest('hex')
//         }

//         const etag = generateETag(loggedinUser)

//         console.log("Sagnik",etag)

//         const clientEtag = req.get('If-None-Match');

//         if(clientEtag === etag){
//             return res.status(304).end();
//         }


//         res.setHeader('ETag', etag);

//         return res.status(200).json({
//             success: true,
//             message: "User already logged in",
//             user: [loggedinUser]
//         });

//     } catch (error) {
//         return res.json({
//             success: false,
//             message: "Problem",
//             error: error.message
//         });
//     }
// }

// const isLogginMiddleware = async (req, res) => {
//     try {
//         const accessToken = req.cookies.accessToken;
//         const refreshToken = req.cookies.refreshToken;

//         if (!refreshToken) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Refresh Token not present. Please Login Again",
//             });
//         }

//         // Verify old refresh token
//         const decodeToken = jwt.verify(accessToken, JWT_ACCESS_SECRET);

//         const loggedinUser = await Admin.findOne({ email: decodeToken.user.email });

//         // Fetch the salon details using the salonId of the logged-in admin
//         const loggedInSalon = await Salon.findOne({ salonId: loggedinUser.salonId });

//         if (!decodeToken) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid Access Token. Unauthorized User",
//             });
//         }

//         res.setHeader('Cache-Control', 'no-cache');

//         const generateETag = (data) => {
//             const hash = crypto.createHash('sha256');
//             hash.update(JSON.stringify(data));
//             return hash.digest('hex');
//         };

//         const etag = generateETag(loggedinUser);

//         console.log("Sagnik", etag);

//         const clientEtag = req.get('If-None-Match');

//         if (clientEtag === etag) {
//             return res.status(304).end();
//         }

//         res.setHeader('ETag', etag);

//         return res.status(200).json({
//             success: true,
//             message: "User already logged in",
//             user: [loggedinUser],
//         });

//     } catch (error) {
//         return res.json({
//             success: false,
//             message: "Problem",
//             error: error.message,
//         });
//     }
// };


const isLoggedOutMiddleware = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;


        if (!refreshToken) {
            return res.status(403).json({
                success: false,
                message: "Refresh Token not present.Please Login Again",
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//MIDDLEWARE FOR ALL PROTECTED ROUTES ==================
const handleAdminProtectedRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(403).json({
                success: false,
                message: "Refresh Token not present.Please Login Again",
            });
        }

        // Verify old refresh token
        const decodeToken = jwt.verify(accessToken, JWT_ACCESS_SECRET);

        console.log(decodeToken)

        if (!decodeToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid Access Token. UnAuthorize User",
            });
        }

        req.user = decodeToken.user;

        // console.log(req.user.barber)

        if (req.user && !req.user.barber) {
            next();
        } else {
            return res.status(400).json({
                success: false,
                message: "You are not Authenticated Admin"
            })
        }

    } catch (error) {
        console.log(error);
        next(error);
    }

};

//COMMON MIDDLEWARES FOR ALL
const handleProtectedRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: "Refresh Token not present.Please Login Again",
            });
        }

        // Verify old refresh token
        const decodeToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);

        if (!decodeToken) {
            return res.status(400).json({
                success: false,
                message: "Invalid Access Token. UnAuthorize User",
            });
        }

        req.user = decodeToken.user;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }

};

//PROETCTED ROUTE =============================
// const profileController = async (req, res) => {
//     const user = req.user;

//     res.status(200).json({
//         success: true,
//         message: "Protected Resources accessed successfully.",
//         user,
//     });
// };

const deleteSingleAdmin = async (req, res, next) => {
    const { email} = req.body;
    try {

        // Validate email format
        if (!email || !validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }
        const result = await adminService.deleteAdmin(email)
        res.status(result.status).json({
            response: result.response,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}


//TO UPDATE ADMIN ACCOUNT DETAILS
const updateAdminAccountDetails = async (req, res, next) => {
    const { name, gender, email, mobileNumber, dateOfBirth, password } = req.body;

    try {

        // // Check if required fields are missing or empty
        // if (!name || !gender || !email || !mobileNumber || !dateOfBirth ) {
        //     return res.status(400).json({ success: false, message: "Missing required fields" });
        // }
        // Validate email format
        if (!validateEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Validate password length
        if (password && password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }
        // Validate mobile number format (assuming it should be exactly 10 digits)
        if (!/^\d{10}$/.test(mobileNumber)) {
            return res.status(400).json({ success: false, message: "Invalid mobile number format" });
        }


        const adminData = { name, gender, email, mobileNumber, dateOfBirth, password };
        const result = await adminService.updateAdmin(adminData);
        res.status(result.status).json({
            success: true,
            response: result.response,
            error: result.error
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}


//APPROVE BARBER API
const approveBarber = async (req, res, next) => {
    try {
        const { salonId, email, isApproved } = req.body;
        // Validate email format
        if (!email || !validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        const approvedStatus = await Barber.findOneAndUpdate({ salonId, email }, { isApproved }, { new: true });

        if (!email) {
            res.status(400).json({
                success: false,
                message: "Barber with the EmailId not found for the Salon",
            });
        }
        res.status(200).json({
            success: true,
            message: "Barber has been approved",
            response: approvedStatus
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}

//Upload Admin profile Picture
const uploadAdminprofilePic = async (req, res, next) => {
    try {
        let profiles = req.files.profile;
        const email = req.body.email;

        // Validate email format
        if (!email || !validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        if (!profiles) {
            return res.status(400).json({ success: false, message: "Please provide profile image" });
        }



        // Ensure that profiles is an array, even for single uploads
        if (!Array.isArray(profiles)) {
            profiles = [profiles];
        }

        const uploadPromises = [];

        for (const profile of profiles) {
            uploadPromises.push(
                new Promise((resolve, reject) => {
                    const public_id = `${profile.name.split(".")[0]}`;

                    cloudinary.uploader.upload(profile.tempFilePath, {
                        public_id: public_id,
                        folder: "students",
                    })
                        .then((image) => {
                            resolve({
                                public_id: image.public_id,
                                url: image.secure_url, // Store the URL
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                            next(error);
                        })
                        .finally(() => {
                            // Delete the temporary file after uploading
                            fs.unlink(profile.tempFilePath, (unlinkError) => {
                                if (unlinkError) {
                                    console.error('Failed to delete temporary file:', unlinkError);
                                }
                            });
                        });
                })
            );
        }

        Promise.all(uploadPromises)
            .then(async (profileimg) => {
                console.log(profileimg);

                const adminImage = await Admin.findOneAndUpdate({ email }, { profile: profileimg }, { new: true });

                res.status(200).json({
                    success: true,
                    message: "Files Uploaded successfully",
                    adminImage
                });
            })
            .catch((error) => {
                console.log(error);
                next(error);
            });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//Update Admin Profile Picture
const updateAdminProfilePic = async (req, res, next) => {
    try {
        const id = req.body.id;

        const adminProfile = await Admin.findOne({ "profile._id": id }, { "profile.$": 1 })

        const public_imgid = req.body.public_imgid;
        const profile = req.files.profile;

        // Check if the required fields are present
        if (!profile) {
            return res.status(400).json({ success: false, message: "Please provide profile image" });
        }

        // Validate Image
        const fileSize = profile.size / 1000;
        const fileExt = profile.name.split(".")[1];

        if (fileSize > 500) {
            return res.status(400).json({ success: false, message: "File size must be lower than 500kb" });
        }

        if (!["jpg", "png", "jfif", "svg"].includes(fileExt)) {
            return res.status(400).json({ success: false, message: "File extension must be jpg or png" });
        }

        // Generate a unique public_id based on the original file name
        const public_id = `${profile.name.split(".")[0]}`;

        cloudinary.uploader.upload(profile.tempFilePath, {
            public_id: public_id,
            folder: "students",
        })
            .then(async (image) => {

                const result = await cloudinary.uploader.destroy(public_imgid);

                if (result.result === 'ok') {
                    console.log("cloud img deleted")

                } else {
                    res.status(500).json({
                        message: 'Failed to delete image.'
                    });
                }

                // Delete the temporary file after uploading to Cloudinary
                fs.unlink(profile.tempFilePath, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });

                const updatedAdmin = await Admin.findOneAndUpdate(
                    { "profile._id": id },
                    {
                        $set: {
                            'profile.$.public_id': image.public_id,
                            'profile.$.url': image.url
                        }
                    },
                    { new: true }
                );

                res.status(200).json({
                    success: true,
                    message: "Files Updated successfully",
                    updatedAdmin
                });

            })



    } catch (error) {
        console.log(error);
        next(error);
    }
}

//Delete Admin Profile Picture
const deleteAdminProfilePicture = async (req, res, next) => {
    try {
        const public_id = req.body.public_id
        const img_id = req.body.img_id

        const result = await cloudinary.uploader.destroy(public_id);

        if (result.result === 'ok') {
            console.log("cloud img deleted")

        } else {
            res.status(500).json({ success: false, message: 'Failed to delete image.' });
        }

        const updatedAdmin = await Admin.findOneAndUpdate(
            { 'profile._id': img_id },
            { $pull: { profile: { _id: img_id } } },
            { new: true }
        );

        if (updatedAdmin) {
            res.status(200).json({
                success: true,
                message: "Image successfully deleted"
            })
        } else {
            res.status(200).json({ success: false, message: 'Image not found in the student profile' });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//Get Salons by Admin
const getAllSalonsByAdmin = async (req, res, next) => {
    try {
        const { adminEmail } = req.body; // Assuming admin's email is provided in the request body

        const email = adminEmail;
        // Validate email format
        if (!email || !validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }
        // Find the admin based on the email
        const admin = await Admin.findOne({ email: adminEmail });

        if (!admin) {
            return res.status(201).json({
                success: false,
                message: 'Admin not found',
            });
        }

        // Fetch all salons associated with the admin from registeredSalons array
        const salons = await Salon.find({
            salonId: { $in: admin.registeredSalons },
            isDeleted: false,
        });

        res.status(200).json({
            message: 'Salons retrieved successfully',
            salons: salons,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//Get Default Salon Details Of Admin
const getDefaultSalonByAdmin = async (req, res, next) => {
    try {
        const { adminEmail } = req.body;

        const email = adminEmail;
        // Validate email format
        if (!email || !validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        const admin = await Admin.findOne({ email: adminEmail })
        if (!admin) {
            res.status(201).json({
                success: false,
                message: 'No admin found.',
            });
        }
        else {
            const defaultSalon = await Salon.findOne({ salonId: admin.salonId })

            // res.setHeader('Cache-Control', 'private, max-age=3600');
            res.status(200).json({
                message: "Salon Found",
                response: defaultSalon
            })
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}


//Change Salon Id of Admin
const changeDefaultSalonIdOfAdmin = async (req, res, next) => {
    try {
        const { adminEmail, salonId } = req.body;
        if (!salonId) {
            return res.status(400).json({ success: false, message: "Please provide salonId" });
        }

        // Assuming admin's email and new salonId are provided in the request body
        const email = adminEmail
        // Validate email format
        if (!email || !validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }
        // Find the admin based on the provided email
        const admin = await Admin.findOne({ email: adminEmail});

        if (!admin) {
            return res.status(201).json({
                success: false,
                message: 'Admin not found',
            });
        }
        // Check if salonId is provided in the request body
        if (!salonId) {
            return res.status(400).json({ success: false, message: "Please provide salonId" });
        }

        // Check if the provided salonId exists in the database
        const salonExists = await Salon.exists({ salonId: salonId });

        if (!salonExists) {
            return res.status(201).json({
                success: false,
                message: 'Salon not found',
            });
        }

        // Update the default salonId of the admin
        admin.salonId = salonId;
        await admin.save();

        res.status(200).json({
            message: 'Default salon ID of admin updated successfully',
            admin: admin,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

//Send Email Verification code
const sendVerificationCodeForAdminEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Validate email format
        if (!email || !validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(201).json({
                success: false,
                response: "User with this email does not exist. Please register first",
            });
        }

        const verificationCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        const emailData = {
            email,
            subject: 'Verify your Email',
            html: `
            <h2>Hello ${user.name}!</h2>
            <p>Your To verify your Email please note the verification code. Your verification code is ${verificationCode}</p>
          `
        };

        user.verificationCode = verificationCode;
        await user.save();

        try {
            await sendPasswordResetEmail(emailData);
        } catch (error) {
            console.log(error);
            next(error);
        }

        return res.status(200).json({
            success: true,
            message: `Please check your email (${email}) for verification.`,
            verificationCode: verificationCode
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//Match Verification Code and change EmailVerified Status
const changeEmailVerifiedStatus = async (req, res, next) => {
    try {
        const { email, verificationCode } = req.body;
        // Validate email format
        if (!email || !validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }


        // FIND THE CUSTOMER 
        const admin = await Admin.findOne({ email });

        if (admin && admin.verificationCode === verificationCode) {
            // If verification code matches, clear it from the database
            admin.verificationCode = '';
            admin.emailVerified = true;
            await admin.save();

            return res.status(200).json({
                success: true,
                response: admin,
            });
        }

        // If verification code doesn't match or customer not found
        return res.status(201).json({
            success: false,
            response: "Verification Code didn't match",
            message: "Enter a valid Verification code",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const demoController = (req, res) => {
    const email = req.email
    const role = req.role
    res.status(200).json({ message: "Home Route", email, role })
}


module.exports = {
    deleteSingleAdmin,
    updateAdminAccountDetails,
    loginController,
    handleAdminProtectedRoute,
    // profileController,
    handleLogout,
    isLogginMiddleware,
    isLoggedOutMiddleware,
    registerController,
    handleForgetPassword,
    handleResetPassword,
    approveBarber,
    uploadAdminprofilePic,
    updateAdminProfilePic,
    deleteAdminProfilePicture,
    getAllSalonsByAdmin,
    changeDefaultSalonIdOfAdmin,
    sendVerificationCodeForAdminEmail,
    changeEmailVerifiedStatus,
    getDefaultSalonByAdmin,
    handleProtectedRoute,
    AdminLoggedIn,
    updateAdmin,
    demoController,
    googleAdminSignup,
    googleAdminLogin,
}