import React from 'react';

import manOnComputer from './assets/images/man-on-computer.jpg';
import ladyOnComputer from './assets/images/lady-on-computer.jpg';
import buildings from './assets/images/buildings.jpg'

import {BsArrowLeftShort} from 'react-icons/bs';
import {BiCalendar} from 'react-icons/bi';
import {BiCheck} from 'react-icons/bi';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import formatCurrency from './helpers/formatCurrency';

import './PreApproveStage.css'

class PreApproveStages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 1,
            profession: "paid employment",
            salary: "",
            salaryDate: "",
            existingLoan: null,
            plan: 0,
            minDownPayment: 0,
            inputDownPayment: 0,
            downPayment: 0,
            shoppingCredit: 0,
            monthlyRepayment: 0,
            paymentInput: true,
        }
        this.setAmount = this.setAmount.bind(this);
        this.updateBreakdown = this.updateBreakdown.bind(this);
    };

    componentDidMount() {
        this.setState((state, props) => {
            const downPayment = props.totalPrice * 0.3;
            const shoppingCredit = props.totalPrice - downPayment;

            return {
                shoppingCredit: formatCurrency(shoppingCredit),
                minDownPayment: formatCurrency(downPayment),
                downPayment: formatCurrency(downPayment),
                inputDownPayment: formatCurrency(downPayment)
            }
        });
    }

    setAmount(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value.split(",").join("");
        if(!isNaN(value)) {
            this.setState({[name]: formatCurrency(value)});
        }
    }

    setSalaryDate(value) {
        value = value.toLocaleDateString();
        this.setState({salaryDate: value});
    }

    setExistingLoan(value) {
        this.setState({existingLoan: value});
    }

    updatePlan(noOfMonth) {
        const downPayment = this.state.downPayment.split(",").join("");
        const shoppingCredit = this.props.totalPrice - downPayment;
        const monthlyInterest = shoppingCredit * 0.04;
        const totalInterest = monthlyInterest * noOfMonth;
        let  monthlyRepayment = (shoppingCredit + totalInterest) / noOfMonth;
        monthlyRepayment = Math.ceil(monthlyRepayment);

        this.setState({
            plan: noOfMonth,
            monthlyRepayment: monthlyRepayment
        });
    }

    updateBreakdown() {
        const minDownPayment = this.state.minDownPayment.split(",").join("");
        const inputDownPayment = this.state.inputDownPayment.split(",").join("");

        if (+minDownPayment > +inputDownPayment || +inputDownPayment > +this.props.totalPrice) {
            this.setState({paymentInput: false});
        } else {
            const shoppingCredit = this.props.totalPrice - inputDownPayment;

            this.setState({
                paymentInput: true,
                shoppingCredit: formatCurrency(shoppingCredit),
                downPayment: formatCurrency(inputDownPayment),
            })
        }
    }
    
    render() {

        const stageOne = (
            <>
                <div>
                    <h2>What do you do?</h2>

                    <div className="professions">

                        <button className={"profession " + (this.state.profession === "paid employment" ? "active" : "")} onClick={() => this.setState({profession: "paid employment"})}>
                            <img src={manOnComputer} alt="paid employment"/>
                            <p>Paid Employment</p>
                        </button>

                        <button className={"profession " + (this.state.profession === "self employed" ? "active" : "")} onClick={() => this.setState({profession: "self employed"})}>
                            <img src={ladyOnComputer} alt="self employed"/>
                            <p>Self Employed/ Freelance</p>
                        </button>

                        <button className={"profession " + (this.state.profession === "corporate organization" ? "active" : "")} onClick={() => this.setState({profession: "corporate organization"})}>
                            <img src={buildings} alt="corporate organization"/>
                            <p>Corporate Organization</p>
                        </button>

                    </div>
                </div>

                <div>
                    <div className="field-group">
                        <p>How much do you get paid monthly?</p>
                        <div className="input-group">
                            <span className="purple-bg">&#8358;</span>
                            <input type="text" value={this.state.salary} name="salary"
                            onChange={this.setAmount}/>
                        </div>
                    </div>

                    <div className="field-group">
                        <p>When is your next salary date?</p>
                        <div className="input-group">
                            <span className="white-bg"><BiCalendar className="icon"/></span>
                            <DatePicker value={this.state.salaryDate} 
                            onChange={(date) => this.setSalaryDate(date)}/>
                        </div>
                    </div>

                    <div className="field-group">
                        <p>Do you have any existing loan(s)?</p>
                        <div className="input-group">
                            <div className="radio-group">
                                <div className="custom-radio-container">
                                    <input type="radio" name="loan" onClick={() => {this.setExistingLoan(true)}}/>
                                    <span className="custom-radio"><span className="inner-radio"></span></span>
                                </div>Yes
                            </div>
                            <div className="radio-group">
                                <div className="custom-radio-container">
                                    <input type="radio" name="loan" onClick={() => {this.setExistingLoan(false)}}/>
                                    <span className="custom-radio"><span className="inner-radio"></span></span>
                                </div> No
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
        
        const stageTwo = (
            <>
                <div>
                    <h2>Choose Your Plan?</h2>

                    <div className="plans">

                        <button className={"plan " + (this.state.plan === 1 ? "selected" : "")} onClick={() => this.updatePlan(1)}>
                            <div className="plan-details">
                                <span>Aggresive</span>
                                <p>1</p>
                                <span>month</span>
                            </div>
                        </button>

                        <button className={"plan " + (this.state.plan === 2 ? "selected" : "")} onClick={() => this.updatePlan(2)}>
                            <div className="plan-details">
                                <span>Stretching</span>
                                <p>2</p>
                                <span>months</span>
                            </div>
                        </button>

                        <button className={"plan " + (this.state.plan === 3 ? "selected" : "")} onClick={() => this.updatePlan(3)}>
                            <div className="plan-details">
                                <span>Focused</span>
                                <p>3</p>
                                <span>months</span>
                            </div>
                        </button>

                        <button className={"plan " + (this.state.plan === 4 ? "selected" : "")} onClick={() => this.updatePlan(4)}>
                            <div className="plan-details">
                                <span>Casual</span>
                                <p>4</p>
                                <span>months</span>
                            </div>
                        </button>

                        <button className={"plan " + (this.state.plan === 5 ? "selected" : "")} onClick={() => this.updatePlan(5)}>
                            <div className="plan-details">
                                <span>Mild</span>
                                <p>5</p>
                                <span>months</span>
                            </div>
                        </button>

                        <button className={"plan " + (this.state.plan === 6 ? "selected" : "")} onClick={() => this.updatePlan(6)}>
                            <div className="plan-details">
                                <span>Gentle</span>
                                <p>6</p>
                                <span>months</span>
                            </div>
                        </button>
                        
                    </div>
                </div>

                {this.state.plan !== 0 &&
                    <div>
                        <h2>Payment Breakdown</h2>

                        <div className="breakdown">
                            <div className="breakdown-amount-list">
                                <div className="list-title">
                                    <p>Shopping Credit</p>
                                    <p>Down Payment</p>
                                    <p>Monthly Installment</p>
                                    <p>Tenure</p>
                                </div>
                                <div className="list-amount">
                                    <p>&#8358;{this.state.shoppingCredit}</p>
                                    <p>&#8358;{this.state.downPayment}</p>
                                    <p>&#8358;{this.state.monthlyRepayment}</p>
                                    <p>{this.state.plan} Month</p>
                                </div>
                            </div>
                            <div className="gradientBg">
                                <h4>Customize Down Payment</h4>
                                <div className="input-group">
                                    <span >&#8358;</span>
                                    <input type="text"  value={this.state.inputDownPayment} name="inputDownPayment"
                                    onChange={this.setAmount} className={this.state.paymentInput ? "" : "invalid"}/>
                                </div>
                                
                                <button className="update-breakdown" onClick={this.updateBreakdown}>Update Breakdown</button>
                            </div>
                        </div>
                    </div>
                }
            </>
        )

        const stages = {
            1: stageOne,
            2: stageTwo,
        }

        return (
            <div className="pre-approve-stages">
                
                <div className="current-page">
    
                    {this.state.stage > 1 && 
                        <button className="back-arrow" onClick={() => this.setState({stage: this.state.stage - 1})}>
                            <BsArrowLeftShort className="icon"/>Back
                        </button>
                    }
    
                    <div className={`stages stage-${this.state.stage}`}>
                        <div className={"stage-number " + (this.state.stage > 1 ? "complete" : "")}>
                            {this.state.stage > 1 ? <BiCheck className="icon"/> : 1}
                        </div>
                        <div className={"stage-number " + (this.state.stage > 2 ? "complete" : "")}>{this.state.stage > 2 ? <BiCheck className="icon"/> : 2}</div>
                        <div className={"stage-number " + (this.state.stage > 3 ? "complete" : "")}>{this.state.stage > 3 ? <BiCheck className="icon"/> : 3}</div>
                        <div className={"stage-number " + (this.state.stage > 4 ? "complete" : "")}>{this.state.stage > 4 ? <BiCheck className="icon"/> : 4}</div>
                    </div>
    
                </div>
    
                <div className="stage-content">
                    {stages[this.state.stage]}
                </div>
    
                <button className="next-stage" onClick={() => this.setState({stage: this.state.stage + 1})}>
                    {this.state.stage > 4 ? "Submit" : "Continue"}
                </button>
                
            </div>
        )
    }
}

export default PreApproveStages;