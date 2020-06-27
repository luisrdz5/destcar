/* eslint-disable require-atomic-updates */
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
        this.roadsURI='https://roads.googleapis.com/v1/snapToRoads?path='
        //this.roadsURI='https://roads.googleapis.com/v1/nearestRoads?points='
        this.interpolate='&interpolate=true';
        this.origin = `origin=`;
        this.destination = `&destination=`;
        this.key = `&key=${APIKey}`;
        this.mode=`&mode=driving`
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
            const query =  country && { country };
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
            let URI = this.MapsURI+this.origin+encodeURIComponent(origin.replace(/\s/g,"+"))+this.destination+encodeURIComponent(destination.replace(/\s/g,"+"))+this.mode+this.key;
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
            let stringRoute='';
            let polylines=[];
            //let returnRoute = [];
            info.routes.map((payload) => {
                payload.legs.map((item) => {
                    distance=parseFloat(item.distance.value);
                    time=parseFloat(item.duration.value);
                    endLocation= item.end_location;
                    startLocation = item.start_location;
                    route=[...route, item.start_location];
                    stringRoute = stringRoute + `${item.start_location.lat},${item.start_location.lng}|`
                    item.steps.map((step) =>{
                        route=[...route , step.end_location ];
                        polylines=[...polylines, step.polyline]
                        stringRoute = stringRoute + `${step.start_location.lat},${step.start_location.lng}|${step.end_location.lat},${step.end_location.lng}|`;
                    });
                })
                // obtengo bounds
            });
            //calculating the rate 
            console.log(`Maps.js baserate: ${baseRate} distance:${distance} time:${time}`);
            let total = baseRate + ((distance / 1000) * costByKM)+((time / 60) * costByMinute); 
            if(total<minPayment){
                total=minPayment
            }
            total= parseFloat(total).toFixed(2);
            let returnRoute = await this.getRoute(stringRoute.slice(0, -1));
            console.log(JSON.stringify(returnRoute.warningMessage));
            returnRoute = returnRoute.snappedPoints;
            let detailedRoute = [] ;
            returnRoute.map(item => {
                detailedRoute=[...detailedRoute , {"lat":item.location.latitude, "lng":item.location.longitude}];
            });
            //console.log(`(maps.js) polylines : ${JSON.stringify(polylines)}`);
            //route=detailedRoute;
            return {money: total , time, distance, endLocation, startLocation , route, detailedRoute, polylines };

        }catch(err){
            console.log(err);
        }    
    }
    async getRoute(stringRoute){
        //console.log(`(maps.js) stringRoute es: ${stringRoute}`);
        let URI = this.roadsURI+stringRoute+this.interpolate+this.key;
        //let URI = this.roadsURI+stringRoute+this.key;
        let route= [];
        try{
            let info = await axios({
                url: URI,
                method: 'get',
                responseEncoding: 'utf8',
            });
            info = info.data;
            info.snappedPoints.map((step) =>{
                route=[...route , step.location];
            });
            //console.log(`(maps.js) info es: ${JSON.stringify(info)}`);
            return info;
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = mapsAPI;