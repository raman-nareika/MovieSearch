import Card from "../models/Card";
import AppView from "../views/AppView";

export default class App {
  constructor() {
    this.state = {
      omdbApiKey: "6aa02bef",
      yandexApiKey: "trnsl.1.1.20200509T202353Z.eb882558f22b790e.d416df95ae3da741d0c72c97ab2852ecdebaaab6",
    };
  }

  async start() {
    const model = new Card(this.state);
    const data = await model.getFilms();
    const view = new AppView(data);

    view.render();
  }
}
