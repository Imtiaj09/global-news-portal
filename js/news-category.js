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
        ${news.details.slice(0, 250)}...<span class="text-primary">See more</span>
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
      <small class="text-muted"><i class="bi bi-eye"></i> ${news.total_view ? news.total_view : 0}</small>
      <button onclick="loadNewsDetails('${news._id}')" href="#" class="btn btn-primary btn-sm" data-bs-toggle="modal"
      data-bs-target="#newsDetailModal">Details</button>
    </div>
    </div>
    `
    cardsContainer.appendChild(newCardDiv);
  }
}

const loadNewsDetails = async news_id => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`
  const res = await fetch(url);
  const data = await res.json();
  displayNewsDetails(data.data)
}

const displayNewsDetails = news => {
  console.log(news)
  const modalTitale = document.getElementById('newsDetailModalLabel');
  modalTitale.innerHTML = `
  <img src="${news[0].image_url}" class="card-img-top" alt="..." />
  <p><span class="fw-bolder">News-Title:</span> ${news[0].title}</p>
  `
  const newsDetails = document.getElementById('news-details');
  newsDetails.innerHTML = `
  <h6> <span class="fw-bolder">Auther:</span> ${news[0].author.name}</h6>
  <p> <span class="fw-semibold">Rating:</span> ${news[0].rating.number}</P>
  <p> <span class="fw-semibold">Publish-date:</span> ${news[0].author.published_date}</P>
  `
}

loadNewsCategory()

loadCardCategory()

