export default class Card {
  constructor(state, title, poster, year, imdRating) {
    this.state = state;
    this.title = title;
    this.poster = poster;
    this.year = year;
    this.imdRating = imdRating;
  }

  async getFilms() {
    const { omdbApiKey } = this.state;
    const url = `http://www.omdbapi.com/?apikey=${omdbApiKey}&i=tt3896198`;
    const response = await fetch(url);
    const json = await response.json();
    Card.parseFilms(json);
    global.console.log(json);
  }

  static parseFilms(json) {

  }

  isRussian(text) {
    return /[а-яА-Я]+/.test(text);
  }

  async translate(text) {
    const { yandexApiKey } = this.state;
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexApiKey}&text=${text}&lang=en`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseContent = await response.json();
    const translation = responseContent.text[0];
    return translation;
  }
}
