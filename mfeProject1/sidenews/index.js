const { faker } = require('@faker-js/faker');

// Generate a single news item
function generateNewsItem() {
  return {
    id: faker.string.uuid(),
    headline: faker.lorem.sentence(),
    summary: faker.lorem.paragraph(),
    author: faker.person.fullName(),
    publishDate: faker.date.recent().toISOString(),
    image: faker.image.urlPicsumPhotos(), // optional: add image
  };
}

// Generate a list of news items
function generateSideNews(count = 5) {
  return Array.from({ length: count }, generateNewsItem);
}

// Example usage
const sideNews = generateSideNews(10);
console.log(JSON.stringify(sideNews, null, 2));

// Generate a list of news items
document.getElementById('dev-side-news').innerHTML = sideNews.map(item => `
    <div style="border: 1px solid #ccc; padding: 10px; margin: 10px; width: 200px; height: 100px; display: inline-block;">
        <img src="${item.image}" alt="News Image" style="width: 120px; height: 80px;">
        <h2>${item.author}</h2>
        <h3>${item.headline}</h3>
        <p>${item.summary}</p>
        <small>${item.publishDate}</small>
    </div>
`).join('');
console.log(newsItems);