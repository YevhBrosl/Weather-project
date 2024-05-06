const loader = document.querySelector('#loader')
const citiesContainer = document.querySelector('#citiesContainer')


async function getWeather() {
    try {
        const res = await fetch('https://yevhbrosl.github.io/Weather-api/cities.json');
        const data = await res.json();

        data.forEach(async (cityData) => {
            const { city, latitude, longitude, description, image } = cityData;
            const cityCard = document.createElement('div');
            cityCard.classList.add('cityCard');

            const cardHeading = document.createElement('h3');
            cardHeading.textContent = city.charAt(0).toUpperCase() + city.slice(1);
            cardHeading.classList.add('cityCard__heading');

            const cardDesc = document.createElement('p');
            cardDesc.textContent = description;
            
            const cardImage = document.createElement('img');
            cardImage.src = image;
            cardImage.classList.add('cardImg');

            const cardLatitude = document.createElement('p');
            cardLatitude.textContent = `Latitude: ${latitude}` ;

            const cardLongitude = document.createElement('p');
            cardLongitude.textContent = `Longitude: ${longitude}` ;            

            cityCard.append(cardHeading, cardLatitude, cardLongitude, cardDesc, cardImage);

            const res1 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
            const data1 = await res1.json();
            const { current_weather_units, current_weather } = data1;
            const { temperature, windspeed, weathercode } = current_weather;

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

            const weatherList = document.createElement('ul');
            const values = [`Temperature: ${temperature} ${current_weather_units.temperature}`, `Windspeed: ${windspeed} ${current_weather_units.windspeed}`, `${decodeWeather(weathercode)}`];
            values.forEach((value) => {
                const li = document.createElement('li');
                li.textContent = value;
                weatherList.appendChild(li);
            });

            cityCard.append(weatherList);
            citiesContainer.append(cityCard);
        });

    } catch (error) {
        loader.classList.add('hide');
        const serverError = document.createElement('p');
        serverError.style.color = 'red';
        serverError.textContent = `Server error! ${error.message}`;
        document.body.append(serverError);

    } finally {
        loader.classList.add('hide');
    }
}

setTimeout(() => {
    getWeather();
}, 1500);