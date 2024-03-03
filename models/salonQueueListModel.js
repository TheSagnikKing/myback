const mongoose = require("mongoose")

const salonQueueListSchema = new mongoose.Schema({
    // id:{
    //     type: Number,
    //     required: true
    // },
    salonId: {
        type: Number,
        required: true
    },

    queueList: [{
        position: {
            type: Number,
        },
        customerName: {
            type: String,
            // required: true
        },
        customerEmail: {
            type: String
        },
        mobileNumber:{
            type: Number
        },
        joinedQ: {
            type: Boolean
        },

        joinedQType: {
            type: String,
            enum: ['Single-Join', 'Group-Join', 'Auto-Join']
        },
        dateJoinedQ: {
            type: Date
        },
        timeJoinedQ: {
            type: String
        },
        timePositionChanged: {
            type: String
        },
        loggedIn: {
            type: Boolean
        },
        methodUsed: {
            type: String,
            enum: ['Walk-In', 'Admin', 'App']
        },
        barberName: {
            type: String
        },
        forceUpdate: {
            type: Boolean
        },
        qgCode: {
            type: String
        },
        qPosition: {
            type: Number
        },
        positionChangedMessageShown: {
            type: Boolean
        },
        logNo: {
            type: String
        },
        lineCreated: {
            type: String
        },
        barberId: {
            type: Number
        },
        serviceId: {
            type: String
        },
        serviceName: {
            type: String
        },
        serviceEWT: {
            type: Number
        },
        customerEWT: {
            type: Number
        },
        status:{
            type: String
        },
        localLineId: {
            type: Number
        }
    }]

}, { timestamps: true })

const SalonQueueList = mongoose.model("SalonQueueList", salonQueueListSchema)

module.exports = SalonQueueList

