import { h } from 'preact';
import 'isomorphic-fetch';
import { render } from 'preact-render-to-string';
import Express from 'express';
import App from './components/App';

const app = Express();

const staticMiddleware = Express.static('www');
app.use(staticMiddleware);

app.get('*', (req, res) => {
  Promise.resolve(render(<App />))
    .then(html => {
      res
        .status(200)
        .end(`
<html>
<head>

</head>
<body>
${html}
</body>
<script src="/js/index.js"></script>
</html>
`);
    });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});