let joke = document.getElementById('joke');
var limit = 1
let temp = "";
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/jokes?limit=' + limit,
    headers: { 'X-Api-Key': "JihbYu7x+Hxh1L+u5LULAQ==6vJSPZqEkE2d6aKZ"},
    contentType: 'application/json',
    success: function(result) 
    {
        console.log(result[0].joke);
        temp = result[0].joke;
        joke.innerHTML = `"${temp}"`;
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});
function weather()
{
    let city = document.getElementById("location");
    let forcast = document.getElementById("forcast");
    let day = document.getElementById("day");
    let inow = document.getElementById("inow");
    let tnow = document.getElementById("tnow");
    let desc = document.getElementById("desc");
    let api="https://api.openweathermap.org/data/2.5/forecast";
    let apiKey = "f146799a557e8ab658304c1b30cc3cfd";

navigator.geolocation.getCurrentPosition(success,error);


function success(p)
{
    lat = p.coords.latitude;
    long = p.coords.longitude;

    console.log(p);
    let url=
        api + 
        "?lat=" + 
        lat + 
        "&lon=" + 
        long + 
        "&appid=" + 
        apiKey + 
        "&units=imperial";

        fetch(url)
        .then(q=>q.json())
        .then(data=>
        {
            console.log(data);
            city.innerHTML=data.city.name + ", " + data.city.country;
            let x = data.list;
            // console.log("=>",x[0]);
            inow.src = "https://openweathermap.org/img/wn/" + x[0].weather[0].icon + "@4x.png";
            tnow.innerHTML = Celsius(x[0].main.temp) + "°";
            desc.innerHTML = x[0].weather[0].description;
            let array = x.map(function(e)
            {
                let a = e.dt;
                let b = new Date(a * 1000);
                
                let c = b.getHours();
                let d = b.getMinutes(); 
                if(d <=9)
            {
                d = "0" + d; 
            }
                let icon = "https://openweathermap.org/img/wn/" + e.weather[0].icon + "@4x.png";
                return`
                <div class="tod">
                <label>${c + ":" + d}</label>
                <img src="${icon}"/>
                <p>${Celsius(e.main.temp) + "°"}</p>
                </div>`;
            });
            forcast.innerHTML = array.join('\n');
            let t = new Date();
            let td = t.getDate();
            let tM = t.getMonth();
            let ty = t.getFullYear();
            let th = t.getHours();
            let tm = t.getMinutes();
            if(tm < 10)
                {
                    tm = "0"+tm;
                }
            let ts = t.getSeconds();
            // console.log("this=>",td,tM,ty,th,tm,ts);
            const month =
            [
                "Jan",
                "Feb",
                "March",
                "April",
                "May",
                "June",
                "July",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec",
            ];
            let mn = month[tM]; 
            // let suffix = getDaySuffix(td);
            day.innerHTML = td +" "+ mn + ", " + ty;
            let dt = "am";
            if(th>=12)
            {
                dt = "pm";
            }
            day.innerHTML += " | " + (th % 12) + ":" + tm + dt;
            });
}
function error()
{
    console.log("error");
}
function Celsius(temp)
            {
                let celsius = (temp - 32) * 5/9;
                return celsius.toFixed(1);
            }
}
// function getDaySuffix(day) {
//     if (day > 3 && day < 21) return 'th'; // covers 11th to 19th
//     switch (day % 10) {
//         case 1: return 'st';
//         case 2: return 'nd';
//         case 3: return 'rd';
//         default: return 'th';
//     }
// }
weather();