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
const divContainer = document.createElement('div');
divContainer.id = 'news-container';
divContainer.style.display = 'flex';
divContainer.style.flexDirection = 'column';
divContainer.style.justifyContent = 'space-between';
divContainer.style.alignItems = 'center';
divContainer.style.width = '100%';
divContainer.style.height = 'auto';
divContainer.innerHTML = sideNews.map(item => `
    <div style="flex: 1;border: 1px solid #ccc; padding: 10px; margin: 10px; width: 560px; height: auto; display: inline-block;">
        <img src="${item.image}" alt="News Image" style="width: 120px; height: 80px;">
        <h2>${item.author}</h2>
        <h3>${item.headline}</h3>
        <p>${item.summary}</p>
        <small>${item.publishDate}</small>
        <button style="margin-top: 10px; padding: 5px 10px; background-color: #007BFF; color: white; border: none; cursor: pointer;" onclick="readMore('${item.id}')">Read More</button>
    </div>
`).join('');


// Add a function to handle the "Read More" button click
function readMore(id) {
  const newsItem = sideNews.find(item => item.id === id);
  if (newsItem) {
    alert(`Full details:\n\nHeadline: ${newsItem.headline}\nAuthor: ${newsItem.author}\nSummary: ${newsItem.summary}\nPublished: ${newsItem.publishDate}`);
  }
}


const mount = el => {
  if (el) {
    el.appendChild(divContainer);
  } 
}

// If you want to run this in isolation
if (process.env.NODE_ENV === 'development') {
  const devNews = document.getElementById('dev-news');
  if (devNews) {
    mount(devNews);
  }
}
// We are running through container
export { mount };