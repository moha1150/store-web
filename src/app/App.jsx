import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

//Components
import Product from '../product/product';
import WishList from '../wishlist/wishlist';

//Services
import HttpService from '../http-service';

function App() {
  const http = new HttpService();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    http.getProducts().then(data => {
        setProducts(data);
    })
  }, []);

  const loadData = () => {
    http.getProducts().then(data => {
        setProducts(data);
    })
  }

  loadData();

  const productList = () => {
    const list = products.map((product) => {
      return (
        <div className="col-sm-4" key={product._id}>
          <Product product={product}/>
        </div>
      )
    });
    return (list); 
}

return ( 
  <div className="App">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
              Welcome to the Swag Shop
          </a>
          <div className="container-fluid App-main">
              <div className="row">
                <div className="col-sm-8">
                <div className="row">
                {productList()}
                </div>
                </div>
                <div className="col-sm-4">
                <wishList />
                </div>
              </div>
          </div>
      </header>
  </div>
);

}

export default App;
