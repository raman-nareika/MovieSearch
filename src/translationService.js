export default class TranslationService {
  constructor(yandexApiKey) {
    this.yandexApiKey = yandexApiKey;
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
