import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdHelpCircleOutline } from "react-icons/io";
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import getImageURL from '../utills/getImageURL';

const Goals = () => {
    const [selectedGoals, setSelectedGoals] = useState([]);
    const [goal, setGoal] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchGoals() {
            try {
                const response = await axios.get(`${API_URL}/goals`);
                setGoal(response.data.body);
            } catch (error) {
                console.error('Error fetching goals:', error);
            }
        }
        fetchGoals();
    }, []);

    const toggleGoal = (id) => {
        if (selectedGoals.includes(id)) {
            setSelectedGoals(selectedGoals.filter(goal => goal !== id));
        } else if (selectedGoals.length < 3) {
            setSelectedGoals([...selectedGoals, id]);
        }
    };

    const nextStep = () => {
        navigate('/agerange'  , {state:{selectedGoals}}); 
    };

    return (
        <div className="process-page">
            <div className="step1">
                <div className="container">
                    <div className="process-header">
                        <div className="d-flex justify-content-between">
                            <div></div>
                            <button className="help-btn">
                                <IoMdHelpCircleOutline /> Help
                            </button>
                        </div>
                        <div className="row mt-3 px-5">
                            <div className="col-2"><div className="step active-step"></div></div>
                            <div className="col-2"><div className="step"></div></div>
                            <div className="col-2"><div className="step"></div></div>
                            <div className="col-2"><div className="step"></div></div>
                            <div className="col-2"><div className="step"></div></div>
                            <div className="col-2"><div className="step"></div></div>
                        </div>
                    </div>
                </div>
                <div className="item-container">
                    <div className="container">
                        <div className="process-heading">
                            <h2 className="mb-0">Choose Your Goal?</h2>
                            <p className="text-center">( Select Top 3 Goals )</p>
                        </div>
                        <div className="row mx-auto d-flex align-items-center justify-content-center px-5">
                            {goal && goal.map((goals) => {
                                const imageUrl = goals.image ? getImageURL(goals.image) : '';
                                return (
                                    <div className="col d-flex align-items-center justify-content-center" key={goals._id}>
                                        <div
                                            className={`item ${selectedGoals.includes(goals._id) ? 'active-item' : ''}`}
                                            onClick={() => toggleGoal(goals._id)}
                                        >
                                            <img src={imageUrl} alt={goals.title} />
                                            <p>{goals.title}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="process-footer">
                    <div className="container">
                        <button
                            onClick={nextStep}
                            disabled={selectedGoals.length === 0}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Goals;
