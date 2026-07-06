/**
 * ==========================================================
 * LÉLUVERSE
 * WEATHER ENGINE
 * ==========================================================
 */

import type { WeatherState } from "./WeatherTypes";

class WeatherEngine {

  private state: WeatherState = {

    weather: "Clear",

    temperature: 22,

    humidity: 50,

    windSpeed: 0,

    cloudCover: 10,

    visibility: 100,

    intensity: 0,

    duration: 0,

    active: true,

  };

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("WEATHER ENGINE ONLINE");

    console.log(`Weather : ${this.state.weather}`);

    console.log("══════════════════════════════");

  }

  public getState(): WeatherState {

    return this.state;

  }

  public setWeather(weather: WeatherState): void {

    this.state = weather;

  }

}

const weatherEngine = new WeatherEngine();

export default weatherEngine;