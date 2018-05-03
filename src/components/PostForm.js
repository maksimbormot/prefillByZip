import React, {Component} from 'react';
import { capitalize } from '../utils'
import jQuery from 'jquery';
import Api from '../http/http'

import './post-form.css'

class PostForm extends Component {
   state = {
     zipcode: '',
     city: '',
     state: '',
     zipcodeError: false,
   };

  changeZipCode = (e) => {
    const value = e.target.value;
    if(this.validateZipCode(value)) {
      this.setState({zipcode: value, zipcodeError: false});
      return
    }
    this.setState({city: '', state: '', zipcode: value});
  };

  changeCity = (e) => {
    this.setState({city:e.target.value})
  };

  changeState = (e) => {
    this.setState({state:e.target.value})
  };

  prefillForm = () => {
    const {zipcode} = this.state;
    if(this.validateZipCode(zipcode)){
      Api.fetchByZipCode(zipcode).then((xml) => {
        const xmlDoc = jQuery.parseXML(xml.data);
        const $xml = jQuery(xmlDoc);
        if($xml[0].all[2].nodeName !== 'Error') {
          this.setState({
            zipcode: $xml[0].all[2].textContent,
            city: capitalize($xml[0].all[3].textContent.toLocaleLowerCase()),
            state: $xml[0].all[4].textContent,
            zipcodeError: false
          });
          return
        }
        this.setState({city: '', state: '', zipcodeError: !!$xml[0].all[2].textContent});
      });
      return
    }
    this.setState({zipcodeError: true});
  };

  validateZipCode = (zipcode) => {
    const zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
    return zipCodePattern.test(zipcode);
  };

  render() {
    const {zipcode, city, state, zipcodeError} = this.state;
    return (
      <section className="post">
          <h1>Form</h1>
          <form className="post_form">
              <div className='form_input'>
                <label htmlFor="zipcode">Zipcode</label>
                <input id="zipcode" type="text" name="zipcode" value={zipcode} onChange={this.changeZipCode} onBlur={this.prefillForm} className={zipcodeError ? "error" : ""}/>
              </div>
              <div className='form_input'>
                <label htmlFor="city">City</label>
                <input id="city" type="text" name="city" value={city} onChange={this.changeCity}/>
              </div>
              <div className='form_input'>
                <label htmlFor="state">State</label>
                <input id="state" type="text" name="state" value={state} onChange={this.changeState}/>
              </div>
          </form>
      </section>
    );
  }
}

export default PostForm;