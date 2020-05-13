import ApiClient from "./apiClient";
import Card from "./models/Card";

export default class FirmService {
  constructor(keys) {
    this.keys = keys;
  }

  async getDefaultFilms() {
    try {
      const { omdbApiKey, yandexApiKey } = this.keys;
      const client = new ApiClient(omdbApiKey, yandexApiKey);
      const json = await client.searchDefault();
      const films = FirmService.parseFilms(json);
      global.console.log(films);
    } catch (e) {
      global.console.log(e);
    }
  }

  async getFilms(text) {
    const { omdbApiKey, yandexApiKey } = this.state;
    const client = new ApiClient(omdbApiKey, yandexApiKey);
    const result = await client.search(text);
    const films = FirmService.parseFilms(result);
    global.console.log(films);
  }

  static parseFilms(response) {
    if (Array.isArray(response)) {
      return response.map((f) => new Card(f.Title, f.Poster, f.Year,
        FirmService.getRating(f.Rating)));
    }

    return [new Card(response.Title, response.Poster, response.Year,
      FirmService.getRating(response.Ratings))];
  }

  static getRating(rating) {
    if (rating) {
      return rating[0].Value;
    }

    return null;
  }
}
