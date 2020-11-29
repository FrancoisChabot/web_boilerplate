import * as preact from 'preact';
import Router from 'preact-router';

import { Lost } from './pages/Lost';
import { Landing } from './pages/Landing';

const Root = () => {
  return (
    <Router>
      <Landing path="/" />
      <Lost default />
    </Router>
  );
};

preact.render(<Root />, document.body);
