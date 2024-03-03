
const { validateSignUp } = require("../../middlewares/registerValidator");
const customerService = require("../../services/customer/customerRegisterService.js")
const Customer = require("../../models/customerRegisterModel.js")
const Appointment = require("../../models/appointmentsModel.js")

const bcrypt = require("bcrypt")

const crypto = require("crypto");
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');

const { sendVerificationCodeByEmail, sendPasswordResetEmail, bulkEmail } = require("../../utils/emailSender");
// const { sendVerificationCodeToMobile } = require("../../utils/mobileMessageSender");

const JWT_ACCESS_SECRET = "accessToken"
const JWT_REFRESH_SECRET = "refreshToken"


//Upload Profile Picture Config
const path = require("path");
const fs = require('fs');
const Salon = require("../../models/salonsRegisterModel");
const Barber = require("../../models/barberRegisterModel");
const SalonQueueList = require("../../models/salonQueueListModel");
const UserTokenTable = require("../../models/userTokenModel");
const { validateEmail } = require("../../middlewares/validator");
const cloudinary = require('cloudinary').v2


cloudinary.config({
  cloud_name: 'dfrw3aqyp',
  api_key: '574475359946326',
  api_secret: 'fGcEwjBTYj7rPrIxlSV5cubtZPc',
});

//CHECK WEATHER THE EMAIL ALREADY EXISTS IN THE DATABASE-------
const checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
       // Validate email format
       if (!email || !validateEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        });
    }


    //Find existing email for a particular salonId
    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      res.status(200).json({
        success: false,
        response: "This EmailId already exists",
      });
    }
    else {
      res.status(200).json({
        success: true,
        response: email,
      });
    }
  }
  catch (error) {
    console.log(error);
    next(error);
  }
}

// SIGNUP A NEW CUSTOMER WHEN THE NEW EMAIL 
const signUp = async (req, res, next) => {
  try {
    const {
      email,
      name,
      userName,
      gender,
      dateOfBirth,
      mobileNumber,
      password,
    } = req.body;

       // Validate email format
       if (!email || !validateEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        });
    }


    const verificationCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: "Customer with the email already exists",
      });
    }

    //Hashing the Password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Creating the Customer Object
    const customer = new Customer({
      email,
      name,
      userName,
      gender,
      dateOfBirth,
      mobileNumber,
      password: hashedPassword,
      verificationCode,
      customer: true,
    });


    //Saving the Customer
    const savedCustomer = await customer.save();

    //Sending the verification Code to Customer Registered Email
    if (savedCustomer.verificationCode) {
      sendVerificationCodeByEmail(email, verificationCode);
      return res.status(200).json({
        success: true,
        response: 'Customer saved successfully and verification code sent successfully',
      });
    } else {
      return res.status(400).json({
        success: false,
        response: 'Failed to save customer and send verification code',
        message: 'Customer data could not be saved',
      });
    }
  }catch (error) {
    console.log(error);
    next(error);
  }
};


