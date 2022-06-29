import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import Install from './components/Install';
import Home from './components/Home';

function App(){
    return window.ethereum != null ? <Home/> : <Install/>
}

export default App;