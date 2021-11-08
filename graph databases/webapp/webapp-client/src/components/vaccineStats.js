import React, {Component} from "react";
import axios from "axios";

const Vaccine = (props) => (
    <tr>
      <td>{props.name}</td>
      <td>{props.doses}</td>
    </tr>
  );

export default class VaccineStats extends Component{
    constructor(props){
        super(props);

        this.state = {
            vaccines: [],
        };
    }

    componentDidMount(){
        axios.get("http://localhost:5000/vaccines/stats")
            .then((res) => {
                this.setState({
                    vaccines: res.data.stats,
                });
            })
            .catch((err) => console.log(err));
    }

    vaccineList(){
        return this.state.vaccines.map((vaccine) => {
            return <Vaccine key={vaccine.name} name={vaccine.name} doses={vaccine.doses}/>
        });
    }

    render(){
        return(
            <div>
                <h1>Vaccine Distribution stats</h1>
                <hr />
                <table className="table table-stripped">
                    <thead>
                        <tr>
                            <th>Vaccine</th>
                            <th>Doses</th>
                        </tr>
                    </thead>
                    <tbody>{this.vaccineList()}</tbody>
                </table>
            </div>
        )
    }
}