import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import  store  from './store/store';
import User from './User';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <User/>
    </div>
    </Provider>
  );
}

export default App;
