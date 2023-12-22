import { Provider } from '@radix-ui/react-tooltip';

import { Router } from '@app/router';

import './App.css';

export const App = () => (
  <Provider>
    <Router />
  </Provider>
);
