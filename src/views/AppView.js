import {
  Swiper, Navigation, Pagination, Scrollbar,
} from "swiper/js/swiper.esm";

export default class AppView {
  constructor(data) {
    this.data = data;
    Swiper.use([Navigation, Pagination, Scrollbar]);
    this.swiper = new Swiper(".swiper-container", {
      speed: 500,
      slidesPerView: "auto",
      spaceBetween: 30,
      freeMode: true,
      updateOnWindowResize: true,
      initialSlide: 1,
      centeredSlides: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  render() {
    this.fillGallery(this.data);
    this.swiper.init();
    document.querySelector("[type=\"search\"]").focus();
  }

  fillGallery(data) {
    const slides = this.arrangeSlides(data);
    this.swiper.appendSlide(slides);
  }

  arrangeSlides(data) {
    return data.map((film) => `<div class="swiper-slide">
                                <div>
                                  <h3>
                                    <a class="nav-link" href="https://www.imdb.com/title/${film.imdbId}/" target="_blank">${film.title}</a>
                                  </h3>
                                </div>
                                <div>
                                  <img class="poster" src="${film.poster}" />
                                </div>
                                <div>
                                  <span>${film.year}</span>
                                </div>
                              </div>`);
  }

  updateSlider(data) {
    this.swiper.removeAllSlides();
    this.fillGallery(data);
    this.swiper.init();
  }

  showNotFound(request) {
    const container = document.querySelector(".alert-danger");

    container.innerHTML = `No results for "${request}"`;
    container.classList.remove("d-none");
    container.classList.add("d-inline-block");
  }

  showTranslation(translated) {
    const container = document.querySelector(".alert-info");

    container.innerHTML = `Showing results for "${translated}"`;
    container.classList.remove("d-none");
    container.classList.add("d-inline-block");
  }

  hideNotFound() {
    const container = document.querySelector(".alert-danger");

    container.classList.add("d-none");
    container.classList.remove("d-inline-block");
  }

  hideTranslation() {
    const container = document.querySelector(".alert-info");

    container.classList.add("d-none");
    container.classList.remove("d-inline-block");
  }

  hide() {
    this.hideNotFound();
    this.hideTranslation();
  }
}
