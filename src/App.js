import './App.css';
import { Home, Login, ProductDetail, Purchases } from "./pagesComponents";
import { HashRouter, Routes, Route} from "react-router-dom";
import { LoadingScreen, Navbar, ProtectedRoutes} from './components';
import { useSelector } from 'react-redux';

function App() {

  const isLoading = useSelector((state) => state.isLoading);

  return (
    <HashRouter>
      <Navbar />
      { isLoading && <LoadingScreen />}
      <Routes>
        <Route path = "/" element = {<Home />}/>
        <Route path = "/products/:id" element = {<ProductDetail />}/>
        <Route path = "/login" element = {<Login />}/>
        <Route element={<ProtectedRoutes />}>
           <Route path = "/purchases" element = {<Purchases />}/>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
