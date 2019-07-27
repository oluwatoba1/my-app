import PropTypes from "prop-types"
import React, {Component} from "react"
import { Link } from "gatsby"
import './Header.css'
import StripeCheckout from 'react-stripe-checkout'
import designCode from '../images/logo-designcode.svg'

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hasScrolled: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    const scrollType = window.pageYOffset;

    if(scrollType > 50) {
      this.setState({ hasScrolled: true });
    }
    else {
      this.setState({ hasScrolled: false });
    }
  }

  handlePurchase =(token) => {
    const amount = 5000;
    const description = "My awesome product";

    const bodyObject = {
      tokenId: token.id,
      email: token.email,
      name: token.name,
      amount,
      description
    }

    fetch('http://localhost:9000/stripe-charge', {
      method: 'POST',
      body: JSON.stringify(bodyObject)
    })
    
  }

  render() {
    return (
      <div className={this.state.hasScrolled ? 'Header HeaderScrolled': 'Header'}>
        <div className="HeaderGroup">
          <Link to="/"><img src={require('../images/logo-designcode.svg')} width="30" /></Link>
          <Link to="/courses">Courses</Link>
          <Link to="/downloads">Downloads</Link>
          <Link to="/workshops">Workshops</Link>
          <StripeCheckout
            amount={5000}
            image={designCode}
            token={this.handlePurchase}
            stripeKey={'pk_test_wIAINGRZdaiGTVck7CzrslLA'}>
            <button>Buy</button>
          </StripeCheckout>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
