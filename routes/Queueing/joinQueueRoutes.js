const express = require("express")
const { singleJoinQueue, groupJoinQueue, getQueueListBySalonId, autoJoin, barberServedQueue, getAvailableBarbersForQ, getBarberByMultipleServiceId, getQlistbyBarberId, cancelQueue, sendQSms, getQhistoryByCustomerEmail } = require("../../controllers/Queueing/joinQueueController")
const verifyRefreshTokenAdmin = require("../../middlewares/Admin/VerifyRefreshTokenAdmin.js")
const verifyRefreshTokenBarber = require("../../middlewares/Barber/VerifyRefreshTokenBarber.js")

const router = express.Router()

//Single Join
router.route("/singleJoinQueue").post(verifyRefreshTokenAdmin,singleJoinQueue)

//Group Join
router.route("/groupJoinQueue").post(verifyRefreshTokenAdmin,groupJoinQueue)

//getQListBySalonId
router.route("/getQListBySalonId").get(verifyRefreshTokenAdmin,getQueueListBySalonId)

//Auto Join
router.route("/autoJoin").post(verifyRefreshTokenAdmin,autoJoin),

//==============================================//

//Get Available Barbers for Queue
router.route("/getAvailableBarbersForQ").post(verifyRefreshTokenAdmin, getAvailableBarbersForQ)

//Get Barber By Multiple ServiceId
router.route("/getBarberByMultipleServiceId").post(verifyRefreshTokenAdmin, getBarberByMultipleServiceId)

//Get Q list by BarberId
router.route("/getQlistByBarberId").post(verifyRefreshTokenBarber, getQlistbyBarberId)

//Cancel Q List
router.route("/cancelQ").post(cancelQueue)

//Get Q History
router.route("/getQhistory").post(getQhistoryByCustomerEmail)

module.exports = router