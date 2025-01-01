import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './components/Main/Main'
import Login from './components/Login/Login'
import KnitTime from './components/Knit-time/KnitTime'


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/knittime' element={<KnitTime/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App