import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './components/Landing'
import Main from './components/Main/Main'
import Login from './components/Login/Login'
import Signup from './components/Login/Signup'
import KnitTime from './components/Knit-time/KnitTime'
import RecordKnit from './components/Main/RecordKnit'


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/main' element={<Main />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/signup' element={<Signup/>} />
                <Route path='/record' element={<RecordKnit/>} />
                <Route path='/knittime' element={<KnitTime/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App