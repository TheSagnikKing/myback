const Barber = require("../../models/barberRegisterModel.js")
const Salon = require("../../models/salonsRegisterModel.js")

const bcrypt = require("bcrypt")


const insertBarberDetails = async (barberData) => {
    const { email, name, isActive, userName, mobileNumber, dateOfBirth } = barberData

    try {
        const existingBarber = await Barber.findOne({ email })

        if (existingBarber) {
            const firstTwoLetters = name.slice(0, 2).toUpperCase();
            const barberCode = firstTwoLetters + existingBarber.barberId;

            existingBarber.name = name;
            existingBarber.barberCode = barberCode;
            existingBarber.isActive = isActive;
            existingBarber.userName = userName;
            existingBarber.mobileNumber = mobileNumber;
            existingBarber.dateOfBirth = dateOfBirth;
            // existingBarber.salonId = salonId;
            existingBarber.barberServices = barberServices;

            const updatedBarber = await existingBarber.save();
            return {
                status: 200,
                message: 'Barber details updated successfully',
                response: updatedBarber,
            };
        } else {
            return {
                status: 201,
                message: 'Barber not found',
            };
        }
    }

    catch (error) {
        console.log(error.message)
        return {
            status: 500,
            message: error.message,
        };
    }
}

const getBarberbyId = async(barberId)=>{
   const barber = await Barber.findOne({ barberId: barberId });
   return barber;
}

//Update Barber By Email
const updateBarberByEmail = async (barberData) => {

    const { name, email, nickName, mobileNumber, dateOfBirth, gender, password } = barberData
    try {
        //Creating an object other than the password field 
        let updateFields = {
            name,
            nickName,
            gender,
            dateOfBirth,
            mobileNumber,
        };

        //Checking if password is provided then adding the password to the created document
        if (password) {
            // Hashing the password if provided
            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.password = hashedPassword;
        }


        //Updating the Barber Document
        const barber = await Barber.findOneAndUpdate({ email: email }, updateFields, { new: true }).select("-password");

        // Generating the barberCode based on the updated name and existing barberId
        const firstTwoLetters = name.slice(0, 2).toUpperCase();
        const updatedBarberCode = firstTwoLetters + barber.barberId;

        // Updating the barberCode in the database
        await Barber.findOneAndUpdate({ email: email }, { barberCode: updatedBarberCode }, { new: true });


        return {
            status: 200,
            response: barber,
        }
    }
    catch (error) {
        console.log(error.message)
        return {
            status: 500,
            message: error.message,
        };

    }
}

//Delete Barber
const deleteBarberByEmail = async (salonId, email) => {
    try {
        const deleteBarber = await Barber.findOneAndUpdate({ salonId: salonId, email: email }, { isDeleted: true }, { new: true });

        return {
            status: 200,
            response: deleteBarber,
        }
    }
    catch (error) {
        console.log(error.message)
        return {
            status: 500,
            message: error.message,
        };
    }
}

module.exports = {
    insertBarberDetails,
    // getAllBarbersBySalonId,
    updateBarberByEmail,
    deleteBarberByEmail,
    // addBarberServices,
    getBarberbyId
}
