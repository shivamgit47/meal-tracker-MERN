
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Homepage from './components/Homepage';
import Addmeal from './components/Addmeal';
import Addfood from './components/Addfood';
import Navbar from './components/Navbar';
import Editfood from './components/Editfood';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>

          <Route element={<PrivateComponent/>}>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/Addmeal' element={<Addmeal/>}/>
            <Route path='/Addfood/:mealnumber' element={<Addfood/>}/>
            <Route path='/Editfood/:id' element={<Editfood/>}/>
            <Route path='/logout' element={<h1>logout component</h1>}/>
            <Route path='/getChart' element={<h1>chart component</h1>}/>
            
            
          </Route>
          
            <Route path='/SignUp' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
