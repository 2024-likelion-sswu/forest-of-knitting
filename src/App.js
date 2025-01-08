import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './components/Landing'
import Main from './components/Main/Main'
import Login from './components/Login/Login'
import Signup from './components/Login/Signup'
import KnitTime from './components/Knit-time/KnitTime'
import RecordKnit from './components/Main/RecordKnit'
import TimerStart from './components/Knit-time/TimerStart'
import Gallery from './components/Gallery/Gallery'
import DetailedGallery from './components/Gallery/DetailedGallery'
import DesignTime from './components/Knit-time/DesignTime'


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
                <Route path='/knittime/timerstart' element={<TimerStart/>} />
                <Route path='/knittime/designtime' element={<DesignTime/>} />
                <Route path='/gallery' element={<Gallery/>} />
                <Route path='/gallery/detailedgallery' element={<DetailedGallery/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App