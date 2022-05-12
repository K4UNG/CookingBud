import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Recipe from './pages/Recipe'
import Cuisine from './pages/Cuisine';
import Search from './pages/Search';
import Ingredients from './pages/Ingredients';
import Result from './pages/Result'
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipe/:id' element={<Recipe />} />
        <Route path='/cuisine/:cuisine' element={<Cuisine />} />
        <Route path='/search/:query' element={<Search />} />
        <Route path='/ingredients' element={<Ingredients />} />
        <Route path='/result' element={<Result />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
