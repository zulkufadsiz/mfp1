import {mount as mountNews} from 'news/News';
import {mount as mountSideNews} from 'sideNews/News';

const news = document.getElementById('prod-news');
const sideNews = document.getElementById('prod-sidenews');

if (sideNews) {
  mountSideNews(sideNews);
}else {
  console.error('Element with id "prod-sidenews" not found.');
}
if (news) {
  mountNews(news);
}
else {
  console.error('Element with id "news" not found.');
}
