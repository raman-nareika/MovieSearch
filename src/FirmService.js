import ApiClient from "./apiClient";
import Card from "./models/Card";

export default class FirmService {
  constructor(omdbApiKey) {
    this.client = new ApiClient(omdbApiKey);
  }

  async getDefaultFilms() {
    try {
      const json = await this.client.searchDefault();
      const films = await this.parseFilms(json);
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

    const films = this.parseFilms(result);
    return films;
  }

  async parseFilms(response) {
    if (Array.isArray(response)) {
      return Promise.all(response.map((f) => this.mapFilm(f)));
    }
    return [await this.mapFilm(response)];
  }

  async mapFilm(film) {
    return new Card(film.imdbID, film.Title, await this.getPoster(film.Poster), film.Year,
      await this.getRating(film.imdbID));
  }

  async getPoster(url) {
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

  async getRating(id) {
    try {
      const ratings = await this.client.getRating(id);

      return ratings[0].Value;
    } catch (e) {
      global.console.log(e);
    }
  }
}
