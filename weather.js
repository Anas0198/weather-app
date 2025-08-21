
function description(descri,num,time){
  let des=document.querySelector('.des');
  des.textContent=`${descri}...`;
  let hour=document.querySelector('.time');
  hour.innerHTML=`active:\n${time}`;


  let array=['wind','breeze','gust','squall','storm','thunderstorm','hurricane','tornado']
  if(descri.includes("rain") || descri.includes('drizzle') ){
      document.querySelector('.status').innerHTML=
      'Rain warning in effect.Take precautions to avoid getting wet and slippery';
  }
  else if(array.includes(descri)){
      document.querySelector('.status').textContent=
      'Severe storm with strong winds in effect. Take shelter and avoid outdoor activities'
  }
  else if(num>=35){
      document.querySelector('.status').textContent=
      'Excessive heat warning in effect. Take precautions to avoid heat-related illness.'
  }
  else{
       document.querySelector('.status').textContent='The weather is moderate.'

  }
}
function card_info(city,time,temp,icon,description2){
  document.getElementById('city').textContent=`${city}`;
  document.getElementById('time').textContent=`${time}`;
  document.querySelector('.container-parent2 h2').textContent=`${temp}°C`;
  let image=document.createElement('img');
  let container=document.querySelector('.container-parent2 .container2');
  container.appendChild(image);
  document.querySelector('.container-info p').textContent=`${description2}`;
  image.src=`http://openweathermap.org/img/wn/${icon}@2x.png`;
  image.style.width='100px';
  image.style.position = 'absolute';
  image.style.right = '8%';
}
function card_info2(humidity,wind,Visibility){
  document.querySelector('.num1').textContent=`${humidity}%`;
  document.querySelector('.wind').textContent=`${wind}km/h`;
  document.querySelector('.Visibility').textContent=`${Visibility}km`;
}


function info(){
let requst = new XMLHttpRequest();
requst.responseType = 'json';
requst.open('get','https://api.openweathermap.org/data/2.5/weather?units=metric&q=temara&appid=4ac353ae4c3aeb762531088d2741e0e3&lang=en');

requst.onload = () => {
  if (requst.status === 200 && requst.response) {
      let wtr = requst.response;
      let status1 = wtr.weather[0].description;
      let temp = wtr.main.temp;

      let unixTime = wtr.dt;          
      let timezone = wtr.timezone;  

      let localTime = new Date((unixTime + timezone) * 1000);
      let hours = localTime.getHours();
      let minutes = localTime.getMinutes();

      let formattedTime = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`;
      let Visibilit=wtr.visibility/1000;
      
      description(status1, temp, formattedTime);
      card_info(wtr.name,formattedTime,temp,wtr.weather[0].icon,status1);
      card_info2(wtr.main.humidity,wtr.wind.speed,Visibilit);
  } 
  else {
      let check = document.querySelector('.container');
      check.style.marginTop='5%';
      check.innerHTML = '<p>is not active</p>';
      check.style.height = '450px';
      check.style.display = 'flex';
      check.style.textAlign = 'center';
      check.style.alignItems = 'center';
      document.querySelector('.container p').style.width='100%';
      check.style.textTransform = 'capitalize';
      check.style.fontSize = '32px';
      check.style.color = 'rgb(121, 59, 15)';
  }
};
requst.onerror = () => {
  let check = document.querySelector('.container');
  check.innerHTML = '<p>is not active</p>';
  check.style.marginTop='5%';
  check.style.height = '450px';
  check.style.display = 'flex';
  check.style.textAlign = 'center';
  check.style.alignItems = 'center';
  document.querySelector('.container p').style.width='100%';
  check.style.textTransform = 'capitalize';
  check.style.fontSize = '32px';
  check.style.color = 'rgb(121, 59, 15)';
};
requst.send();
}
info();

