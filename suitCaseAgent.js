
cal response = "" 
local locationRequest
 
function wakeUpLocation(){
    locationRequest = http.get("http://husnoo.com/cgi-bin/space.py/loc")
    locationRequest.sendasync(handleLocationResponse)
}
function handleLocationResponse(responseTable) {
    // Called when the imp receives a response from the remote service
    
    if (responseTable.statuscode == 200)
    {
        response = responseTable.body
        server.log("Location: " + responseTable.body)
        device.send("Location", response)
      
        // Remote service has responded with 'OK' so decode
        // the response's body 'responseTable.body' and headers 'responseTable.headers'
        // Code omitted for clarity 
    }
    else
    {
        // Log an error
        
        server.log("Error response: " + responseTable.statuscode)
    }
    imp.wakeup(2.0, wakeUpLocation)
}
wakeUpLocation()


//cut here to make second agent code

//local response = "" 
local weatherRequest
function wakeUpWeather() {
    weatherRequest = http.get("http://www.metoffice.gov.uk/public/data/PWSCache/BestForecast/Forecast/350928?v=5.6.0&format=application/json")
    weatherRequest.sendasync(handleWeatherResponse)
}
function handleWeatherResponse(responseTable) {
    // Called when the imp receives a response from the remote service
    
    if (responseTable.statuscode == 200)
    {
        response = http.jsondecode(responseTable.body).BestFcst.Forecast.Location.Day[0].DayValues.WeatherParameters
        server.log("Temperature: " + response.Temperature)
        device.send("Temperature", response.Temperature)
        server.log("PrecipitationProbability: " + response.PrecipitationProbability)
        device.send("PrecipitationProbability", response.PrecipitationProbability)
        //server.log("WeatherType: " + response.WeatherType)
        //device.send("WeatherType", response.WeatherType)
        
        // Remote service has responded with 'OK' so decode
        // the response's body 'responseTable.body' and headers 'responseTable.headers'
        // Code omitted for clarity 
    }
    else
    {
        // Log an error
        
        server.log("Error response: " + responseTable.statuscode)
    }
    imp.wakeup(2.0, wakeUpWeather)
}
wakeUpWeather()
