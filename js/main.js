window.addEventListener('load', ()=> {
    let long;  //longitude
    let lat;   //latitude
    let tempdesc = document.querySelector('.temp-desc');
    let tempdeg = document.querySelector('.temp-deg');
    let timezone = document.querySelector('.location-timezone');
    let tempsec = document.querySelector('.temp-section');
    let tempspan = document.querySelector('.temp-section span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fde716a4de629c5ea60ae0faf785cee0/${lat},${long}`;
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then( data => {
                console.log(data);
                const{temperature, summary, icon} = data.currently;
                
                //Set DOM Elements from the API
                tempdeg.textContent = temperature;
                tempdesc.textContent = summary;
                timezone.textContent = data.timezone;

                //Formula to convert in celsius
                let celsius = (temperature - 32) * (5 / 9);

                //Set Icons
                setIcons(icon, document.querySelector('#icon'));

                //Change temp to deg or Far
                tempsec.addEventListener('click', ()=>{
                    if(tempspan.textContent === "F"){
                        tempspan.textContent = "C";
                        tempdeg.textContent = Math.floor(celsius);
                    }else{
                        tempspan.textContent = "F";
                        tempdeg.textContent = temperature;
                    }
                })
            });
        });
    }
    
    function setIcons(icon, iconID){
        const skycons = new Skycons({color:"white"});
        const currIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currIcon]);
    }
});