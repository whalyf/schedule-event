import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import './global.css';
import { RouteApp } from './routes';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" />
      <AuthProvider>
        <Header />
        <RouteApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
