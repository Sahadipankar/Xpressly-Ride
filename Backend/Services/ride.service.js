const rideModel = require('../Models/ride.model');
const mapService = require('./maps.service');
const bcrypt = require('bcrypt');   // For hashing passwords, if needed in the future
const crypto = require('crypto');   // For generating OTPs



async function getFare(pickup, destination) {

    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
        Car: 30,
        Auto: 15,
        Moto: 10
    };

    const perKmRate = {
        Car: 10,
        Auto: 8,
        Moto: 5
    };

    const perMinuteRate = {
        Auto: 2,
        Car: 3,
        Moto: 1.5
    };


    const fare = {
        Auto: Math.round(baseFare.Auto + ((distanceTime.distance.value / 1000) * perKmRate.Auto) + ((distanceTime.duration.value / 60) * perMinuteRate.Auto)),
        Car: Math.round(baseFare.Car + ((distanceTime.distance.value / 1000) * perKmRate.Car) + ((distanceTime.duration.value / 60) * perMinuteRate.Car)),
        Moto: Math.round(baseFare.Moto + ((distanceTime.distance.value / 1000) * perKmRate.Moto) + ((distanceTime.duration.value / 60) * perMinuteRate.Moto))
    };

    return fare;
}

module.exports.getFare = getFare;


function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}



module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);



    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType]
    })

    return ride;
}



module.exports.confirmRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }
    return ride;
}


module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}



module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}