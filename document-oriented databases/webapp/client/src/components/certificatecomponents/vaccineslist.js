import React, { Component } from "react";

const Vaccine = (props) => (
    <li className="list-group-item">Brand: <b>{props.type}</b> - Date: <b>{props.date}</b></li>
);

export default class VaccinesList extends Component{
    constructor(props){
        super(props);

        this.state = {
            vaccines: this.props.vaccines
        }
    }

    vaccinesList(){
        return this.state.vaccines.map((vaccine) => {
            return <Vaccine key={vaccine.id} type={vaccine.type.brandName} date={vaccine.date}/>
        });
    }

    render(){
        return(
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Vaccines List</h5>
                    <ul className="list-group list-group-flush">
                        {this.vaccinesList()}
                    </ul>
                </div>
            </div>
        )
    }
}