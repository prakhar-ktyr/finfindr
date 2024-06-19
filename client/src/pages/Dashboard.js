import TinderCard from 'react-tinder-card'
import {useEffect, useState} from 'react'
import ChatContainer from '../components/ChatContainer'
import {useCookies} from 'react-cookie'
import axios from 'axios'

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [FinidiedUsers, setFinidiedUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const userId = cookies.UserId

    const updateDirection = (direction) => {
        setLastDirection(direction);
        setTimeout(() => setLastDirection(null), 2000); // Clear after 2 seconds
    }

    const getUser = async () => {
        try {
            const response = await axios.get('https://finfindr-bcab9a51da87.herokuapp.com/user', {
                params: {userId}
            })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getOppositeFinid = (areYouAn) => {
        // Modify this function as needed
        if (areYouAn === 'investor') return 'advisor';
        if (areYouAn === 'advisor') return 'investor';
        // Add handling for other cases or undefined values
    };

    const getFinidiedUsers = async () => {
        if (user) {
            try {
                const finid = getOppositeFinid(user.are_you_an);
                const response = await axios.get('https://finfindr-bcab9a51da87.herokuapp.com/finidied-users', {
                    params: { finid }
                });

                let filteredUsers = response.data;

                // Filter based on user type and preferences
                if (user.are_you_an === 'investor') {
                    // For investor, filter advisors based on years of experience
                    filteredUsers = filteredUsers.filter(advisor => advisor.years_experience === user.pyears_experience);
                } else if (user.are_you_an === 'advisor') {
                    // For advisor, filter investors based on net worth
                    if (user.pnet_worth !== 'Net Worth: no preference') {
                        filteredUsers = filteredUsers.filter(investor => investor.net_worth === user.pnet_worth);
                    }
                }

                setFinidiedUsers(filteredUsers);
            } catch (error) {
                console.log(error);
            }
        }
    }


    useEffect(() => {
        getUser()

    }, [])

    useEffect(() => {
        if (user) {
            getFinidiedUsers()
        }
    }, [user])

    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put('https://finfindr-bcab9a51da87.herokuapp.com/addmatch', {
                userId,
                matchedUserId
            })
            getUser()
        } catch (err) {
            console.log(err)
        }
    }


    const swiped = (direction, swipedUserId) => {
        if (direction === 'right') {
            updateMatches(swipedUserId);
        }
        updateDirection(direction);
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)

    const filteredFinidiedUsers = FinidiedUsers?.filter(finidiedUser => !matchedUserIds.includes(finidiedUser.user_id))


    console.log('filteredFinidiedUsers ', filteredFinidiedUsers)
    return (
        <>
            {user &&
                <div className="dashboard">
                    <ChatContainer user={user}/>
                    <div className="swipe-container">
                        <div className="card-container">

                            {filteredFinidiedUsers?.map((finidiedUser) =>
                                <TinderCard
                                    className="swipe"
                                    key={finidiedUser.user_id}
                                    onSwipe={(dir) => swiped(dir, finidiedUser.user_id)}
                                    onCardLeftScreen={() => outOfFrame(finidiedUser.name)}>
                                    <div className="card">
                                        <div
                                            className="card-image"
                                            style={{ backgroundImage: `url(${finidiedUser.url})` }}
                                        ></div>
                                        <div className="card-details">
                                            <h1>{finidiedUser.name}</h1>
                                            <h4>{finidiedUser.net_worth}</h4>
                                            <h4>{finidiedUser.goals}</h4>
                                            <h4>{finidiedUser.risk_tolerance}</h4>
                                            <h4>{finidiedUser.sebi_registered? 'SEBI Registered' : ''}</h4>
                                            <h4>{finidiedUser.avg_portfolio_vol}</h4>
                                            <h4>{finidiedUser.max_portfolio_vol}</h4>
                                            <h4>{finidiedUser.years_experience}</h4>
                                            <h4 className="about">{finidiedUser.about}</h4>

                                        </div>
                                    </div>

                                </TinderCard>
                            )}
                            <div className="swipe-info">
                                {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}
export default Dashboard