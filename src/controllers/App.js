import FirmService from "../FirmService";
import TranslationService from "../translationService";
import AppView from "../views/AppView";

export default class App {
  constructor() {
    this.keys = {
      omdbApiKey: "6aa02bef",
      yandexApiKey: "trnsl.1.1.20200509T202353Z.eb882558f22b790e.d416df95ae3da741d0c72c97ab2852ecdebaaab6",
    };
    this.service = new FirmService(this.keys.omdbApiKey);
    this.translationService = new TranslationService(this.keys.yandexApiKey);
    this.view = null;
    this.bind();
  }

  async start() {
    const films = await this.service.getDefaultFilms();
    this.view = new AppView(films);

    this.view.render();
  }

  bind() {
    document.getElementById("searchForm").addEventListener("submit", async (e) => {
      const spinner = document.querySelector(".spinner-border");
      e.preventDefault();
      spinner.classList.remove("d-none");
      this.view.hideNotFound();
      const request = document.querySelector("[type='search']").value;
      const trimmedRequest = request.trim();
      let translated = "";

      if (this.translationService.isRussian(trimmedRequest)) {
        translated = await this.translationService.translate(trimmedRequest);
      }
      const newFilms = await this.service.getFilms(translated || trimmedRequest);
      spinner.classList.add("d-none");
      if (newFilms.length > 0) {
        this.view.updateSlider(newFilms);
        if (translated) {
          this.view.showTranslation(translated);
        }
      } else {
        this.view.hideTranslation();
        this.view.showNotFound(translated || trimmedRequest);
      }
    });
  }

  async searchHandler(e) {
    e.preventDefault();
    this.view.hideNotFound();
    const request = document.querySelector("[type='search']").value;
    const trimmedRequest = request.trim();
    let translated = "";

    if (this.translationService.isRussian(trimmedRequest)) {
      translated = await this.translationService.translate(trimmedRequest);
    }
    const newFilms = await this.service.getFilms(trimmedRequest);

    if (newFilms.length > 0) {
      this.view.updateSlider(newFilms);
      if (translated) {
        this.view.showTranslation(translated);
      }
    } else {
      this.view.showNotFound(trimmedRequest);
    }
  }
}
