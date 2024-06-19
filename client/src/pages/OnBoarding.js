import Nav from '../components/Nav'
import {useState} from 'react'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import connection from "./connection";

const OnBoarding = () => {
    const [cookies] = useCookies(null)
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        name: "",
        dob_day: "",
        dob_month: "",
        dob_year: "",
        gender_identity: "man",
        are_you_an: "investor",
        url: "",
        about: "",
        matches: []

    })

    let navigate = useNavigate()




    const handleSubmit = async (e) => {
        console.log('submitted')
        e.preventDefault();
        try {
            const response = await axios.put(connection.userEndpoint, {formData});
            //const response = await axios.put('https://finfindrbackend.onrender.com/user', {formData})
            console.log(response)
            const success = response.status === 200
            if (success) {
                // Redirect based on the role selected
                if (formData.are_you_an === 'investor') {
                    navigate('/investor'); // Redirect to the investor page
                } else if (formData.are_you_an === 'advisor') {
                    navigate('/advisor'); // Redirect to the advisor page
                }
            }
        } catch (err) {
            console.log(err)
        }
    }



    const handleChange = (e) => {
        console.log('e', e)
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <>
            <Nav
                minimal={true}
                setShowModal={() => {
                }}
                showModal={false}
            />

            <div className="onboarding">
                <h2>CREATE ACCOUNT</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">Name</label>
                        <input
                            id="name"
                            type='text'
                            name="name"
                            placeholder="Name"
                            required={true}
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <label>Birthday</label>
                        <div className="multiple-input-container">
                            <input
                                id="dob_day"
                                type="number"
                                name="dob_day"
                                placeholder="DD"
                                required={true}
                                value={formData.dob_day}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_month"
                                type="number"
                                name="dob_month"
                                placeholder="MM"
                                required={true}
                                value={formData.dob_month}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_year"
                                type="number"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
                            />
                        </div>

                        <label>Are you an?</label>
                        <div className="multiple-input-container">
                            <input
                                id="investor-identity"
                                type="radio"
                                name="are_you_an"
                                value="investor"
                                onChange={handleChange}
                                checked={formData.are_you_an === "investor"}
                            />
                            <label htmlFor="investor-identity">Investor</label>
                            <input
                                id="advisor-identity"
                                type="radio"
                                name="are_you_an"
                                value="advisor"
                                onChange={handleChange}
                                checked={formData.are_you_an === "advisor"}
                            />
                            <label htmlFor="advisor-identity">Financial Advisor</label>

                        </div>

                        <label>Gender</label>
                        <div className="multiple-input-container">
                            <input
                                id="man-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="man"
                                onChange={handleChange}
                                checked={formData.gender_identity === "man"}
                            />
                            <label htmlFor="man-gender-identity">Man</label>
                            <input
                                id="woman-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender_identity === "woman"}
                            />
                            <label htmlFor="woman-gender-identity">Woman</label>
                            <input
                                id="more-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="others"
                                onChange={handleChange}
                                checked={formData.gender_identity === "others"}
                            />
                            <label htmlFor="more-gender-identity">Others</label>
                        </div>




                        <label htmlFor="about">About me</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            placeholder="I am interested in..."
                            value={formData.about}
                            onChange={handleChange}
                        />

                        <input type="submit"/>
                    </section>

                    <section>

                        <label htmlFor="url">Profile Photo</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />


                        <div className="photo-container">
                            {formData.url && <img src={formData.url} alt="profile pic preview"/>}
                        </div>


                    </section>

                </form>
            </div>
        </>
    )
}
export default OnBoarding