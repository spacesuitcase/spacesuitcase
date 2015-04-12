const SERVO_MIN = 0.03
const SERVO_MAX = 0.1

servo <- hardware.pin9
servo.configure(PWM_OUT, 0.02, SERVO_MIN)
position <- 0
function setServo(value) 
{
    local scaledValue = value * (SERVO_MAX - SERVO_MIN) + SERVO_MIN
    servo.write(scaledValue)
}
 
// Define a function to control the servo.
// It expects an angle value between -80.0 and 80.0
 
function setServoDegrees(value) {
    server.log(value)
    local scaledValue = (value + 81) / 161.0 * (SERVO_MAX - SERVO_MIN) + SERVO_MIN
    servo.write(scaledValue)
}
 
// Set the initial position (we'll flip between 0 and 1)
 
 
// Define a function to loop through the servo position values
 
function sweep() {   
    server.log("sweeping")
    // Write the current position
    setServo(position)                           
    // Invert the position
    position = 1.0 - position
}

function updateLocation(response) {
    server.log("updateLocation: " + response)
    sweep()

    if (response == "home"){
        this.setServoDegrees(-80)
    } else if (response == "school") {
        this.setServoDegrees(-35)
    } else if (response == "work") {
        this.setServoDegrees(0)
    } else if (response == "park") {
        this.setServoDegrees(35)
    } else if (response == "beach") {
        this.setServoDegrees(80)
    }
}
sweep()
agent.on("Location", updateLocation)
  
//cut here to remove LED code
  // Assign a global variable, led, to the pin to which the LED is connected
// Then configure it for PWM output

red <- hardware.pin1
red.configure(PWM_OUT, 1.0 / 400.0, 1.0)
green <- hardware.pin2
green.configure(PWM_OUT, 1.0 / 400.0, 1.0)
blue <- hardware.pin5
blue.configure(PWM_OUT, 1.0 / 400.0, 1.0)

// Record the state and delta of the LED's cycle
redState <- 0.0
redChange <- 0.05
greenState <- 0.0
greenChange <- 0.05
blueState <- 0.0
blueChange <- 0.05

sleepyTime <- 0.05

redMax <- 0.0
greenMax <- 1.0
blueMax <- 0.0

updatedTemp <- 1
updatedPrecipitation <- 1

pulseDuration <- 10

function updateTemperature(temperature)
{
     local range = 0
     server.log("temperature Received: " + temperature)
     //Temp 0--> 30
     // -10 -> 10 = blue
     // 10 --> 30 = red
        blueMax=0
        redMax=0
        greenMax=0

     if (temperature <= 0)
     {
        range = 0-temperature
        blueMax=0.5/range
     } else if (temperature <=10)
     {
        range = 0+temperature
        blueMax=(0.05*range)+0.5
     } else if (temperature <= 30)
     {
        range=temperature-10
        redMax=0.05*range
     } else {
        // anomaly RED+BLUE max
        redMax=1.0
        blueMax=1.0
     }
     updatedTemp = 1
}

function updatePrecipitation(precipitation)
{
     //pulse of 2 per second for 100% possibility of rain
     server.log("precipitation Received: " + precipitation)
     pulseDuration=102-precipitation
     updatedPrecipitation = 1
}

// Define a function to pulse the LED
function pulse()
{
  if (updatedTemp == 1 || updatedPrecipitation == 1) {
             server.log("Updating temp and rain")
     updatedTemp = 0
     updatedPrecipitation = 0
     //read colour value and pulse duration and update globals and reset RGBs
     redChange=redMax/pulseDuration
     greenChange=greenMax/pulseDuration
     blueChange=blueMax/pulseDuration

        redState=0
        greenState=0
        blueState=0

    //sleepyTime=1.0/pulseDuration
  }
    // Write the state value to the pin

    red.write(redState)
    green.write(greenState)
    blue.write(blueState)
    // Change the state value

    // Change the state value
    redState = redState + redChange
    greenState = greenState + greenChange
    blueState = blueState + blueChange
    // Check if we're out of bounds

    if (redState >= redMax || redState <= 0.0)
    {
        redChange = redChange * -1.0
    }
    if (greenState >= greenMax || greenState <= 0.0)
    {
        greenChange = greenChange * -1.0
    }
    if (blueState >= blueMax || blueState <= 0.0)
    {
        blueChange = blueChange * -1.0
    }
    imp.wakeup(sleepyTime, pulse)
}

// Start the loop by calling pulse()

pulse()
agent.on("Temperature", updateTemperature)
agent.on("PrecipitationProbability", updatePrecipitation)


