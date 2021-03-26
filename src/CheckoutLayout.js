import './CheckoutLayout.css';

import OrderSummary from './OrderSummary';
import PreApproveStage from './PreApproveStage';

import { Link } from 'react-router-dom';
import {BsArrowLeftShort} from 'react-icons/bs';
import orderList from './orderList';
import React from 'react';

class CheckoutLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPrice: "",
        }
    }

    componentDidMount() {
        const reducer = (accumulator, currentOrder) => {
            return accumulator + (currentOrder.price * currentOrder.quantity)
        };
        this.setState({totalPrice: orderList.reduce(reducer, 0)});
    }

    render() {
        return (
            <section className="checkout-layout">
    
                <div className="side-section">
                    <Link to="#backPage" className="back-arrow"><BsArrowLeftShort className="icon"/>Back to Store</Link>
                    <ul>
                        <li>Get pre-approved instantly.</li>
                        <li>Spread payment for up to six-months.</li>
                        <li>Provide some basic information to get started.</li>
                    </ul>
                </div>

                <OrderSummary orderList={orderList} totalPrice={this.state.totalPrice}></OrderSummary>
                <PreApproveStage totalPrice={this.state.totalPrice}></PreApproveStage>
                
            </section>
        )
    }
}

export default CheckoutLayout;