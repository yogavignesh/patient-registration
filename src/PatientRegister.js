import React, {Component, useReducer, useState} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import FormValidator from './FormValidator';
import eventBus from './EventBus';
import Table from './Table';
import { enableAllPlugins } from 'immer';
import { Alert } from 'bootstrap';
  
class PatientRegister extends Component{

constructor(props){
super(props);

this.validator = new FormValidator([{
    field: 'first_name',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter first name.'
},{
  field: 'last_name',
  method: 'isEmpty',
  validWhen: false,
  message: 'Enter last name.'
},{
  field: 'address',
  method: 'isEmpty',
  validWhen: false,
  message: 'Enter business address.'
},{
  field: 'npi',
  method: 'isEmpty',
  validWhen: false,
  message: 'Enter NPI number.'
},{
  field: 'npi',
  method: 'matches',
  args: [/^\d*$/],
  validWhen: true,
  message: 'Enter valid NPI number.'
},{
    field: 'email',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter your email address.'
}, {
    field: 'email',
    method: 'isEmail',
    validWhen: true,
    message: 'Enter valid email address.'
}, {
    field: 'phone',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter a phone number.'
}, {
    field: 'phone',
    method: 'matches',
    args: [/^\(?\d\d\d\)?-?\d\d\d-?\d\d\d\d$/],
    validWhen: true,
    message: 'Enter valid phone number.'
}
]);
this.state = { 
    first_name: '',
    last_name: '',
    address: '',
    npi: '',
    email: '',
    phone: '', 
    user: {
      "first_name":"",
      "last_name" : "",
      "address" :"",
      "npi" : "",
      "email" :"",
      "phone" : "",
    },
    validation: this.validator.valid(),
    showMessage:false,
    beforeSubmit:true,   
   
}
this.submitted = false;

}

handleInputChange = event => {
    event.preventDefault();
    this.setState({
        [event.target.name]: event.target.value,
    });
}
componentDidMount() {
  eventBus.dispatch("userData", this.state.user);
}

handleFormSubmit = event => {
    event.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({
        validation
    });
  
    if(validation.isValid) {          
   
    this.setState(prevState=>({
      ...prevState,
      user:{
        "first_name":this.state.first_name,
        "last_name" : this.state.last_name,
        "address" :this.state.address,
        "npi" : this.state.npi,
        "email" :this.state.email,
        "phone" : this.state.phone,
      } 
    }));
    this.setState({ showMessage:true,     
      beforeSubmit:false,   
      
     });  
    this.state.user["first_name"] = this.state.first_name;
    this.state.user["last_name"] = this.state.last_name;
    this.state.user["address"] = this.state.address;
    this.state.user["npi"] = this.state.npi;
    this.state.user["email"] = this.state.email;
    this.state.user["phone"] = this.state.phone;  
    }
  this.submitted = true;
}
handleFormClear = event=>{
  event.preventDefault();
  this.setState({
    validation:true
  });
}
  


render() {
let validation = this.submitted ?this.validator.validate(this.state) : this.state.validation
  
return (
<div className="container">
    <div className="row">
        <div className="col-md-4 col-md-offset-4">
            <form className="registrationForm">
                <h2>Patient Registration</h2>
                <div className={validation.email.isInvalid && 'has-error'}>
                    <label htmlFor="full_name">First Name</label>
                    <input type="string" className="form-control" name="first_name" placeholder="Full Name" onChange={this.handleInputChange} /> <span className="help-block">{validation.first_name.message}</span> </div>
                <div className={validation.email.isInvalid && 'has-error'}>
                    <label htmlFor="full_name">Last Name</label>
                    <input type="string" className="form-control" name="last_name" placeholder="Last Name" onChange={this.handleInputChange} /> <span className="help-block">{validation.last_name.message}</span> </div>         
                <div className={validation.email.isInvalid && 'has-error'}>
                    <label htmlFor="full_name">Business Address</label>
                    <textarea type="string" className="form-control" name="address" size="150" placeholder="Business Address" onChange={this.handleInputChange} /> <span className="help-block">{validation.address.message}</span> </div>      
                <div className={validation.npi.isInvalid && 'has-error'}>
                    <label htmlFor="phone">NPI Number</label>
                    <input type="number" className="form-control" name="npi" placeholder="NPI Number" onChange={this.handleInputChange} /> <span className="help-block">{validation.npi.message}</span> </div>
                <div className={validation.phone.isInvalid && 'has-error'}>
                    <label htmlFor="phone">Phone</label>
                    <input type="phone" className="form-control" name="phone" placeholder="Phone Number" onChange={this.handleInputChange} /> <span className="help-block">{validation.phone.message}</span> </div>
                <div className={validation.email.isInvalid && 'has-error'}>
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name="email" placeholder="Email address" onChange={this.handleInputChange} /> <span className="help-block">{validation.email.message}</span> </div>
               
                  <button onClick={this.handleFormSubmit} className="btn btn-primary"> Submit </button>
                {this.state.showMessage && <button  onClick={this.handleFormClear} className="btn btn-secondary"> Clear</button>}
                {this.state.showMessage && <p className="text-success" name="success" > Submitted Successfully</p>}
               
            </form>  

        </div>
    </div>
    <Table ></Table>
</div>
)
}
  
}
export default PatientRegister;
