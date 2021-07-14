// import './sass/main.scss';
// const options = {
//     headers: { Authorization: '22451145-e0c9159451151155547fe6905' },
// };
    
import ApiService from './js/apiService';
import articleTPL from "./templates/article.hbs";

const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]')
};

const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();
    clearArtikleContainer();

    apiService.query = e.currentTarget.elements.query.value
    apiService.restPage();
    apiService.fetchArticles().then(appendArticlesMarkup);

}

function onLoadMore() {
    apiService.fetchArticles().then(appendArticlesMarkup);
};

function appendArticlesMarkup(articles) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', articleTPL(articles))
}

function clearArtikleContainer() {
    refs.galleryContainer.innerHTML = '';
}
