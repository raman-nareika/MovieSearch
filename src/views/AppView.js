import {
  Swiper, Navigation, Pagination, Scrollbar,
} from "swiper/js/swiper.esm";

export default class AppView {
  constructor(data) {
    this.data = data;
    Swiper.use([Navigation, Pagination, Scrollbar]);
    this.swiper = new Swiper(".swiper-container", {
      speed: 500,
      slidesPerView: 1,
      grabCursor: true,
      centeredSlides: true,
      spaceBetween: 30,
      freeMode: true,
      updateOnWindowResize: true,
      initialSlide: 1,
      lazy: true,
      touchRatio: 1,
      simulateTouch: 1,
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      keyboard: {
        enabled: true,
      },
      breakpoints: {
        375: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
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
    return data.map((film) => {
      let card = `<div class="swiper-slide card"">
                                <div class="card__header">
                                  <h4 title="${film.title}">
                                    <a class="nav-link" href="https://www.imdb.com/title/${film.imdbId}/videogallery" target="_blank">${film.title}</a>
                                  </h3>
                                </div>
                                <div>
                                  <img class="poster" src="${film.poster}" />
                                </div>
                                <div>
                                  <span>${film.year}</span>
                                </div>
                              </div>`;
      if (film.imdRating) {
        card = card.replace(/<\/div>$/, "");
        card += `<div>
                      <span class="rating-row">
                        <svg class="star-rating bi bi-star-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                        ${film.imdRating}
                      </span>
                    </div>
                  </div>`;
      }

      return card;
    });
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
