
export default class apiService {

    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchArticles() {
       return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=22451145-e0c9159451151155547fe6905`)
        .then(response => response.json())
            .then(data => {
                this.incrementPage()
                return data.hits
        });
    }

    incrementPage() {
        this.page += 1;
    }

    restPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
    
}