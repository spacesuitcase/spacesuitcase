rdware.pin1
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

updatedColour <- 1

pulseDuration <- 10

function updateColour(colour)
{
     server.log("colour Received: " + colour)

        blueMax=0
        redMax=0
        greenMax=0

        if (colour=="red")
        {
                redMax=1.0
        } else if (colour=="green") {
                greenMax=1.0
        }
        else {
                blueMax=1.0
        }

     updatedColour = 1
}


// Define a function to pulse the LED
function pulse()
{
  if (updatedColour == 1) {
             server.log("Updating temp and rain")
     updatedColour = 0
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
agent.on("Colour", updateColour)
