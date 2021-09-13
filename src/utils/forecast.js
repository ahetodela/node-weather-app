const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b23ac585c9320933f8e5b26a5f79fd3d&query=${latitude},${longitude}&units=m`;

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (body.error) {
            callback("Unable to find location. Try another search", undefined);
        } else {
            const temp = body.current;

            callback(
                undefined,
                `${temp.weather_descriptions[0]}. It is currrenlty ${temp.temperature} degrees out. It feels like ${temp.feelslike} degrees out. Humidity is ${temp.humidity} %.`
            );
        }
    });
};

module.exports = forecast;
