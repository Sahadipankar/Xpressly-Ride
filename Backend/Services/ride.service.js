const rideModel = require('../Models/ride.model');
const mapService = require('./maps.service');


async function getFare(pickup, destination) {

    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
        Auto: 30,
        Car: 50,
        Moto: 20
    };

    const perKmRate = {
        Auto: 10,
        Car: 15,
        Moto: 8
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
        fare: fare[vehicleType]
    })

    return ride;
}
