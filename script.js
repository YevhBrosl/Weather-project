const loader = document.querySelector('#loader')


async function getWeather() {    

    try {
        const res = await fetch('https://get.geojs.io/v1/ip/geo.json')
        const data = await res.json()
        const { country, city, latitude, longitude } = data
        const res1 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
        const data1 = await res1.json()
        const { current_weather_units, current_weather } = data1
        const { temperature, windspeed, weathercode } = current_weather

        const decodeWeather = (weathercode) => {
            switch (weathercode) {
                case 0:
                    return 'Clear sky';
                case 1:
                case 2:
                case 3:
                    return 'Mainly clear, partly cloudy, and overcast';
                case 45:
                case 48:
                    return 'Fog and depositing rime fog';
                case 51:
                case 53:
                case 55:
                    return 'Drizzle: Light, moderate, and dense intensity';
                case 56:
                case 57:
                    return 'Freezing Drizzle: Light and dense intensity';
                case 61:
                case 63:
                case 65:
                    return 'Rain: Slight, moderate and heavy intensity';
                case 66:
                case 67:
                    return 'Freezing Rain: Light and heavy intensity';
                case 71:
                case 73:
                case 75:
                    return 'Snow fall: Slight, moderate, and heavy intensity';
                case 77:
                    return 'Snow grains';
                case 80:
                case 81:
                case 82:
                    return 'Rain showers: Slight, moderate, and violent';
                case 85:
                case 86:
                    return 'Snow showers slight and heavy';
                case 95:
                    return 'Thunderstorm: Slight or moderate';
                case 96:
                case 99:
                    return 'Thunderstorm with slight and heavy hail';
                default:
                    return 'Undefined weather';
            }
        }

        const weatherCard = document.createElement('div')
        weatherCard.classList.add('weatherCard')
        const cardHeading = document.createElement('h2')
        cardHeading.textContent = 'Current weather'
        const weatherList = document.createElement('ul')
        const values = [`Country: ${country}`, `City: ${city}`, `Temperature: ${temperature} ${current_weather_units.temperature}`, `Windspeed: ${windspeed} ${current_weather_units.windspeed}`, `${decodeWeather(weathercode)}`];
        values.forEach((value) => {
            const li = document.createElement('li')
            li.textContent = value
            weatherList.appendChild(li)
        })

        weatherCard.append(cardHeading, weatherList)
        document.body.appendChild(weatherCard)

    } catch (error) {
        loader.classList.add('hide')
        const serverError = document.createElement('p')
        serverError.style.color = 'red'
        serverError.textContent = `Server error! ${error.message}`
        document.body.append(serverError)        
        
    } finally {        
        loader.classList.add('hide')
    }

}

setTimeout(() => {
    getWeather()
}, 1500)
