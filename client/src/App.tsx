import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientLayout from './pages/ClientLayout';
import GridProductsCard from './components/GridProducts';
import { store } from './app/store';
import { Provider as ReduxProvider } from 'react-redux';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<ClientLayout />}>
            <Route path='*' element={<GridProductsCard />} />
          </Route>
        </Routes>
      </Router>
    </ReduxProvider>
  );
};

export default App;
