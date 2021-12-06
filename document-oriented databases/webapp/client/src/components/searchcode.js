import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from "react-router";

const Alert = () => (
    <div className="alert alert-danger" role="alert">
        Could not find the specified certificate!
    </div>
)

class SearchCode extends Component {
    constructor(props){
        super(props);

        this.onChangeCertificateCode = this.onChangeCertificateCode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            certificateCode: "",
            alertVisible: false,
        };
    }

    onChangeCertificateCode(e){
        this.setState({
            certificateCode: e.target.value,
        });
    }

    onSubmit(e){
        e.preventDefault();

        const certificateCode = this.state.certificateCode;

        axios
            .get('http://localhost:5000/certificates/getByCode/' + certificateCode)
            .then((res) => {
                if(res.data){
                    this.props.history.push("/certificate/" + res.data.code)
                } else {
                    this.setState({
                        alertVisibile: true,
                    });
                    setTimeout(() => {
                        this.setState({
                            alertVisibile: false,
                        })
                    }, 3000);
                }
            });
    }

    render(){
        return (
            <div>
                <h1 className="display-6">Verify certificate validity</h1>
                <form className="row g-2" onSubmit={this.onSubmit}>
                    <div className="col-4">
                        <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            placeholder="Certificate ID" 
                            value={this.state.certificateCode}
                            onChange={this.onChangeCertificateCode}
                        />                    
                    </div>
                    <div className="col-1">
                        <button type="submit" className="btn btn-lg btn-outline-success mb-3">Search</button>
                    </div>
                </form>
                {this.state.alertVisibile ? <Alert /> : null}
            </div>
        );
    }
}

export default withRouter(SearchCode);