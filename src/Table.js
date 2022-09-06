import React,{ useState, useEffect } from 'react';
import PatientRegister from './PatientRegister';
import eventBus from './EventBus';
class Table extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          user: {},
        };
      }
      componentDidMount() {
        eventBus.on("userData", (user) => {
          this.setState(prevState=>({ ...prevState, user }));
        });
      }
      handleFormClear = event=>{
        this.setState({          
          user: {},
        }) 
    }
    
    render(){     
    /*     const patient= {};
        Object.assign(patient,this.state);   */     
        const {user}=this.state;  
      return(
        
          <div className="container">
            <div className="row">
                <div className="col-md-8 col-md-offset-8">
                        <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Business Address</th>
                            <th scope="col">NPI Number</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Email</th> 
                            <th scope="col">    </th>                          
                            </tr>
                        </thead>
                        <tbody>                        
                       {Object.values(this.state).map((user,i) =>(
                                <tr key={i}>
                                        <td >{user.first_name}</td>
                                        <td >{user.last_name}</td>
                                        <td >{user.address}</td>
                                        <td >{user.npi}</td>
                                        <td >{user.phone}</td>
                                        <td >{user.email}</td>                                
                                        <td><button onClick={this.handleFormClear} className="btn btn-primary"> Delete</button></td>
                                </tr>
                            ))
                        } 
                        </tbody>
                    </table>
                </div>
          </div>
        </div>
      );
    }
} 

export default Table;