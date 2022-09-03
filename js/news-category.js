const loadNewsCategory = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`
  const res = await fetch(url)
  const data = await res.json()
  const categorys = data.data.news_category;
  const menuEategory = document.getElementById('menu-category');
  for (const category of categorys) {
    const newLi = document.createElement('li')
    newLi.innerHTML = `
    <a onclick="loadCardCategory('${category.category_id}')"class="nav-link text-dark" aria-current="page" href="#">${category.category_name}</a>
    `
    menuEategory.appendChild(newLi);

  }

}

const loadCardCategory = async (categoryId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
  const res = await fetch(url)
  const data = await res.json()
  const allNews = data.data
  const cardsContainer = document.getElementById('cards-container');
  cardsContainer.innerHTML = '';
  for (const news of allNews) {
    const newCardDiv = document.createElement('div');
    newCardDiv.classList.add("col")

    newCardDiv.innerHTML = `
    <div class="card">
    <img src="${news.thumbnail_url}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${news.title}</h5>
      <p class="card-text">
        ${news.details.slice(0, 250)}...see more
      </p>
    </div>
    <div class="card-footer">
      <div class="d-flex align-items-center">
        <div>
          <img
            class="author-profile rounded-circle"
            src="${news.author.img}"
            alt=""
          />
        </div>
        <div>
          <h5>${news.author.name ? news.author.name : 'N/A'}</h5>
          <h6>${news.author.published_date ? news.author.published_date.slice(0, 10) : 'N/A'}</h6>
        </div>
      </div>
      <small class="text-muted"><i class="bi bi-eye"></i>${news.total_view ? news.total_view : 0}</small>
      <button>serch</button>
    </div>
    </div>
    `
    cardsContainer.appendChild(newCardDiv);
  }
}

loadNewsCategory()

loadCardCategory()

