import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import {camelCaseKeys} from 'camelcase-keys'

const ACCESS_KEY = 'a671d6f2f4ee3a959964ae5c64f21d15'
const API_URL = 'https://api.openweather.org/data/2.5/'

export class WeatherAPI extends RESTDataSource {
    constructor(){
        super()
        this.baseURL = this.API_URL
    }

    willSendRequest(request: RequestOptions) {
        request.params.set('appid', ACCESS_KEY)
    }

    async coordinates(lat: number, lon: number) {
        const data = await this.get('weather', {lat, lon})
        return camelCaseKeys(data, {deep: true})
    }

    async city(cityName: string) {
        const data = await this.get('weather', {cityName})
        return camelCaseKeys(data, {deep: true})
    }

    async zipCode(zip: number) {
        const data = await this.get('weather', {zip})
        return camelCaseKeys(data, {deep: true})
    }
}

export const dataSources = () => ({ weatherAPI: new WeatherAPI() }) 