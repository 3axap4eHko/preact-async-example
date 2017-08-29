import { h } from 'preact';
import 'babel-core/register';
import HackerNews from './HackerNews';

export default function App({ children }) {
  return (
    <div>
      <HackerNews />
    </div>
  );
}