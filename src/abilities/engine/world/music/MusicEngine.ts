/**
 * ==========================================================
 * LÉLUVERSE
 * MUSIC ENGINE
 * ==========================================================
 *
 * Controls all music and ambient sound.
 */

import type {
  MusicTrack,
  MusicMood,
  MusicState,
} from "./MusicTypes";

class MusicEngine {

  private tracks = new Map<string, MusicTrack>();

  private state: MusicState = {

    masterVolume: 1,

    ambienceVolume: 0.7,

    effectsVolume: 0.8,

    adaptive: true,

    currentMood: "Peaceful",

  };

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("MUSIC ENGINE ONLINE");

    console.log(`Mood : ${this.state.currentMood}`);

    console.log("══════════════════════════════");

  }

  public add(track: MusicTrack): void {

    this.tracks.set(track.id, track);

  }

  public getAll(): MusicTrack[] {

    return [...this.tracks.values()];

  }

  public setMood(mood: MusicMood): void {

    this.state.currentMood = mood;

  }

  public getState(): MusicState {

    return this.state;

  }

}

const musicEngine = new MusicEngine();

export default musicEngine;