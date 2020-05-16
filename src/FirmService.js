import ApiClient from "./apiClient";
import Card from "./models/Card";

export default class FirmService {
  constructor(omdbApiKey) {
    this.client = new ApiClient(omdbApiKey);
  }

  async getDefaultFilms() {
    try {
      const json = await this.client.searchDefault();
      const films = await FirmService.parseFilms(json);
      return films;
    } catch (e) {
      global.console.log(e);
    }
  }

  async getFilms(text) {
    const result = await this.client.search(text);

    if (result === undefined) {
      return [];
    }

    const films = FirmService.parseFilms(result);
    return films;
  }

  static async parseFilms(response) {
    if (Array.isArray(response)) {
      return Promise.all(response.map((f) => FirmService.mapFilm(f)));
    }
    const film = await FirmService.mapFilm(response);
    global.console.log(film);
    return [await FirmService.mapFilm(response)];
  }

  static async mapFilm(film) {
    return new Card(film.imdbID, film.Title, await FirmService.getPoster(film.Poster), film.Year,
      await FirmService.getRating(film.imdbID));
  }

  static async getPoster(url) {
    if (url === "N/A") {
      return "./assets/images/na.png";
    }

    try {
      await fetch(url, {
        method: "GET",
      });
      return url;
    } catch {
      return "./assets/images/not-found.jpg";
    }
  }

  static async getRating(id) {
    const ratings = await this.client.getRating(id);

    return ratings[0].Value;
  }
}
