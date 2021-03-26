import './OrderSummary.css';

import formatCurrency from './helpers/formatCurrency';
import { Link } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';

function OrderSummary(props) {

    return (
        <div className="order-summary">
            <Link to="#backPage" className="back-arrow"><BsArrowLeftShort className="icon"/>Back to Store</Link>
            <h2>ORDER SUMMARY</h2>

            <div className="order-list-card">
                {
                    props.orderList.map(order => {
                        const {id, name, image, price, quantity} = order;
                        
                        return (
                            <div className="order" key={id}>
                                <img src={require('./assets/images/' + image).default} alt={name} />
                                <div className="order-details">
                                    <p>{name}</p>
                                    <p>&#8358;{formatCurrency(price)}</p>
                                    <p>Qty: {quantity}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="order-card">
                <p>Total Cart Value:</p>
                <p className="total-price">&#8358;{formatCurrency(props.totalPrice)}</p>
            </div>

        </div>
    )
}

export default OrderSummary;