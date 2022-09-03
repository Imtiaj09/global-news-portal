const loadNewsCategory = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`
  const res = await fetch(url)
  const data = await res.json()
  displayNewsCategory(data.data.news_category[0].category_name)
}

const displayNewsCategory = categorys => {
  console.log(categorys)
}

loadNewsCategory()