export default class ApiClient {
  constructor(omdbApiKey, yandexApiKey) {
    this.omdbApiKey = omdbApiKey;
    this.yandexApiKey = yandexApiKey;
  }

  async searchDefault(text) {
    if (this.isRussian(text)) {
      text = await this.translate(text);
    }

    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${this.omdbApiKey}`;
    const response = await fetch(url, {
      method: "GET",
    });
    const json = await response.json();
    return json;
  }

  async search(text) {
    if (this.isRussian(text)) {
      text = await this.translate(text);
    }

    const url = `http://www.omdbapi.com/?apikey=6aa02bef&s=${text}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  }

  isRussian(text) {
    return /[а-яА-Я]+/.test(text);
  }

  async translate(text) {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.yandexApiKey}&text=${text}&lang=en`;
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
