/**
 * ==========================================================
 * LÉLUVERSE
 * WEATHER TYPES
 * ==========================================================
 *
 * Weather is a living system that affects every world,
 * biome, civilization and creature.
 */

export type WeatherType =
  | "Clear"
  | "Cloudy"
  | "Rain"
  | "Storm"
  | "Thunder"
  | "Snow"
  | "Fog"
  | "Wind"
  | "Aurora"
  | "MeteorShower"
  | "IdeaRain"
  | "MemoryShower"
  | "CrystalRain"
  | "FlowerBloom"
  | "LeafFall"
  | "Fireflies"
  | "Lightning"
  | "Sandstorm"
  | "DreamMist";

export interface WeatherState {

  weather: WeatherType;

  temperature: number;

  humidity: number;

  windSpeed: number;

  cloudCover: number;

  visibility: number;

  intensity: number;

  duration: number;

  active: boolean;

}