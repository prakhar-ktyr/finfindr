import Nav from '../components/Nav';
import AuthModal from "../components/AuthModal";
import {useState, useEffect} from 'react';
import {useCookies} from "react-cookie";
import axios from 'axios';

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [news, setNews] = useState([]);
    const authToken = cookies.AuthToken;

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://finfindr-bcab9a51da87.herokuapp.com/fetch-news');
                setNews(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    const handleClick = () => {
        if (authToken) {
            removeCookie('UserId', cookies.UserId);
            removeCookie('AuthToken', cookies.AuthToken);
            window.location.reload();
            return;
        }

        setShowModal(true);
        setIsSignUp(true);
    };

    const handleShare = (event, article) => {
        event.stopPropagation(); // Prevents the link from being triggered when the share button is clicked
        if (navigator.share) {
            try {
                navigator.share({
                    title: article.title,
                    text: article.description,
                    url: article.url,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            console.log('Share API not supported');
        }
    };

    return (
        <div className="overlay">
            <Nav authToken={authToken} minimal={false} setShowModal={setShowModal} showModal={showModal} setIsSignUp={setIsSignUp}/>
            <div className="home">
                <h1 className="primary-title">
                    <span className="line">
                        <span className="word" id="connect">Connect.</span>
                        <span className="word" id="empower">Empower.</span>
                    </span>
                    <span className="word line" id="achieve">Achieve.</span>
                </h1>

                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'Signout' : 'Create Account'}
                </button>

                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                )}

                <h2 className="news-section-title">Discover the top and trending finance news right now</h2>

                <div className="news-section">
                    {news.map((article, index) => (
                        <div key={index} className="news-article">
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="article-link">
                                <img src={article.urlToImage} alt={article.title} className="news-image" />
                                <h3>{article.title}</h3>
                                <p>{article.description}</p>
                            </a>
                            <button className="share-button" onClick={(e) => handleShare(e, article)}>Share</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
