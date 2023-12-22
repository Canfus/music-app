// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from '@radix-ui/react-tooltip';

import { MediaPlayer } from '@app/common';

import './App.css';

const App = () => (
  <Provider>
    <MediaPlayer style={{ position: 'absolute', bottom: '0' }} />
  </Provider>
);

export default App;
