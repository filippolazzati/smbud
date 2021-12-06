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

        this.onChangeCertificateId = this.onChangeCertificateId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            certificateId: "",
            alertVisible: false,
        };
    }

    onChangeCertificateId(e){
        this.setState({
            certificateId: e.target.value,
        });
    }

    onSubmit(e){
        e.preventDefault();

        const certificateId = this.state.certificateId;

        axios
            .get('http://localhost:5000/' + certificateId) //TODO
            .then((res) => {
                if(res.data.location.length > 0){
                    this.props.history.push("/location/" + res.data.location[0].id)
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
                <form className="row g-2 justify-content-md-center" onSubmit={this.onSubmit}>
                    <div className="col-4">
                        <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            placeholder="Certificate ID" 
                            value={this.state.certificateId}
                            onChange={this.onChangeCertificateId}
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