//MATCH VERIFICATION CODE FOR NEW CUSTOMER
const matchVerificationCode = async (req, res, next) => {
  try {
    const { email, verificationCode, webFcmToken, androidFcmToken, iosFcmToken } = req.body;

    // FIND THE CUSTOMER 
    const customer = await Customer.findOne({ email });

    if (customer && customer.verificationCode === verificationCode) {
      // If verification code matches, clear it from the database
      customer.verificationCode = '';
      await customer.save();

      //    // Save FCM Tokens based on the switch-case logic
      // let tokenType, tokenValue;
      // switch (true) {
      //   case !!webFcmToken:
      //     tokenType = 'webFcmToken';
      //     tokenValue = webFcmToken;
      //     break;
      //   case !!androidFcmToken:
      //     tokenType = 'androidFcmToken';
      //     tokenValue = androidFcmToken;
      //     break;
      //   case !!iosFcmToken:
      //     tokenType = 'iosFcmToken';
      //     tokenValue = iosFcmToken;
      //     break;
      //   default:
      //     res.status(201).json({
      //       success: false,
      //       message: "No valid FCM tokens present"
      //     })
      //     break;
      // }

      // if (tokenType && tokenValue) {
      //   await UserTokenTable.findOneAndUpdate(
      //     { email: email },
      //     { [tokenType]: tokenValue, type: "customer" },
      //     { upsert: true, new: true }
      //   );
      // }


      return res.status(200).json({
        success: true,
        response: customer,
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
};

//Save Password
const savePassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await Customer.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!customer) {
      return res.status(201).json({
        success: false,
        message: "Customer not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password saved successfully",
      response: customer
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//-----------SignIn Customer-------------//
const signIn = async (req, res, next) => {
  try {
    const { email, password, webFcmToken, androidFcmToken, iosFcmToken } = req.body;

    const result = await customerService.signInCustomer(email, password);

    //  // Save FCM Tokens based on the switch-case logic
    //  let tokenType, tokenValue;
    //  switch (true) {
    //    case !!webFcmToken:
    //      tokenType = 'webFcmToken';
    //      tokenValue = webFcmToken;
    //      break;
    //    case !!androidFcmToken:
    //      tokenType = 'androidFcmToken';
    //      tokenValue = androidFcmToken;
    //      break;
    //    case !!iosFcmToken:
    //      tokenType = 'iosFcmToken';
    //      tokenValue = iosFcmToken;
    //      break;
    //    default:
    //      res.status(201).json({
    //        success: false,
    //        message: "No valid FCM tokens present"
    //      })
    //      break;
    //  }

    //  if (tokenType && tokenValue) {
    //    await UserTokenTable.findOneAndUpdate(
    //      { email: email },
    //      { [tokenType]: tokenValue, type: "customer" },
    //      { new: true }
    //    );
    //  }


    res.status(result.status).json({
      success: true,
      response: result.response,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//--------Forget Password------//
const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await Customer.findOne({ email });
    if (!user) {
      return res.status(201).json({
        success: false,
        response: "User with this email does not exist. Please register first",
      });
    }

    const verificationCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const emailData = {
      email,
      subject: 'Reset Password Email',
      html: `
        <h2>Hello ${user.name}!</h2>
        <p>Your Password Reset Verification Code is ${verificationCode}</p>
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
      message: `Please check your email (${email}) for resetting the password`,
      verificationCode: verificationCode
    });
  }catch (error) {
    console.log(error);
    next(error);
  }
};

//Verify Password Reset Code
const verifyPasswordResetCode = async (req, res, next) => {
  try {
    const { email, verificationCode, } = req.body;

    const user = await Customer.findOne({ email });

    if (!user) {
      return res.status(201).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.verificationCode === verificationCode) {
      user.verificationCode = '';
      // customer.VerificationCode = ''; // Clear the verification code
      await user.save();

      res.status(200).json({
        success: true,
        message: "Verification Code successfully matched",
        email: email,
      });
    } else {
      // Verification code doesn't match
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Reset Password
const resetPassword = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;

    // Find the user by email (assuming Customer is your Mongoose model for users)
    const user = await Customer.findOne({ email });

    if (!user) {
      return res.status(201).json({
        success: false,
        message: "User with this email does not exist",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Set the user's password to the new hashed password
    user.password = hashedPassword;

    // Save the updated user in the database
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};


const googleLoginControllerCustomer = async (req, res, next) => {
  try {
    const CLIENT_ID = process.env.CLIENT_ID;
    const token = req.body.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "UnAuthorized User or Invalid User" });
    }

    const client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { name, email } = payload;

    let user = await Customer.findOne({ email });

    if (!user) {
      // If the user doesn't exist, create a new user
      user = new Customer({ name, email, customer: true, AuthType: "google" });
      await user.save();
    }

    const accessToken = jwt.sign({ user: { name: user.name, email: user.email } }, JWT_ACCESS_SECRET, { expiresIn: "20s" });
    const refreshToken = jwt.sign({ user: { name: user.name, email: user.email } }, JWT_REFRESH_SECRET, { expiresIn: "10m" });

    res.status(200).json({
      success: true,
      message: "Customer signed in successfully",
      tokens: { accessToken, refreshToken }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to sign in' });
  }
};


//GET ALL CUSTOMER FOR A SALON
const allCustomers = async (req, res) => {
  try {

    const { salonId, name, email, page = 1, limit = 3, sortField, sortOrder } = req.query
    let query = {}

    const searchRegExpName = new RegExp('.*' + name + ".*", 'i')
    const searchRegExpEmail = new RegExp('.*' + email + ".*", 'i')

    if (salonId) {
      query.salonId = salonId
    }

    if (name || email) {
      query.$or = [
        { name: { $regex: searchRegExpName } },
        { email: { $regex: searchRegExpEmail } }
      ];
    }

    const sortOptions = {};
    if (sortField && sortOrder) {
      sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
    }

    const skip = Number(page - 1) * Number(limit)

    const getAllCustomers = await Customer.find(query).sort(sortOptions).skip(skip).limit(Number(limit))

    const totalCustomers = await Customer.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "All Customers fetched successfully",
      getAllCustomers,
      totalPages: Math.ceil(totalCustomers / Number(limit)),
      currentPage: Number(page),
      totalCustomers,
    })

  }
  catch (error) {
    console.log(error);
    next(error);
  }
}

//UPDATE CUSTOMER PROFILE
const updateCustomer = async (req, res, next) => {
  const customerData = req.body;
  try {
    const result = await customerService.updateCustomer(customerData);
    res.status(result.status).json({
      success: true,
      response: result.response,
    });
  }
  catch (error) {
    console.log(error);
    next(error);
  }
}

const deleteSingleCustomer = async (req, res, next) => {
  const { email } = req.body;
  try {
    const result = await customerService.deleteCustomer(email)
    res.status(result.status).json({

      status: result.status,
      response: result.response,
    });
  }
  catch (error) {
    console.log(error);
    next(error);
  }
}


//Sending Mail to Customer
const sendMailToCustomer = async (req, res, next) => {
  const { email, subject, text } = req.body;

  try {
    const result = await customerService.sendMail(email, subject, text);
    res.status(result.status).json({
      success: true,
      response: result.response,
      message: result.message,
    });
  }
  catch (error) {
    console.log(error);
    next(error);
  }

}


//Get Appointments for Customer
const getAppointmentForCustomer = async (req, res, next) => {
  try {
    const { customerEmail } = req.body;

    const customerAppointments = await Appointment.aggregate([
      {
        $match: {
          "appointmentList.customerEmail": customerEmail
        }
      },
      {
        $project: {
          appointments: {
            $filter: {
              input: "$appointmentList",
              as: "appointment",
              cond: {
                $eq: ["$$appointment.customerEmail", customerEmail]
              }
            }
          }
        }
      }
    ]);

    if (customerAppointments.length > 0 && customerAppointments[0].appointments.length > 0) {
      res.status(200).json({ appointments: customerAppointments[0].appointments });
    } else {
      res.status(201).json({ success: false, message: "No appointments found for the customer" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//CUSTOMER CONNECT SALON AFTER LOGIN
const customerConnectSalon = async (req, res, next) => {
  try {
    const { email, salonId } = req.body;

    // Find the Customer by emailId
    const customer = await Customer.findOne({ email });

    // If customer is not found
    if (!customer) {
      return res.status(201).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Check if the salonId is already present in the connectedSalon array
    const salonExists = customer.connectedSalon.includes(salonId);

    if (!salonExists) {
      // If salonId is not present, push it into the connectedSalon array
      customer.connectedSalon.push(salonId);
    }

    // Update the salonId for this connection time
    customer.salonId = salonId;

    // Save the changes
    await customer.save();

    res.status(200).json({
      success: true,
      message: "Customer is added to the salon",
      response: customer,
    });
  }catch (error) {
    console.log(error);
    next(error);
  }
};

//Get Customer Details
const getCustomerDetails = async (req, res, next) => {
  try {
    const { email } = req.body;
    const customer = await Customer.findOne({ email }).select('-password');
    if (!customer) {
      return res.status(201).json({
        success: false,
        message: "Customer not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Customer details found successfully",
      response: customer,
    });
  }
  catch (error) {
    console.log(error);
    next(error);
  }
}

//Bulk Send Email to Customers
const sendBulkEmailToCustomers = async (req, res, next) => {
  try {
    const { subject, message, recipientEmails } = req.body;

    // Check if subject, message, and recipientEmails are present in the request body
    if (!subject || !message || !recipientEmails || !Array.isArray(recipientEmails) || recipientEmails.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide subject, message, and a valid array of recipientEmails in the request body.',
      });
    }

    // Call your bulk email function here passing subject, message, and recipientEmails
    await bulkEmail(subject, message, recipientEmails);

    res.status(200).json({
      success: true,
      message: 'Emails have been sent successfully to customers',
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Upload Customer profile Picture
const uploadCustomerprofilePic = async (req, res, next) => {
  try {
    let profiles = req.files.profile;
    const email = req.body.email;

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
            .catch ((error) => {
              console.log(error);
              next(error);
            }
            )
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

        const customerImage = await Customer.findOneAndUpdate({ email }, { profile: profileimg }, { new: true });

        res.status(200).json({
          success: true,
          message: "Files Uploaded successfully",
          customerImage
        });
      })
      .catch ((error)  => {
        console.log(error);
        next(error);
      }
      );
  } catch (error) {
    console.log(error);
    next(error);
  }
}

//Update Barber Profile Picture
const updateCustomerProfilePic = async (req, res, next) => {
  try {
    const id = req.body.id;

    const customerProfile = await Customer.findOne({ "profile._id": id }, { "profile.$": 1 })

    const public_imgid = req.body.public_imgid;
    const profile = req.files.profile;

    // Validate Image
    const fileSize = profile.size / 1000;
    const fileExt = profile.name.split(".")[1];

    if (fileSize > 500) {
      return res.status(400).json({ message: "File size must be lower than 500kb" });
    }

    if (!["jpg", "png", "jfif", "svg"].includes(fileExt)) {
      return res.status(400).json({ message: "File extension must be jpg or png" });
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

        const updatedAdmin = await Customer.findOneAndUpdate(
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

//Delete Barber Profile Picture
const deleteCustomerProfilePicture = async (req, res, next) => {
  try {
    const public_id = req.body.public_id
    const img_id = req.body.img_id

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === 'ok') {
      console.log("cloud img deleted")

    } else {
      res.status(500).json({ message: 'Failed to delete image.' });
    }

    const updatedAdmin = await Customer.findOneAndUpdate(
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
      res.status(201).json({ success: false, message: 'Image not found in the student profile' });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// Get All Appointments by Customers
const getAllAppointmentsByCustomer = async (req, res, next) => {
  try {
    const { customerEmail, salonId } = req.body;

    // Check if customerEmail and salonId are provided
    if (!customerEmail || !salonId) {
      return res.status(400).json({
        success: false,
        message: 'Both customerEmail and salonId are required.'
      });
    }

    // Find appointments based on customerEmail and salonId
    const appointments = await Appointment.find({
      salonId: salonId,
      'appointmentList.customerEmail': customerEmail,
    });

    if (!appointments || appointments.length === 0) {
      return res.status(201).json({
        success: false,
        message: 'No appointments found for this customer.'
      });
    }

    // Return the found appointments
    res.status(200).json({
      success: true,
      message: "Appointments Found for the Customer",
      response: appointments
    });
  }catch (error) {
    console.log(error);
    next(error);
  }
};

//Get All Connected Salons by Customer
const getAllSalonsByCustomer = async (req, res, next) => {
  try {
    const { customerEmail } = req.body; // Assuming customer's email is provided in the request body

    // Find the admin based on the email
    const customer = await Customer.findOne({ email: customerEmail });

    if (!customer) {
      return res.status(201).json({
        success: false,
        message: 'Customer not found',
      });
    }

    // Fetch all salons associated with the admin from registeredSalons array
    const salons = await Salon.find({
      salonId: { $in: customer.connectedSalon },
      isDeleted: false,
    });

    res.status(200).json({
      message: 'Salons retrieved successfully',
      response: salons,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

//Change Salon Id of Customer
const changeDefaultSalonIdOfCustomer = async (req, res, next) => {
  try {
    const { customerEmail, salonId } = req.body; // Assuming admin's email and new salonId are provided in the request body

    // Find the admin based on the provided email
    const customer = await Customer.findOne({ email: customerEmail });

    console.log(customer)
    if (!customer) {
      return res.status(201).json({
        success: false,
        message: 'Customer not found',
      });
    }

    // Update the default salonId of the admin
    customer.salonId = salonId;
    await customer.save();

    res.status(200).json({
      message: 'Default salon ID of admin updated successfully',
      response: customer,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Customer Dashboard Api
const customerDashboard = async (req, res, next) => {
  const { salonId } = req.body;
  try {
    // Find salon information by salonId
    const salonInfo = await Salon.findOne({ salonId, isOnline: true }).select("isOnline salonName salonLogo");

    if (!salonInfo) {
      res.status(201).json({
        success: false,
        message: 'No salons found for the particular SalonId.',
      });
    }

    // Find associated barbers using salonId
    const barbers = await Barber.find({ salonId, isOnline: true }).select("name queueCount profile barberEWT");
    const barberCount = barbers.length;

    let barberWithLeastQueues = null;
    let minQueueCount = Number.MAX_VALUE;

    let barberWithLeastEWT = null;
    let minEWt = Number.MAX_VALUE;

    barbers.forEach(barber => {
      if (barber.queueCount < minQueueCount) {
        minQueueCount = barber.queueCount;
        barberWithLeastQueues = barber;
      }
      if (barber.barberEWT < minEWt) {
        minEWt = barber.barberEWT;
        barberWithLeastEWT = barber;
      }
    });


    // Find queues associated with the salonId
    const salonQueues = await SalonQueueList.find({ salonId });

    let totalQueueCount = 0;

    // Calculate total queue count for the salon
    salonQueues.forEach(queue => {
      totalQueueCount += queue.queueList.length;
    });

    res.status(200).json({
      success: true,
      message: 'Salon and barbers found successfully.',
      response: {
        salonInfo: salonInfo,
        barbers: barbers,
        barberOnDuty: barberCount,
        totalQueueCount: totalQueueCount,
        leastQueueCount: minQueueCount,
        leastBarberEWT: minEWt
      },
    });
  }catch (error) {
    console.log(error);
    next(error);
  }
}

const customerFavoriteSalon = async (req, res, next) => {
  try {
    const { email, salonId } = req.body;

    // Find the Customer by emailId
    const customer = await Customer.findOne({ email });

    // If customer is not found
    if (!customer) {
      return res.status(201).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Check if the salonId is already present in the connectedSalon array
    const salonExists = customer.favoriteSalons.includes(salonId);

    if (!salonExists) {
      // If salonId is not present, push it into the connectedSalon array
      customer.favoriteSalons.push(salonId);

      // Save the changes
      await customer.save();
      res.status(200).json({
        success: true,
        message: "Your favourite salon is added successfully",
        response: customer,
      });
    }
    else{
      res.status(200).json({
        success: true,
        message: "Your favourite salon is already added",
      });
    }

  }catch (error) {
    console.log(error);
    next(error);
  }
}

const getAllCustomerFavoriteSalons = async(req, res, next) => {
  try {
    const { customerEmail } = req.body; // Assuming customer's email is provided in the request body

    // Find the admin based on the email
    const customer = await Customer.findOne({ email: customerEmail });

    if (!customer) {
      return res.status(201).json({
        success: false,
        message: 'Customer not found',
      });
    }

    // Fetch all salons associated with the admin from registeredSalons array
    const salons = await Salon.find({
      salonId: { $in: customer.favoriteSalons },
      isDeleted: false,
    }).select("salonName");

    res.status(200).json({
      message: 'Salons retrieved successfully',
      response: salons,
    });
  }catch (error) {
    console.log(error);
    next(error);
  }
}

const deleteCustomerFavoriteSalon = async (req, res, next) => {
  try {
    const { email, salonId } = req.body;

    // Find the Customer by emailId
    const customer = await Customer.findOne({ email });

    // If customer is not found
    if (!customer) {
      return res.status(201).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Check if the salonId is already present in the favoriteSalons array
    const salonExists = customer.favoriteSalons.includes(salonId);

    if (!salonExists) {
      // If salonId is not present, respond accordingly
      res.status(200).json({
        success: true,
        message: "The salon is not in your favorites.",
      });
    } else {
      // If salonId is present, remove it from the favoriteSalons array
      customer.favoriteSalons.pull(salonId);

      // Save the changes
      await customer.save();

      res.status(200).json({
        success: true,
        message: "The salon has been removed from your favorites successfully.",
        response: customer,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  signUp,
  signIn,
  forgetPassword,
  resetPassword,
  allCustomers,
  deleteSingleCustomer,
  updateCustomer,
  sendMailToCustomer,
  checkEmail,
  matchVerificationCode,
  getAppointmentForCustomer,
  customerConnectSalon,
  googleLoginControllerCustomer,
  verifyPasswordResetCode,
  getCustomerDetails,
  savePassword,
  sendBulkEmailToCustomers,
  uploadCustomerprofilePic,
  updateCustomerProfilePic,
  deleteCustomerProfilePicture,
  getAllAppointmentsByCustomer,
  getAllSalonsByCustomer,
  changeDefaultSalonIdOfCustomer,
  customerDashboard,
  customerFavoriteSalon,
  getAllCustomerFavoriteSalons,
  deleteCustomerFavoriteSalon
}