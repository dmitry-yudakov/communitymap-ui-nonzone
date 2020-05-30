import React from "react";
import "./--default.css";

/**
 * Class Cart represents one position card in the cart
 *
 * logic
 * @param {object} position - dish object which will supply all information and will be deleted with method "func"
 * @param {amount} amout - represents quantity of this position on the cart
 * @param {number} key - just id for correct work of React
 *
 * style
 * @param {function} func - handle click function. This func invokes and takes position as agrument
 */

export class Cart extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.func(this.props.position);
    };

    render() {
        return (
            <div className="cart">
                <div className="cart__block" key={this.props.key}>
                    <h5 className="cart__name">{this.props.position.name}</h5>
                    <p className="cart__amount">{this.props.amount}шт.</p>
                    <p className="cart__weight">
                        {this.props.position.weigh}гр.
                    </p>
                    <p className="cart__price">{this.props.position.price}р.</p>
                </div>
                <div className="cart__option">
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0 14V16H6V14H0ZM0 2V4H10V2H0ZM10 18V16H18V14H10V12H8V18H10ZM4 6V8H0V10H4V12H6V6H4ZM18 10V8H8V10H18ZM12 6H14V4H18V2H14V0H12V6Z"
                            fill="black"
                            fillOpacity="0.5"
                        />
                    </svg>

                    <p className="cart__delete" onClick={this.handleClick}>
                        Удалить
                    </p>
                </div>
            </div>
        );
    }
}
