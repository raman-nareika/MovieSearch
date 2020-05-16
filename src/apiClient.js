export default class ApiClient {
  constructor(omdbApiKey, yandexApiKey) {
    this.omdbApiKey = omdbApiKey;
    this.yandexApiKey = yandexApiKey;
  }

  async searchDefault() {
    const url = `https://www.omdbapi.com/?i=tt3896198&apikey=${this.omdbApiKey}`;
    const response = await fetch(url, {
      method: "GET",
    });
    const json = await response.json();
    return json;
  }

  async search(text) {
    const url = `https://www.omdbapi.com/?apikey=${this.omdbApiKey}&s=${text}`;
    const response = await fetch(url, {
      method: "GET",
    });
    const jsonObject = await response.json();
    return jsonObject.Search;
  }

  async getRating(id) {
    const url = `https://www.omdbapi.com/?apikey=${this.omdbApiKey}&i=${id}`;
    const response = await fetch(url, {
      method: "GET",
    });
    const jsonObject = await response.json();
    return jsonObject.Ratings;
  }
}
