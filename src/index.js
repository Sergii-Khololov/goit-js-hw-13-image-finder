import ApiService from './js/apiService';
import articleTPL from './templates/article.hbs';
import LoadMoreBtn from './js/load-btn';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', feathArticl);

function onSearch(e) {
  e.preventDefault();
  
  apiService.query = e.currentTarget.elements.query.value;
  if (apiService.query === '') {
    return alert('Не правильный ввод. Попробуёте ещё раз !')
  }

  clearArtikleContainer();
  apiService.restPage();
  loadMoreBtn.show();

  feathArticl();
}

function feathArticl() {
  loadMoreBtn.disable();
  apiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    loadMoreBtn.enable();
  });
}

function appendArticlesMarkup(articles) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', articleTPL(articles));
}

function clearArtikleContainer() {
  refs.galleryContainer.innerHTML = '';
}
