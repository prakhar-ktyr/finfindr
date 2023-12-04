import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import OnBoarding from './pages/OnBoarding'
import Investor from './pages/Investor'
import Advisor from './pages/Advisor'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {useCookies} from 'react-cookie'

const App = () => {
    const [cookies] = useCookies(['user'])

    const authToken = cookies.AuthToken

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                {authToken && <Route path="/dashboard" element={<Dashboard/>}/>}
                {authToken && <Route path="/onboarding" element={<OnBoarding/>}/>}
                {authToken && <Route path="/investor" element={<Investor/>}/>}
                {authToken && <Route path="/advisor" element={<Advisor/>}/>}

            </Routes>
        </BrowserRouter>
    )
}

export default App