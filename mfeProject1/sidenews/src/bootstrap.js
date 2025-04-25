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
divContainer.style.overflowY = 'auto'; // Added for scrollable content
//divContainer.style.maxHeight = '500px'; // Set a max height for the container
// Generate a list of news items
divContainer.innerHTML = sideNews.map(item => `
    <div style="border: 1px solid #ccc; padding: 10px; margin: 10px; width: 200px; minHeight: 300px; display: inline-block;">
        <img src="${item.image}" alt="News Image" style="width: 120px; height: 80px;">
        <h2>${item.author}</h2>
        <h3>${item.headline}</h3>
        <p>${item.summary}</p>
        <small>${item.publishDate}</small>
    </div>
`).join('');
const sideNewsDiv = document.getElementById('dev-side-news');
if (sideNewsDiv) {
  sideNewsDiv.appendChild(divContainer);
}
else {
  console.error('Element with id "dev-side-news" not found.');
}

const mount = el => {
  if (el) {
    el.appendChild(divContainer);
  }
  else {
    console.error('Element with id "dev-side-news" not found.');
  }
}

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devNews = document.getElementById('dev-side-news');
  if (devNews) {
    mount(devNews);
  }
}
// We are running through container
export { mount };
