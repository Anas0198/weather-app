document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "fe09c2b3bd1d6251cfddc794805b9451";
    const city = "Casablanca";
  
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather data.");
        }
        return response.json();
      })
      .then(data => {
        const container = document.querySelector(".city");
  
        container.querySelector(".city-name-text").textContent = data.name;
        const now = new Date();
        container.querySelector(".current-time").textContent = now.toLocaleTimeString();
        container.querySelector(".temperature").textContent = `${Math.round(data.main.temp)}°`;
        container.querySelector(".description").textContent = data.weather[0].description;
        container.querySelector(".weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        container.querySelector(".humidity").textContent = `${data.main.humidity}%`;
        container.querySelector(".visibility").textContent = `${(data.visibility / 1000).toFixed(1)} km`;
        container.querySelector(".wind").textContent = `${data.wind.speed} km/h`;
        container.querySelector(".uv-index").textContent = "N/A";
  
        const { lat, lon } = data.coord;
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${apiKey}&units=metric`);
      })
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch hourly forecast");
        return response.json();
      })
      .then(data => {
        const hoursData = data.hourly.slice(0, 8);
        const cardClasses = ["card8", "card1", "card2", "card3", "card4", "card5", "card6", "card7"];
        const container = document.querySelector(".news .card-container");
  
        hoursData.forEach((hour, index) => {
          const card = container.querySelector(`.${cardClasses[index]}`);
          if (!card) return;
  
          const date = new Date(hour.dt * 1000);
          const hourStr = date.getHours().toString().padStart(2, "0") + ":00";
  
          const iconUrl = `https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`;
          const temp = Math.round(hour.temp);
          const humidity = hour.humidity;
  
          const pElems = card.querySelectorAll("p");
          const imgElem = card.querySelector("img");
  
          pElems[0].textContent = hourStr;
          imgElem.src = iconUrl;
          imgElem.alt = hour.weather[0].description;
          pElems[2].textContent = `${temp}°`;
          pElems[3].textContent = `${humidity}%`;
        });
      })
      .catch(error => {
        console.error("Error loading weather data:", error);
        alert("lose");
      });
  });
  