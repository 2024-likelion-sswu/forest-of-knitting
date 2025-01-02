import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './components/Landing'
import Main from './components/Main/Main'
import Login from './components/Login/Login'
import KnitTime from './components/Knit-time/KnitTime'


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/main' element={<Main />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/knittime' element={<KnitTime/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App