import React, { Component } from 'react';
import './product.css';
import DataService from '../data-service';
import NotificationService, { NOTIF_WISHLIST_CHANGED } from './notification-service'

let ns = new NotificationService();
let ds = new DataService();
class Product extends Component {

    constructor(props)  {
        super(props);

        this.state = {onWishList: ds.itemOnWishList()};

        //Bind functions
        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.onWishListChanged = this.onWishListChanged.bind(this);
    }

    componentDidMount() {
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged)

    }

    componentWillUnmount()  {
        ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
    }

    onWishListChanged(newWishList)  {
        this.setState({onWishList: ds.itemOnWishList(this.props.Product)});
    }


    onButtonclicked = () => {
        if (this.state.onWishList)  {
            ds.removeWishListItem(this.props.Product);
        } else {
            ds.addWishListItem(this.props.Product);
        }
 
    }
    render()    {



        var btnClass;

        if (this.state.onWishList)  {
            btnClass = "btn btn-danger";
        } else{
            btnClass = "btn btn-primary";
        }
        return (
            <div classnName="card product">
                <img className="card-img-top" src={this.props.Product.imgUrl} alt="Product"></img>
                <div className="card-block">
                    <h4 className="card-title">{this.props.Product.title}</h4>
                    <p className="card-text">Price: ${this.props.Product.price}</p>
                    <a href="#" onClick={() => this.onButtonclicked()}className={btnClass}>{this.state.onWishList ? "Remove From Wishlist" : "Add to List"}</a>
                </div>
            </div>
        );
    }
}

export default Product;