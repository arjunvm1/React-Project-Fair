import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Home from './pages/Home';
import Footer from './components/Footer';
import Auth from './components/Auth';
import { useContext } from 'react';
import { tokenAuthorizationContext } from './context/TokenAuth';





function App() {
  const {isAuthorized, setIsAuthorized} = useContext(tokenAuthorizationContext)
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register/>}/>
      <Route path='/dashboard' element={isAuthorized ?<Dashboard/>: <Home/>}/>
      <Route path='/projects' element={isAuthorized ?<Projects/>: <Home/>}/>
     </Routes>
     <Footer/>
    </div>
  );
}

export default App;
