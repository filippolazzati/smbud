import React, { Component } from "react";

const Vaccine = (props) => (
    <li className="list-group-item">Type: {props.type} - Date: {props.date}</li>
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
            return <Vaccine key={vaccine.id} type={vaccine.type} date={vaccine.date}/>
        });
    }

    render(){
        return(
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Vaccines List</h5>
                    <ul class="list-group list-group-flush">
                        {this.vaccinesList()}
                    </ul>
                </div>
            </div>
        )
    }
}