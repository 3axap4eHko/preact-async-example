import { h, Component } from 'preact';
import { withService } from './service';

function getTopStoriesIds() {
  return fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    .then(response => response.json());
}

function fetchTopStories(ids) {
  return Promise.all(ids.slice(0, 10).map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    .then(response => response.json()),
  ));
}

@withService({
  service: () => getTopStoriesIds().then(fetchTopStories),
  mapToProps: items => ({ items }),
})
export default class HackerNews extends Component {
  render({ items }) {
    return (
      <div>
        <h1>Top 10 Hacker News</h1>
        {items.map(({ id, title, url }) => <div key={id}><a href={url} title={title}>{title}</a></div>)}
      </div>
    );
  }
}