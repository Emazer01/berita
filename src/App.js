import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes, Route} from 'react-router-dom';

import { Main } from './Pages/Main';
import { Login } from './Pages/Login';
import { Profile } from './Pages/Profile';
import { Register } from './Pages/Register';
import { Cari } from './Pages/Cari';
import { Pasang } from './Pages/Pasang';
import { View } from './Pages/View';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profil" element={<Profile />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/cari" element={<Cari />}></Route>
        <Route path="/pasang" element={<Pasang />}></Route>
        <Route path="/view" element={<View />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
