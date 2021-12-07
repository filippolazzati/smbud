import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Certificate = (props) => (
    <tr>
        <td>{props.certificate.code}</td>
        <td>{props.certificate.owner.name}</td>
        <td>{props.certificate.owner.surname}</td>
        <td>{props.certificate.owner.fiscalCode}</td>
        <td>
        <Link to={"/certificate/" + props.certificate.code}>View</Link>
        </td>
    </tr>
);

export default class CertificateList extends Component {
    constructor(props){
        super(props);
        this.state = {
            certificates: null,
        }
    }

    componentDidMount(){
        axios
            .get('http://localhost:5000/certificates/getCertificates/20')
            .then((res) => {
                this.setState({
                    certificates: res.data,
                });
            })
            .catch((err) => console.log(err));
    }

    certificateList(){
        return this.state.certificates.map((certificate) => {
            return <Certificate key={certificate._id} certificate={certificate}/>
        });
    }

    render(){
        if(!this.state.certificates){
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>List of certificates</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Name</th>
                                <th scope="col">Surname</th>
                                <th scope="col">Fiscal Code</th>
                                <th scope="col">View certificate</th>
                            </tr>
                        </thead>
                        <tbody>{this.certificateList()}</tbody>
                    </table>
                </div>
            )
        }
    }
}