import TinderCard from 'react-tinder-card'
import {useEffect, useState} from 'react'
import ChatContainer from '../components/ChatContainer'
import {useCookies} from 'react-cookie'
import axios from 'axios'

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [FinidiedUsers, setFinidiedUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const userId = cookies.UserId


    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
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
                const response = await axios.get('http://localhost:8000/finidied-users', {
                    params: { finid }
                });
                setFinidiedUsers(response.data);
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
            await axios.put('http://localhost:8000/addmatch', {
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
            updateMatches(swipedUserId)
        }
        setLastDirection(direction)
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
                                    <div
                                        style={{backgroundImage: "url(" + finidiedUser.url + ")"}}
                                        className="card">
                                        <h2>{finidiedUser.name}</h2>
                                        <h3>{finidiedUser.about}</h3>
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