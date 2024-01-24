import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './global.css';
import { RouteApp } from './routes';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-left" />
      <RouteApp />
    </BrowserRouter>
  );
}

export default App;
