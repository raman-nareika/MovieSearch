import FirmService from "../FirmService";
import AppView from "../views/AppView";

export default class App {
  constructor() {
    this.keys = {
      omdbApiKey: "6aa02bef",
      yandexApiKey: "trnsl.1.1.20200509T202353Z.eb882558f22b790e.d416df95ae3da741d0c72c97ab2852ecdebaaab6",
    };
  }

  async start() {
    const service = new FirmService(this.keys);
    const films = await service.getDefaultFilms();
    const view = new AppView(films);

    view.render();
  }
}
