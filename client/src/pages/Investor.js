import Nav from '../components/Nav'
import {useState} from 'react'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import connection from './connection'; // Adjust the path as needed

const Investor = () => {
    const [cookies] = useCookies(null)
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        net_worth: "",
        goals: "",
        risk_tolerance: "",
        pyears_experience: ""
    })

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        console.log('submitted');
        e.preventDefault();

        // Append 'Net Worth ' to the net_worth value
        const updatedFormData = {
            ...formData,
            net_worth: "Net Worth: " + formData.net_worth,
            goals: "Goals: " + formData.goals,
            risk_tolerance: "Risk Tolerance: " + formData.risk_tolerance,
            pyears_experience: formData.pyears_experience + " of experience",
        };

        try {
            const response = await axios.put(connection.investorEndpoint, { formData: updatedFormData });
            //const response = await axios.put('https://finfindrbackend.onrender.com/investor', { formData: updatedFormData });
            console.log(response);
            const success = response.status === 200;
            if (success) navigate('/dashboard');
        } catch (err) {
            console.log(err);
        }
    };



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
            <Nav minimal={true} />

            <div className="onboarding">
                <h2>Investor Information</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label>Net Worth</label>
                        <div className="multiple-input-container">
                            <input type="radio" id="netWorth1" name="net_worth" value="less than 5L" onChange={handleChange} />
                            <label htmlFor="netWorth1">less than 5L</label>
                            <input type="radio" id="netWorth2" name="net_worth" value="5L-15L" onChange={handleChange} />
                            <label htmlFor="netWorth2">5L-15L</label>
                            <input type="radio" id="netWorth3" name="net_worth" value="more than 15L" onChange={handleChange} />
                            <label htmlFor="netWorth3">more than 15L</label>
                        </div>

                        <label>Investment Goals</label>
                        <div className="multiple-input-container">
                            <input type="radio" id="goal1" name="goals" value="Long-term" onChange={handleChange} />
                            <label htmlFor="goal1">Long-term</label>
                            <input type="radio" id="goal2" name="goals" value="Short-term" onChange={handleChange} />
                            <label htmlFor="goal2">Short-term</label>
                        </div>

                        <label>Risk Tolerance</label>
                        <div className="multiple-input-container">
                            <input type="radio" id="risk1" name="risk_tolerance" value="Low" onChange={handleChange} />
                            <label htmlFor="risk1">Low</label>
                            <input type="radio" id="risk2" name="risk_tolerance" value="Medium" onChange={handleChange} />
                            <label htmlFor="risk2">Medium</label>
                            <input type="radio" id="risk3" name="risk_tolerance" value="High" onChange={handleChange} />
                            <label htmlFor="risk3">High</label>
                        </div>

                        <label htmlFor="pyears_experience">Preferred Advisor's Experience?</label>
                        <div className="multiple-input-container">
                            <input type="radio" id="experience1" name="pyears_experience" value="less than 5yrs" onChange={handleChange} />
                            <label htmlFor="experience1">less than 5yrs</label>
                            <input type="radio" id="experience2" name="pyears_experience" value="5yrs-15yrs" onChange={handleChange} />
                            <label htmlFor="experience2">5yrs-15yrs</label>
                            <input type="radio" id="experience3" name="pyears_experience" value="more than 15yrs" onChange={handleChange} />
                            <label htmlFor="experience3">more than 15yrs</label>
                        </div>

                        <input type="submit" value="Submit"/>
                    </section>
                </form>
            </div>
        </>
    );
};

export default Investor;
