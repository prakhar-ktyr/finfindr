import Nav from '../components/Nav'
import AuthModal from "../components/AuthModal"
import {useState} from 'react'
import {useCookies} from "react-cookie"

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const authToken = cookies.AuthToken

    const handleClick = () => {
        if (authToken) {
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }

        setShowModal(true)
        setIsSignUp(true)
    }
    return (
        <div className="overlay">
            <Nav
                 authToken={authToken}
                 minimal={false}
                 setShowModal={setShowModal}
                 showModal={showModal}
                 setIsSignUp={setIsSignUp}
            />
            <div className="home">
                <h1 className="primary-title">
                    <span className="line">
                        <span className="word" id="connect">Connect.</span>
                        <span className="word" id="empower">Empower.</span>
                    </span>
                    <span className="word line" id="achieve">Achieve.</span>
                </h1>


                <buttom className="primary-button" onClick={handleClick}>
                    {authToken ? 'Signout' : 'Create Account'}
                </buttom>

                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                )}
            </div>
        </div>
    )
}

export default Home