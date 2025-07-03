import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../Context/SocketContext'
import LiveTracking from '../Components/LiveTracking'
import axios from 'axios'


const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {}
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()
    const [rideStartTime] = useState(new Date())
    const [currentTime, setCurrentTime] = useState(new Date())
    const [paymentMethod, setPaymentMethod] = useState('cash')
    const [isRideCompleted, setIsRideCompleted] = useState(false)
    const [isWaitingForDriver, setIsWaitingForDriver] = useState(false)
    const [tripData, setTripData] = useState({
        remainingDistance: null,
        estimatedArrival: null,
        originalDistance: null,
        originalDuration: null,
        distanceInKm: null,
        averageSpeed: null,
        currentSpeed: null,
        trafficCondition: 'normal',
        trafficIncidents: [],
        routeAlerts: [],
        alternativeRoutes: 0,
        trafficDelay: 0,
        speedTrend: 'stable'
    })
    const [isLoadingTripData, setIsLoadingTripData] = useState(true)
    const [trafficAlerts, setTrafficAlerts] = useState([])
    const [showTrafficDetails, setShowTrafficDetails] = useState(true)
    const [lastUpdate, setLastUpdate] = useState(Date.now())    // Fetch initial trip data
    useEffect(() => {
        const fetchTripData = async () => {
            if (ride?.pickup && ride?.destination) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
                        params: { pickup: ride.pickup, destination: ride.destination },
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    })

                    const distanceInKm = response.data.distance.value / 1000
                    const durationInSeconds = response.data.duration.value
                    const calculatedAvgSpeed = (distanceInKm / (durationInSeconds / 3600)).toFixed(1)

                    setTripData({
                        remainingDistance: response.data.distance.text,
                        estimatedArrival: new Date(Date.now() + durationInSeconds * 1000),
                        originalDistance: response.data.distance.text,
                        originalDuration: durationInSeconds,
                        distanceInKm: distanceInKm,
                        averageSpeed: calculatedAvgSpeed,
                        currentSpeed: parseFloat(calculatedAvgSpeed), // Initialize current speed
                        trafficCondition: determineTrafficCondition(durationInSeconds, distanceInKm),
                        trafficIncidents: generateTrafficIncidents(determineTrafficCondition(durationInSeconds, distanceInKm)),
                        routeAlerts: generateRouteAlerts(determineTrafficCondition(durationInSeconds, distanceInKm)),
                        alternativeRoutes: Math.floor(Math.random() * 3) + 1
                    })
                } catch (error) {
                    // Fallback values - calculate dynamic average based on distance and duration
                    const fallbackDistance = 3.2
                    const fallbackDuration = 720 // seconds
                    const fallbackAvgSpeed = (fallbackDistance / (fallbackDuration / 3600)).toFixed(1)

                    setTripData({
                        remainingDistance: '3.2 km',
                        estimatedArrival: new Date(Date.now() + 12 * 60000),
                        originalDistance: '3.2 km',
                        originalDuration: 720,
                        distanceInKm: 3.2,
                        averageSpeed: fallbackAvgSpeed,
                        currentSpeed: parseFloat(fallbackAvgSpeed), // Initialize current speed
                        trafficCondition: 'normal',
                        trafficIncidents: generateTrafficIncidents('normal'),
                        routeAlerts: generateRouteAlerts('normal'),
                        alternativeRoutes: 2
                    })
                }
                setIsLoadingTripData(false)
            }
        }

        fetchTripData()
    }, [ride])

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])    // Enhanced dynamic trip updates with comprehensive traffic simulation
    useEffect(() => {
        const updateTripProgress = () => {
            if (tripData.originalDuration && !isRideCompleted) {
                const elapsedTime = (currentTime - rideStartTime) / 1000 // seconds
                const progressPercentage = Math.min(elapsedTime / tripData.originalDuration, 1)

                // More realistic distance calculation with GPS simulation
                const baseDistance = tripData.distanceInKm || 3.2
                const remainingKm = Math.max(baseDistance * (1 - progressPercentage), 0.05)

                // Advanced traffic simulation
                const trafficMultiplier = simulateTrafficConditions()

                // Dynamic base speed based on vehicle type and conditions
                const vehicleType = ride?.captain?.vehicle?.vehicleType?.toLowerCase()
                let baseSpeed = 25 // Default base speed

                switch (vehicleType) {
                    case 'motorcycle':
                    case 'moto':
                        baseSpeed = 35 // Motorcycles are generally faster
                        break
                    case 'car':
                        baseSpeed = 30 // Cars have good speed
                        break
                    case 'auto':
                        baseSpeed = 20 // Auto-rickshaws are slower
                        break
                }

                // Apply traffic conditions with enhanced multipliers
                let adjustedSpeed = baseSpeed / trafficMultiplier

                // Adventure/high-speed scenarios enhancement - increased frequency
                const isAdventureMode = Math.random() < 0.25 // 25% chance for adventure (increased from 8%)
                if (isAdventureMode && trafficMultiplier < 1.0) {
                    // Highway/expressway scenario - significant speed boost
                    const adventureBoost = 2.0 + Math.random() * 1.5 // 200-350% boost (increased)
                    adjustedSpeed *= adventureBoost
                }

                // Additional dynamic factors for realism
                const roadConditionFactor = 0.8 + (Math.random() * 0.4) // 0.8 to 1.2
                const driverBehaviorFactor = 0.9 + (Math.random() * 0.2) // 0.9 to 1.1
                const weatherFactor = Math.random() > 0.85 ? 0.7 : 1.0 // 15% chance of weather impact

                // Calculate current speed with all factors
                let currentSpeed = adjustedSpeed * roadConditionFactor * driverBehaviorFactor * weatherFactor

                // Apply vehicle speed limits - increased caps
                let maxSpeedCap = 120 // Increased default
                switch (vehicleType) {
                    case 'motorcycle':
                    case 'moto':
                        maxSpeedCap = 200 // Increased significantly
                        break
                    case 'car':
                        maxSpeedCap = 180 // Increased significantly  
                        break
                    case 'auto':
                        maxSpeedCap = 100 // Increased from 80
                        break
                }

                currentSpeed = Math.max(Math.min(currentSpeed, maxSpeedCap), 5)

                // Calculate dynamic ETA based on current speed and conditions
                const timeToDestination = (remainingKm / currentSpeed) * 3600 // seconds

                // Enhanced traffic delay calculation
                let trafficDelayBuffer = 0
                if (trafficMultiplier > 1.2) {
                    trafficDelayBuffer = (trafficMultiplier - 1) * 200 // Heavy traffic delays
                } else if (trafficMultiplier < 0.8) {
                    trafficDelayBuffer = -60 // Light traffic time savings
                }

                const randomBuffer = Math.random() * 90 + 30 // 30-120 seconds buffer
                const adjustedETA = Math.max(timeToDestination + trafficDelayBuffer + randomBuffer, 60)

                // Determine traffic condition with enhanced granularity
                let trafficCondition = 'normal'
                if (currentSpeed < 8) trafficCondition = 'severe'
                else if (currentSpeed < 15) trafficCondition = 'heavy'
                else if (currentSpeed < 25) trafficCondition = 'moderate'
                else if (currentSpeed > 60) trafficCondition = 'light' // Lowered threshold for light traffic

                // Calculate dynamic trip average speed
                const tripElapsedTime = elapsedTime / 3600 // hours
                const distanceTraveled = baseDistance - remainingKm
                let dynamicAvgSpeed = tripElapsedTime > 0 ? (distanceTraveled / tripElapsedTime) : currentSpeed

                // Smooth the average speed changes to avoid jumps
                const previousAvgSpeed = parseFloat(tripData.averageSpeed) || currentSpeed
                dynamicAvgSpeed = (previousAvgSpeed * 0.7) + (dynamicAvgSpeed * 0.3) // 70-30 smoothing

                // Calculate dynamic traffic delay
                const expectedSpeed = baseSpeed * 1.2
                const trafficDelay = Math.max(0, Math.round(((expectedSpeed - currentSpeed) / expectedSpeed) * 8))

                // Determine speed trend
                const speedTrend = tripData.currentSpeed ?
                    (currentSpeed > tripData.currentSpeed ? 'increasing' :
                        currentSpeed < tripData.currentSpeed ? 'decreasing' : 'stable') : 'stable'

                // Enhanced traffic alert generation with real-time sync
                if (trafficCondition === 'heavy' || trafficCondition === 'severe') {
                    setTrafficAlerts(prev => {
                        const newAlert = {
                            id: Date.now(),
                            message: `${trafficCondition === 'severe' ? 'Severe' : 'Heavy'} traffic detected - ETA updated (+${trafficDelay} min)`,
                            type: 'warning',
                            timestamp: new Date(),
                            autoRemove: true,
                            trafficSync: true // Mark as traffic-synced alert
                        }
                        return [...prev.slice(-2), newAlert]
                    })
                } else if (trafficCondition === 'light' && currentSpeed > 70) {
                    // Add positive alerts for high-speed conditions
                    if (Math.random() > 0.8) {
                        setTrafficAlerts(prev => {
                            const newAlert = {
                                id: Date.now(),
                                message: `Great driving conditions - ${currentSpeed} km/h! ETA improved`,
                                type: 'success',
                                timestamp: new Date(),
                                autoRemove: true,
                                trafficSync: true
                            }
                            return [...prev.slice(-2), newAlert]
                        })
                    }
                }

                // Force update incidents when traffic condition changes significantly
                const shouldForceUpdate = !tripData.trafficCondition ||
                    (tripData.trafficCondition !== trafficCondition &&
                        Math.abs(['severe', 'heavy', 'moderate', 'normal', 'light'].indexOf(trafficCondition) -
                            ['severe', 'heavy', 'moderate', 'normal', 'light'].indexOf(tripData.trafficCondition)) > 0)

                setTripData(prev => ({
                    ...prev,
                    remainingDistance: `${remainingKm.toFixed(1)} km`,
                    estimatedArrival: new Date(Date.now() + adjustedETA * 1000),
                    averageSpeed: dynamicAvgSpeed.toFixed(1),
                    trafficCondition: trafficCondition,
                    currentSpeed: Math.round(currentSpeed),
                    trafficDelay: trafficDelay,
                    speedTrend: speedTrend,
                    // Force update incidents when traffic condition changes or random update
                    ...(shouldForceUpdate || Math.random() > 0.5 ? {
                        trafficIncidents: generateTrafficIncidents(trafficCondition),
                        routeAlerts: generateRouteAlerts(trafficCondition)
                    } : {}),
                    // Always update last sync timestamp for better coordination
                    lastSync: Date.now()
                }))

                setLastUpdate(Date.now())
            }
        }

        const intervalId = setInterval(updateTripProgress, 2500) // Faster updates for more dynamic feel
        return () => clearInterval(intervalId)
    }, [currentTime, rideStartTime, tripData.originalDuration, tripData.distanceInKm, isRideCompleted, ride])

    useEffect(() => {
        socket.on("ride-ended", () => {
            setIsRideCompleted(true)
            setTimeout(() => navigate('/home'), 2000)
        })

        // Listen for captain acknowledgment of completion request
        socket.on("ride-completion-acknowledged", () => {
            // Captain has received the completion request
        })

        return () => {
            socket.off("ride-ended")
            socket.off("ride-completion-acknowledged")
        }
    }, [socket, navigate])

    // Auto-remove traffic alerts
    useEffect(() => {
        const timer = setInterval(() => {
            setTrafficAlerts(prev => prev.filter(alert =>
                !alert.autoRemove || (new Date() - alert.timestamp) < 8000
            ))
        }, 3000)
        return () => clearInterval(timer)
    }, [])

    // Handle complete ride button click
    const handleCompleteRide = async () => {
        try {
            setIsWaitingForDriver(true)

            // Notify the captain that the user wants to complete the ride
            socket.emit('user-complete-ride-request', {
                rideId: ride._id,
                paymentMethod: paymentMethod
            })

        } catch (error) {
            setIsWaitingForDriver(false)
        }
    }

    // Generate realistic traffic incidents with condition-based logic
    const generateTrafficIncidents = (currentCondition = 'normal') => {
        const incidents = [
            { type: 'construction', message: 'Road work ahead - expect delays', severity: 'moderate', icon: 'ri-hammer-line' },
            { type: 'accident', message: 'Minor accident cleared - traffic resuming', severity: 'light', icon: 'ri-alarm-warning-line' },
            { type: 'congestion', message: 'Heavy traffic on main route', severity: 'heavy', icon: 'ri-traffic-light-line' },
            { type: 'event', message: 'Local event causing increased traffic', severity: 'moderate', icon: 'ri-calendar-event-line' },
            { type: 'weather', message: 'Light rain affecting visibility', severity: 'light', icon: 'ri-rainy-line' },
            { type: 'highway', message: 'Entering highway - high speed zone', severity: 'adventure', icon: 'ri-roadster-line' },
            { type: 'express', message: 'Clear expressway - optimal driving conditions', severity: 'adventure', icon: 'ri-rocket-line' },
            { type: 'scenic', message: 'Beautiful scenic route - enjoy the journey', severity: 'adventure', icon: 'ri-landscape-line' }
        ]

        // Strict condition-based incident selection for perfect sync
        let selectedIncidents = []

        if (currentCondition === 'severe') {
            // Only show severe traffic incidents
            selectedIncidents = incidents.filter(inc => inc.severity === 'heavy').slice(0, 2)
        } else if (currentCondition === 'heavy') {
            // Show heavy and moderate traffic incidents
            selectedIncidents = incidents.filter(inc => inc.severity === 'heavy' || inc.severity === 'moderate').slice(0, Math.floor(Math.random() * 2) + 1)
        } else if (currentCondition === 'moderate') {
            // Show moderate traffic incidents
            selectedIncidents = incidents.filter(inc => inc.severity === 'moderate').slice(0, 1)
        } else if (currentCondition === 'light') {
            // Only show adventure/positive incidents for light traffic
            selectedIncidents = incidents.filter(inc => inc.severity === 'adventure').slice(0, Math.floor(Math.random() * 2) + 1)
        } else {
            // Normal traffic - show light incidents or none
            const lightIncidents = incidents.filter(inc => inc.severity === 'light')
            selectedIncidents = Math.random() > 0.6 ? [lightIncidents[Math.floor(Math.random() * lightIncidents.length)]] : []
        }

        return selectedIncidents
    }

    // Generate route alerts with condition-based logic
    const generateRouteAlerts = (currentCondition = 'normal') => {
        const alerts = [
            { type: 'faster_route', message: 'Faster route available - save 3 min', icon: 'ri-direction-line', action: 'Switch Route' },
            { type: 'toll', message: 'Toll road ahead - ₹25', icon: 'ri-coin-line', action: 'View Details' },
            { type: 'fuel', message: 'Fuel station nearby', icon: 'ri-gas-station-line', action: 'Add Stop' },
            { type: 'express', message: 'Express highway available - faster journey', icon: 'ri-roadster-line', action: 'Take Express' },
            { type: 'adventure', message: 'Scenic route available - enjoy the view', icon: 'ri-landscape-line', action: 'Take Scenic' },
            { type: 'speed', message: 'High-speed zone ahead - buckle up!', icon: 'ri-rocket-line', action: 'Continue' }
        ]

        // Condition-based alert selection for better sync
        let selectedAlerts = []

        if (currentCondition === 'heavy' || currentCondition === 'severe') {
            // Show alternative route options during heavy traffic
            const trafficAlerts = alerts.filter(alert => alert.type === 'faster_route' || alert.type === 'express')
            selectedAlerts = Math.random() > 0.4 ? [trafficAlerts[Math.floor(Math.random() * trafficAlerts.length)]] : []
        } else if (currentCondition === 'light') {
            // Show adventure/speed alerts during light traffic
            const lightTrafficAlerts = alerts.filter(alert => alert.type === 'adventure' || alert.type === 'speed')
            selectedAlerts = Math.random() > 0.3 ? [lightTrafficAlerts[Math.floor(Math.random() * lightTrafficAlerts.length)]] : []
        } else {
            // Random selection for normal traffic with condition awareness
            const chanceMultiplier = currentCondition === 'moderate' ? 0.8 : 1.0
            if (Math.random() > (0.7 / chanceMultiplier)) {
                selectedAlerts = [alerts[Math.floor(Math.random() * alerts.length)]]
            }
        }

        return selectedAlerts
    }

    // Enhanced traffic simulation with real-world factors and adventure scenarios
    const simulateTrafficConditions = () => {
        const currentHour = new Date().getHours()
        const currentMinute = new Date().getMinutes()
        const dayOfWeek = new Date().getDay() // 0 = Sunday, 6 = Saturday

        // Base traffic factors
        let trafficMultiplier = 1.0

        // Time-based traffic patterns
        if ((currentHour >= 7 && currentHour <= 10) || (currentHour >= 17 && currentHour <= 20)) {
            trafficMultiplier = 1.5 // Rush hour
        } else if (currentHour >= 22 || currentHour <= 6) {
            trafficMultiplier = 0.7 // Night time - often clearer roads

            // Late night adventure scenarios (higher chance of light traffic)
            if (currentHour >= 23 || currentHour <= 5) {
                trafficMultiplier = Math.random() > 0.7 ? 0.4 : 0.6 // Very light traffic for adventure
            }
        } else if (currentHour >= 11 && currentHour <= 14) {
            trafficMultiplier = 1.2 // Lunch hour
        } else if (currentHour >= 15 && currentHour <= 16) {
            // Early afternoon - good driving conditions
            trafficMultiplier = 0.8
        }

        // Weekend vs weekday
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            trafficMultiplier *= 0.8 // Weekends generally lighter

            // Weekend highway scenarios (better for high speeds)
            if ((currentHour >= 10 && currentHour <= 12) || (currentHour >= 14 && currentHour <= 16)) {
                trafficMultiplier *= Math.random() > 0.6 ? 0.7 : 0.9 // Even lighter weekend traffic
            }
        }

        // Weather simulation (20% chance of weather impact)
        const weatherImpact = Math.random() > 0.8 ? 1.3 : 1.0

        // Event simulation (10% chance of special events)
        const eventImpact = Math.random() > 0.9 ? 1.4 : 1.0

        // Highway/expressway simulation (30% chance of highway conditions - increased)
        const isHighwayRoute = Math.random() < 0.30
        if (isHighwayRoute && trafficMultiplier < 1.0) {
            trafficMultiplier *= 0.4 // Even better conditions on highways (improved)
        }

        // Adventure route scenarios (20% chance - significantly increased)
        const isAdventureRoute = Math.random() < 0.20
        if (isAdventureRoute) {
            trafficMultiplier *= 0.3 // Clear roads for adventure (improved)
        }

        return trafficMultiplier * weatherImpact * eventImpact
    }

    // Enhanced helper function to determine traffic condition
    const determineTrafficCondition = (duration, distance, currentSpeedOverride = null) => {
        const avgSpeed = currentSpeedOverride || (distance / (duration / 3600)) // km/h

        // More granular traffic condition determination favoring higher speeds
        if (avgSpeed < 10) return 'severe'
        if (avgSpeed < 20) return 'heavy'
        if (avgSpeed < 35) return 'moderate'
        if (avgSpeed > 60) return 'light' // Lowered from 50 to get light traffic more often
        return 'normal'
    }

    // Get traffic condition color and icon with enhanced speed ranges
    const getTrafficInfo = () => {
        const currentSpeed = getCurrentSpeed()

        switch (tripData.trafficCondition) {
            case 'light':
                if (currentSpeed > 100) {
                    return { color: 'text-purple-600', bgColor: 'bg-purple-50', icon: 'ri-rocket-2-line', text: 'Super High Speed', intensity: '●●●●●' }
                } else if (currentSpeed > 70) {
                    return { color: 'text-green-600', bgColor: 'bg-green-50', icon: 'ri-rocket-line', text: 'High Speed Zone', intensity: '●●●●' }
                }
                return { color: 'text-green-600', bgColor: 'bg-green-50', icon: 'ri-speed-up-line', text: 'Light Traffic', intensity: '●○○○' }
            case 'moderate':
                return { color: 'text-yellow-600', bgColor: 'bg-yellow-50', icon: 'ri-speed-line', text: 'Moderate Traffic', intensity: '●●○○' }
            case 'heavy':
                return { color: 'text-red-600', bgColor: 'bg-red-50', icon: 'ri-speed-down-line', text: 'Heavy Traffic', intensity: '●●●○' }
            case 'severe':
                return { color: 'text-red-800', bgColor: 'bg-red-100', icon: 'ri-alarm-warning-line', text: 'Severe Congestion', intensity: '●●●●' }
            default:
                if (currentSpeed > 80) {
                    return { color: 'text-blue-600', bgColor: 'bg-blue-50', icon: 'ri-roadster-line', text: 'Fast Cruise', intensity: '●●●●' }
                } else if (currentSpeed > 60) {
                    return { color: 'text-blue-600', bgColor: 'bg-blue-50', icon: 'ri-roadster-line', text: 'Good Speed', intensity: '●●●○' }
                }
                return { color: 'text-blue-600', bgColor: 'bg-blue-50', icon: 'ri-roadster-line', text: 'Normal Traffic', intensity: '●●○○' }
        }
    }

    const getEstimatedArrival = () => {
        if (tripData.estimatedArrival) {
            const now = new Date()
            const eta = tripData.estimatedArrival
            const diffMinutes = Math.max(Math.ceil((eta - now) / (1000 * 60)), 1)

            if (diffMinutes < 60) {
                return `${diffMinutes} min`
            } else {
                const hours = Math.floor(diffMinutes / 60)
                const minutes = diffMinutes % 60
                return `${hours}h ${minutes}m`
            }
        }
        return 'Calculating...'
    }

    // Enhanced current speed with dynamic real-time variations
    const getCurrentSpeed = () => {
        // Use stored current speed from trip updates as base
        const baseCurrentSpeed = tripData.currentSpeed || parseFloat(getTripAverageSpeed()) || 25

        // Add larger real-time variations for more excitement (±8 km/h)
        const timeVariation = Math.sin(Date.now() / 5000) * 4 // ±4 km/h variation every 5 seconds
        const microVariation = (Math.random() - 0.5) * 8 // ±4 km/h micro variation

        // Factor in traffic conditions for immediate speed adjustments
        let instantSpeedFactor = 1.0
        switch (tripData.trafficCondition) {
            case 'severe':
                instantSpeedFactor = 0.6 + Math.random() * 0.4 // 60-100% fluctuation
                break
            case 'heavy':
                instantSpeedFactor = 0.8 + Math.random() * 0.3 // 80-110% fluctuation
                break
            case 'moderate':
                instantSpeedFactor = 0.9 + Math.random() * 0.2 // 90-110% fluctuation
                break
            case 'light':
                instantSpeedFactor = 1.2 + Math.random() * 0.5 // 120-170% speed boost (significant increase)
                break
            default:
                instantSpeedFactor = 1.0 + Math.random() * 0.3 // 100-130% fluctuation
        }

        // Apply enhanced vehicle speed limits
        const vehicleType = ride?.captain?.vehicle?.vehicleType?.toLowerCase()
        let maxSpeedCap = 120
        switch (vehicleType) {
            case 'motorcycle':
            case 'moto':
                maxSpeedCap = 200 // Very high for motorcycles
                break
            case 'car':
                maxSpeedCap = 180 // High for cars
                break
            case 'auto':
                maxSpeedCap = 100 // Increased for autos
                break
        }

        const currentSpeed = (baseCurrentSpeed + timeVariation + microVariation) * instantSpeedFactor
        return Math.round(Math.max(Math.min(currentSpeed, maxSpeedCap), 2))
    }

    // Get the actual trip average speed
    const getTripAverageSpeed = () => {
        const elapsedTime = (currentTime - rideStartTime) / 1000 / 3600 // hours
        if (elapsedTime <= 0) return '25'

        const baseDistance = tripData.distanceInKm || 3.2
        // Calculate progress based on elapsed time and estimated trip duration
        const estimatedDurationHours = (tripData.originalDuration || 600) / 3600 // convert seconds to hours
        const progressPercentage = Math.min(elapsedTime / estimatedDurationHours, 1)
        const distanceTraveled = baseDistance * progressPercentage

        const actualAvgSpeed = distanceTraveled / elapsedTime
        return actualAvgSpeed.toFixed(1)
    }

    const getFormattedETA = () => {
        if (tripData.estimatedArrival) {
            return tripData.estimatedArrival.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })
        }
        return 'Calculating...'
    }

    const getRideDuration = () => {
        const diff = Math.floor((currentTime - rideStartTime) / 1000)
        const minutes = Math.floor(diff / 60)
        const seconds = diff % 60
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const getVehicleIcon = (vehicleType) => {
        switch (vehicleType?.toLowerCase()) {
            case 'moto':
                return 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png'
            case 'auto':
                return 'https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png'
            case 'car':
            default:
                return 'https://www.svgrepo.com/show/408292/car-white.svg'
        }
    }

    return (
        <div className='h-screen bg-gray-50'>
            {/* Enhanced Header with Live Trip Info */}
            <div className="bg-white/95 backdrop-blur-md shadow-lg p-4 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-800">On the way</h1>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span>Trip duration: {getRideDuration()}</span>
                            <span>•</span>
                            <span>Live tracking</span>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border">
                        <i className={`ri-speed-line ${getCurrentSpeed() > 80 ? 'text-green-600 animate-pulse' :
                            getCurrentSpeed() > 50 ? 'text-blue-600' :
                                tripData.trafficCondition === 'heavy' || tripData.trafficCondition === 'severe' ? 'text-red-600' : 'text-gray-600'
                            }`}></i>
                        <span className={`${getCurrentSpeed() > 80 ? 'text-green-600 font-bold' :
                            getCurrentSpeed() > 50 ? 'text-blue-600 font-medium' :
                                tripData.trafficCondition === 'heavy' || tripData.trafficCondition === 'severe' ? 'text-red-600 font-medium' : ''
                            }`}>
                            {getCurrentSpeed()} km/h
                        </span>
                        {getCurrentSpeed() > 80 && (
                            <i className="ri-rocket-line text-green-600 text-xs animate-bounce"></i>
                        )}
                        {getCurrentSpeed() > 50 && getCurrentSpeed() <= 80 && (
                            <i className="ri-flashlight-line text-blue-600 text-xs"></i>
                        )}
                        {(tripData.trafficCondition === 'heavy' || tripData.trafficCondition === 'severe') && (
                            <i className="ri-alert-line text-red-500 text-xs animate-pulse"></i>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {/* ETA Card */}
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 px-4 py-2 rounded-xl border border-blue-200">
                        <div className="text-center">
                            <div className="text-lg font-bold text-gray-800">{getEstimatedArrival()}</div>
                            <p className="text-xs text-gray-600">ETA</p>
                        </div>
                    </div>
                    <Link to='/home' className="h-10 w-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center rounded-full transition-colors">
                        <i className="text-lg font-medium ri-home-5-line text-gray-600"></i>
                    </Link>
                </div>
            </div>

            {/* Compact Map Section with Enhanced Overlays */}
            <div className="h-[31vh] relative">
                <LiveTracking />

                {/* Progress Overlay - Traffic Status Removed */}

                {/* Live Traffic Alerts - Filtered to exclude adventure/speed alerts */}
                {trafficAlerts.filter(alert => alert.type !== 'adventure').length > 0 && (
                    <div className="absolute top-20 left-4 right-4 z-10">                                {trafficAlerts.filter(alert => alert.type !== 'adventure').slice(-1).map((alert) => (
                        <div
                            key={alert.id}
                            className={`${alert.type === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' :
                                'bg-orange-100 border-l-4 border-orange-500 text-orange-700'} p-3 rounded-r shadow-lg animate-pulse`}
                            onClick={() => setTrafficAlerts(prev => prev.filter(a => a.id !== alert.id))}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <i className={`${alert.type === 'success' ? 'ri-checkbox-circle-line' : 'ri-alert-line'} text-lg`}></i>
                                    <span className="text-sm font-medium">{alert.message}</span>
                                </div>
                                <button className={`${alert.type === 'success' ? 'text-green-600 hover:text-green-800' : 'text-orange-600 hover:text-orange-800'}`}>
                                    <i className="ri-close-line"></i>
                                </button>
                            </div>
                            <p className="text-xs opacity-70 mt-1 flex items-center gap-1">
                                <i className="ri-time-line"></i>
                                {alert.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                {alert.trafficSync && <span className="ml-2 px-1 bg-white/20 rounded text-xs">SYNC</span>}
                            </p>
                        </div>
                    ))}
                    </div>
                )}
            </div>

            {/* Enhanced Bottom Section with Driver Info and Trip Details */}
            <div className="h-[60vh] bg-white rounded-t-3xl shadow-xl overflow-y-auto">
                {/* Driver Info Card - Enhanced */}
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <img
                                    className='h-16 w-16 rounded-full object-cover border-3 border-green-300 shadow-lg'
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkKX2y-92Lgl0fEgjNpgWZhDcDZNz9J1jkrg&s"
                                    alt="Driver"
                                />
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                    <i className="ri-check-line text-white text-xs"></i>
                                </div>
                            </div>
                            <div>
                                <h2 className='text-xl font-bold capitalize text-gray-800'>
                                    {ride?.captain?.fullname?.firstname} {ride?.captain?.fullname?.lastname}
                                </h2>
                                <div className="flex items-center gap-3 mt-1">
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-500">
                                            <i className="ri-star-fill text-sm"></i>
                                        </span>
                                        <span className="text-sm font-semibold text-gray-700">4.8</span>
                                        <span className="text-xs text-gray-500">(234 trips)</span>
                                    </div>
                                    <span className="text-gray-400">•</span>
                                    <div className="flex items-center gap-1">
                                        <i className="ri-timer-line text-green-600 text-xs"></i>
                                        <span className="text-xs text-gray-600">5 years exp</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                        ✓ Verified Driver
                                    </span>
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                                        🛡️ Safe Driver
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center gap-2">
                                <img
                                    className='h-12 w-12'
                                    src={getVehicleIcon(ride?.captain?.vehicle?.vehicleType)}
                                    alt="Vehicle"
                                />
                            </div>
                            <div className="text-center">
                                <h4 className='text-lg font-bold text-gray-800'>{ride?.captain?.vehicle?.plate || 'KA-01-HH-1234'}</h4>
                                <p className='text-xs text-gray-600 capitalize'>
                                    {ride?.captain?.vehicle?.vehicleType || 'Car'} • {ride?.captain?.vehicle?.color || 'Blue'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Quick Actions */}
                    <div className="grid grid-cols-4 gap-2">
                        <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 px-3 rounded-xl flex flex-col items-center gap-1 transition-all hover:scale-105">
                            <i className="ri-phone-line text-lg"></i>
                            <span className="text-xs font-medium">Call</span>
                        </button>
                        <button className="bg-green-100 hover:bg-green-200 text-green-700 py-3 px-3 rounded-xl flex flex-col items-center gap-1 transition-all hover:scale-105">
                            <i className="ri-message-3-line text-lg"></i>
                            <span className="text-xs font-medium">Chat</span>
                        </button>
                        <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 py-3 px-3 rounded-xl flex flex-col items-center gap-1 transition-all hover:scale-105">
                            <i className="ri-share-line text-lg"></i>
                            <span className="text-xs font-medium">Share</span>
                        </button>
                        <button className="bg-orange-100 hover:bg-orange-200 text-orange-700 py-3 px-3 rounded-xl flex flex-col items-center gap-1 transition-all hover:scale-105">
                            <i className="ri-shield-line text-lg"></i>
                            <span className="text-xs font-medium">Safety</span>
                        </button>
                    </div>
                </div>

                {/* Trip Details */}
                <div className="p-4 space-y-4">
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-800">Trip Details</h3>
                            <div className="flex items-center gap-3 text-sm">
                                <div className="flex items-center gap-1 text-gray-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span>Live</span>
                                </div>
                                <div
                                    className={`flex items-center gap-2 ${getTrafficInfo().color} ${getTrafficInfo().bgColor} px-2 py-1 rounded-lg transition-all`}
                                >
                                    <i className={`${getTrafficInfo().icon} text-sm`}></i>
                                    <span className="font-medium">{getTrafficInfo().text}</span>
                                    <span className="text-xs opacity-70">{getTrafficInfo().intensity}</span>
                                    <i className="ri-information-line text-xs ml-1 opacity-60"></i>
                                </div>
                            </div>
                        </div>

                        {/* Traffic Details Always Visible Section */}
                        <div className="mb-4 p-3 bg-white/90 rounded-lg border border-gray-200 shadow-sm">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <i className="ri-traffic-light-line text-orange-500"></i>
                                Live Traffic Information
                                <div className="flex items-center gap-1 ml-auto">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs text-green-600 font-medium">LIVE</span>
                                    <span className="text-xs text-gray-500 ml-2">
                                        {tripData.lastSync ?
                                            `Updated ${Math.floor((Date.now() - tripData.lastSync) / 1000)}s ago` :
                                            'Syncing...'}
                                    </span>
                                </div>
                            </h4>

                            {/* Traffic Incidents */}
                            {tripData.trafficIncidents && tripData.trafficIncidents.length > 0 && (
                                <div className="mb-3">
                                    <p className="text-xs text-gray-600 mb-1">Current Incidents:</p>
                                    {tripData.trafficIncidents.map((incident, index) => (
                                        <div key={index} className="flex items-center gap-2 text-xs text-gray-700 mb-1">
                                            <i className={`${incident.icon} ${incident.severity === 'adventure' ? 'text-green-600' :
                                                incident.severity === 'heavy' ? 'text-red-600' :
                                                    incident.severity === 'moderate' ? 'text-yellow-600' : 'text-orange-600'
                                                }`}></i>
                                            <span className={incident.severity === 'adventure' ? 'text-green-700 font-medium' : ''}>
                                                {incident.message}
                                            </span>
                                            {incident.severity === 'adventure' && (
                                                <i className="ri-sparkle-line text-green-500 text-xs animate-pulse"></i>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Route Alerts */}
                            {tripData.routeAlerts && tripData.routeAlerts.length > 0 && (
                                <div className="mb-3">
                                    <p className="text-xs text-gray-600 mb-1">Route Alerts:</p>
                                    {tripData.routeAlerts.map((alert, index) => (
                                        <div key={index} className="flex items-center justify-between text-xs bg-blue-50 p-2 rounded">
                                            <div className="flex items-center gap-2">
                                                <i className={`${alert.icon} text-blue-600`}></i>
                                                <span className="text-gray-700">{alert.message}</span>
                                            </div>
                                            <button className="text-blue-600 font-medium hover:underline">
                                                {alert.action}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Traffic Stats - Enhanced with real-time sync */}
                            <div className="grid grid-cols-3 gap-3 text-xs">
                                <div className="bg-gray-50 p-2 rounded">
                                    <p className="text-gray-500">Traffic Delay</p>
                                    <p className={`font-semibold ${tripData.trafficDelay > 5 ? 'text-red-600' :
                                        tripData.trafficDelay > 2 ? 'text-yellow-600' : 'text-green-600'}`}>
                                        {tripData.trafficDelay > 0 ? `+${tripData.trafficDelay} min` : 'None'}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                    <p className="text-gray-500">Speed Trend</p>
                                    <p className={`font-semibold flex items-center gap-1 ${tripData.speedTrend === 'increasing' ? 'text-green-600' :
                                        tripData.speedTrend === 'decreasing' ? 'text-red-600' : 'text-blue-600'}`}>
                                        {tripData.speedTrend === 'increasing' ? (
                                            <>Improving <i className="ri-arrow-up-line"></i></>
                                        ) : tripData.speedTrend === 'decreasing' ? (
                                            <>Slowing <i className="ri-arrow-down-line"></i></>
                                        ) : (
                                            <>Stable <i className="ri-subtract-line"></i></>
                                        )}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                    <p className="text-gray-500">Alternatives</p>
                                    <p className="font-semibold text-gray-800">{tripData.alternativeRoutes || 1} routes</p>
                                </div>
                            </div>

                            {/* Speed Analysis */}
                            <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-600">Speed Analysis:</span>
                                    <div className="flex items-center gap-2">
                                        <span className={`font-medium ${getCurrentSpeed() > parseFloat(getTripAverageSpeed()) ? 'text-green-600' :
                                            getCurrentSpeed() < parseFloat(getTripAverageSpeed()) * 0.7 ? 'text-red-600' :
                                                'text-blue-600'
                                            }`}>
                                            {getCurrentSpeed() > parseFloat(getTripAverageSpeed()) ? 'Above Average' :
                                                getCurrentSpeed() < parseFloat(getTripAverageSpeed()) * 0.7 ? 'Below Average' :
                                                    'Normal Speed'}
                                        </span>
                                        <i className={`${getCurrentSpeed() > parseFloat(getTripAverageSpeed()) ? 'ri-arrow-up-line text-green-600' :
                                            getCurrentSpeed() < parseFloat(getTripAverageSpeed()) * 0.7 ? 'ri-arrow-down-line text-red-600' :
                                                'ri-subtract-line text-blue-600'
                                            } text-xs`}></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='space-y-3'>
                            <div className='flex items-start gap-4 p-3 bg-white/70 rounded-lg'>
                                <i className="text-xl ri-map-pin-user-fill text-green-600 mt-1"></i>
                                <div className="flex-1">
                                    <h4 className='text-sm font-medium text-green-700'>Pickup Location</h4>
                                    <p className='text-gray-700 font-medium'>{ride?.pickup || 'Loading pickup location...'}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        <i className="ri-time-line mr-1" style={{ verticalAlign: 'baseline' }}></i>
                                        Started at {rideStartTime.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <div className="w-px h-8 bg-gradient-to-b from-green-300 to-red-300"></div>
                            </div>

                            <div className='flex items-start gap-4 p-3 bg-white/70 rounded-lg'>
                                <i className="text-xl ri-map-pin-fill text-red-600 mt-1"></i>
                                <div className="flex-1">
                                    <h4 className='text-sm font-medium text-red-700'>Destination</h4>
                                    <p className='text-gray-700 font-medium'>{ride?.destination || 'Loading destination...'}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <p className="text-xs text-gray-600 flex items-center">
                                            <i className="ri-roadster-line mr-1"></i>
                                            <span className="font-semibold text-blue-600">
                                                {isLoadingTripData ? 'Calculating...' : tripData.remainingDistance}
                                            </span>
                                            <span className="ml-1">remaining</span>
                                        </p>
                                        <p className="text-xs text-gray-600 flex items-center">
                                            <i className="ri-time-line mr-1 flex-shrink-0" style={{ lineHeight: '1' }}></i>
                                            <span style={{ lineHeight: '1' }}>
                                                ETA: <span className="font-semibold text-green-600">{getFormattedETA()}</span>
                                                <span className="text-gray-500 ml-1">({getEstimatedArrival()})</span>
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2">
                                        <p className="text-xs text-gray-600 flex items-center">
                                            <i className={`ri-speed-line mr-1 ${getCurrentSpeed() > parseFloat(getTripAverageSpeed()) ? 'text-green-600' :
                                                getCurrentSpeed() < parseFloat(getTripAverageSpeed()) * 0.7 ? 'text-red-600' :
                                                    'text-gray-600'
                                                }`}></i>
                                            <span>Current: </span>
                                            <span className={`font-semibold ml-1 ${getCurrentSpeed() > parseFloat(getTripAverageSpeed()) ? 'text-green-600' :
                                                getCurrentSpeed() < parseFloat(getTripAverageSpeed()) * 0.7 ? 'text-red-600' :
                                                    'text-purple-600'
                                                }`}>
                                                {getCurrentSpeed()} km/h
                                            </span>
                                            {getCurrentSpeed() > parseFloat(getTripAverageSpeed()) && (
                                                <i className="ri-arrow-up-line text-green-600 text-xs ml-1"></i>
                                            )}
                                            {getCurrentSpeed() < parseFloat(getTripAverageSpeed()) * 0.7 && (
                                                <i className="ri-arrow-down-line text-red-600 text-xs ml-1"></i>
                                            )}
                                        </p>
                                        <p className="text-xs text-gray-600 flex items-center">
                                            <i className="ri-route-line mr-1"></i>
                                            <span>Trip Avg: </span>
                                            <span className="font-semibold text-indigo-600 ml-1">
                                                {getTripAverageSpeed()} km/h
                                            </span>
                                        </p>
                                    </div>

                                    {/* Trip Progress Bar */}
                                    <div className="mt-4 p-3 bg-white/80 rounded-lg border border-gray-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-medium text-gray-700">Trip Progress</span>
                                            <span className="text-xs font-semibold text-gray-700">
                                                {Math.min(Math.round((currentTime - rideStartTime) / (tripData.originalDuration * 1000) * 100), 100)}% Complete
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 h-2.5 rounded-full transition-all duration-1000 relative overflow-hidden"
                                                style={{
                                                    width: `${Math.min(Math.round(((currentTime - rideStartTime) / (tripData.originalDuration * 1000)) * 100), 95)}%`
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                                            <span>Started</span>
                                            <span>{Math.round(((currentTime - rideStartTime) / (tripData.originalDuration * 1000)) * 100)}% complete</span>
                                            <span>Destination</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fare Breakdown */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Fare Details</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Base Fare</span>
                                <span className="font-medium">₹{Math.floor((ride?.fare || 100) * 0.6)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Distance Charge</span>
                                <span className="font-medium">₹{Math.floor((ride?.fare || 100) * 0.3)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Time Charge</span>
                                <span className="font-medium">₹{Math.floor((ride?.fare || 100) * 0.1)}</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total Fare</span>
                                <span className="text-green-600">₹{ride?.fare || 'Calculating...'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-yellow-50 rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Method</h3>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setPaymentMethod('cash')}
                                className={`flex-1 p-3 rounded-lg border-2 transition-all ${paymentMethod === 'cash'
                                    ? 'border-green-500 bg-green-50 text-green-700'
                                    : 'border-gray-200 bg-white text-gray-600'
                                    }`}
                            >
                                <i className="ri-cash-line text-xl mb-1"></i>
                                <p className="text-sm font-medium">Cash</p>
                            </button>
                            <button
                                onClick={() => setPaymentMethod('digital')}
                                className={`flex-1 p-3 rounded-lg border-2 transition-all ${paymentMethod === 'digital'
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-200 bg-white text-gray-600'
                                    }`}
                            >
                                <i className="ri-smartphone-line text-xl mb-1"></i>
                                <p className="text-sm font-medium">Digital</p>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Complete Ride Button */}
                <div className="p-4 bg-white border-t border-gray-100 sticky bottom-0">
                    {isRideCompleted ? (
                        <div className="bg-green-100 text-green-800 font-semibold p-4 rounded-xl text-center">
                            <i className="ri-check-line text-xl mr-2"></i>
                            Ride Completed! Redirecting...
                        </div>
                    ) : isWaitingForDriver ? (
                        <div className="space-y-3">
                            <div className="bg-yellow-100 text-yellow-800 font-semibold p-4 rounded-xl text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600"></div>
                                    <span>Waiting for driver to end the trip...</span>
                                </div>
                                <p className="text-sm mt-2 text-yellow-700">
                                    Payment method: {paymentMethod === 'cash' ? 'Cash' : 'Digital Payment'}
                                </p>
                            </div>
                            <button
                                onClick={() => setIsWaitingForDriver(false)}
                                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium p-3 rounded-lg transition-all duration-200"
                            >
                                Cancel Request
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleCompleteRide}
                            className='w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold p-4 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2'
                        >
                            <i className="ri-secure-payment-line"></i>
                            Complete Ride & Pay ₹{ride?.fare}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Riding