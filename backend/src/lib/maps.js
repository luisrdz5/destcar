const { config } = require('../config');
const axios= require('axios');

const APIKey= config.googleAPIKey;

// Disneyland y Universal+Studios+Hollywood
class mapsAPI  {
    constructor() {
        this.MapsURI= `https://maps.googleapis.com/maps/api/directions/json?`;
        this.origin = `origin=`;
        this.destination = `&destination=`;
        this.key = `&key=${APIKey}`;
        this.dinamicrate = 1;
    }
    async getAmount({ route }){
        const {origin, destination} = route
    try{
        //console.log(origin.replace(/\s/g,"+"));
        let URI = this.MapsURI+this.origin+encodeURIComponent(origin.replace(/\s/g,"+"))+this.destination+encodeURIComponent(destination.replace(/\s/g,"+"))+this.key;
        let info = await axios({
            url: URI,
            method: 'get',
            responseEncoding: 'utf8',
        });
        info = info.data
        let arrayLegs;
        info.routes.map((item) => {
            arrayLegs = item.legs;
        });
        let distance;
        let time;
        arrayLegs.map((item) => {
            distance=item.distance.value;
            time=item.duration.value;
        })
        console.log(distance);
        console.log(time);
        return arrayLegs;

    }catch(err){
        console.log(err);
    }

      
    }

    
}

module.exports = mapsAPI;