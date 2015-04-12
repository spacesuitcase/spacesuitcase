
cal response = ""
local colourRequest

function wakeUpColour(){
    colourRequest = http.get("http://husnoo.com/cgi-bin/space.py/field_a")
    colourRequest.sendasync(handleColourResponse)
}
function handleColourResponse(responseTable) {
    // Called when the imp receives a response from the remote service

    if (responseTable.statuscode == 200)
    {
        response = responseTable.body
        server.log("Colour: " + responseTable.body)
        device.send("Colour", response)

        // Remote service has responded with 'OK' so decode
        // the response's body 'responseTable.body' and headers
'responseTable.headers'
        // Code omitted for clarity
    }
    else
    {
        // Log an error

        server.log("Error response: " + responseTable.statuscode)
    }
    imp.wakeup(2.0, wakeUpColour)
}
wakeUpColour()
