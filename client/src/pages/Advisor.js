import Nav from '../components/Nav';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useCookies} from "react-cookie";
import connection from './connection'; // Adjust the path as needed

const Advisor = () => {
    const [cookies] = useCookies(null)
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        avg_portfolio_vol: "",
        max_portfolio_vol: "",
        years_experience: "",
        sebi_registered: false,
        pnet_worth: ""
    })

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        console.log('submitted');
        e.preventDefault();

        // Append 'Net Worth ' to the pnet_worth value
        const updatedFormData = {
            ...formData,
            avg_portfolio_vol: "Average volume of portfolio" + formData.avg_portfolio_vol,
            max_portfolio_vol: "Maximum volume of portfolio: " + formData.max_portfolio_vol,
            years_experience: formData.years_experience + " of experience",
            sebi_registered: formData.sebi_registered,
            pnet_worth: "Net Worth: " + formData.pnet_worth,
        };

        try {
            const response = await axios.put(connection.advisorEndpoint, { formData: updatedFormData });
            //const response = await axios.put('https://finfindrbackend.onrender.com/advisor', { formData: updatedFormData });
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

            <div className="advisor-form">
                <h2>Advisor Information</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="avg_portfolio_vol">Average Volume of Portfolio Handled</label>
                        <input
                            type="text"
                            name="avg_portfolio_vol"
                            value={formData.avg_portfolio_vol}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="max_portfolio_vol">Maximum Volume of Portfolio Handled</label>
                        <input
                            type="text"
                            name="max_portfolio_vol"
                            value={formData.max_portfolio_vol}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="years_experience">Years of Experience</label>
                        <div className="multiple-input-container">
                        <input type="radio" id="experience1" name="years_experience" value="less than 5yrs" onChange={handleChange} />
                        <label htmlFor="experience1">less than 5yrs</label>
                        <input type="radio" id="experience2" name="years_experience" value="5yrs-15yrs" onChange={handleChange} />
                        <label htmlFor="experience2">5yrs-15yrs</label>
                        <input type="radio" id="experience3" name="years_experience" value="more than 15yrs" onChange={handleChange} />
                        <label htmlFor="experience3">more than 15yrs</label>
                        </div>

                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                name="sebi_registered"
                                id="sebi_registered"
                                checked={formData.sebi_registered}
                                onChange={handleChange}
                            />
                            <label htmlFor="sebi_registered">SEBI Registered</label>
                        </div>

                        <label>Preferred Investor Net Worth?</label>
                        <div className="multiple-input-container">
                            <input type="radio" id="netWorth1" name="pnet_worth" value="less than 5L" onChange={handleChange} />
                            <label htmlFor="netWorth1">less than 5L</label>
                            <input type="radio" id="netWorth2" name="pnet_worth" value="5L-15L" onChange={handleChange} />
                            <label htmlFor="netWorth2">5L-15L</label>
                            <input type="radio" id="netWorth3" name="pnet_worth" value="more than 15L" onChange={handleChange} />
                            <label htmlFor="netWorth3">more than 15L</label>
                            <input type="radio" id="netWorth4" name="pnet_worth" value="no preference" onChange={handleChange} />
                            <label htmlFor="netWorth4">no preference</label>
                        </div>

                        <input type="submit" value="Submit" />
                    </section>
                </form>
            </div>
        </>
    );
};

export default Advisor;
