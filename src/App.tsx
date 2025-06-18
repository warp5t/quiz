import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from './routes/routes';
import './App.css';

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

export function App() {
  return (
    <div>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}


