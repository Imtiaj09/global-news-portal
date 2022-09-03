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
  console.log(allNews)
}

loadNewsCategory()


