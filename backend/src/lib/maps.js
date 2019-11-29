const { config } = require('../config');
const axios= require('axios');
const MongoLib = require('../lib/mongo');
//const DestcarService = require('../services/destcar');

const APIKey= config.googleAPIKey;
const country= config.country;

// Disneyland y Universal+Studios+Hollywood
class mapsAPI  {
    constructor() {
        this.MapsURI= `https://maps.googleapis.com/maps/api/directions/json?`;
        this.origin = `origin=`;
        this.destination = `&destination=`;
        this.key = `&key=${APIKey}`;
        this.dinamicrate = 1;
        this.mongoDB = new MongoLib();
    }
    async getAmount({ route }){
        const {origin, destination} = route
        let costByKM;
        let costByMinute;
        let minPayment; 
        let baseRate;
        try{
            const query = country && { country };
            const quotes = await this.mongoDB.getAll('quotes',query);
            quotes.map((item) => {
                costByKM=parseFloat(item.costByKM);
                costByMinute=parseFloat(item.costByMinute);
                minPayment=parseFloat(item.minPayment);
                baseRate=parseFloat(item.base);
            })
        }catch(err){
            console.log(err);
        }
        try{
            //console.log(origin.replace(/\s/g,"+"));
            let URI = this.MapsURI+this.origin+encodeURIComponent(origin.replace(/\s/g,"+"))+this.destination+encodeURIComponent(destination.replace(/\s/g,"+"))+this.key;
            let info = await axios({
                url: URI,
                method: 'get',
                responseEncoding: 'utf8',
            });
            info = info.data
            let distance;
            let time;
            let route = [];
            let endLocation= {};
            let startLocation={};
            
            info.routes.map((payload) => {
                payload.legs.map((item) => {
                    distance=parseFloat(item.distance.value);
                    time=parseFloat(item.duration.value);
                    endLocation= item.end_location;
                    startLocation = item.start_location;
                    item.steps.map((step) =>{
                        route=[...route, step.end_location , step.start_location ];
                    });
                })
            });
            //calculating the rate 
            let total = baseRate + ((distance / 1000) * costByKM)+((time / 60) * costByMinute); 
            if(total<minPayment){
                total=minPayment
            }
            total= parseFloat(total).toFixed(2);
            console.log(`(maps.js) total es: ${total}`);
            return {money: total , time, distance, endLocation, startLocation , route };

        }catch(err){
            console.log(err);
        }    
    }
}

module.exports = mapsAPI;