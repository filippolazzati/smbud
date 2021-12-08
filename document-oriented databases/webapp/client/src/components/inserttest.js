import React, { Component } from "react";
import axios from "axios";

export default class InsertTest extends Component{
    constructor(props){
        super(props);

        this.state = {
            code: this.props.match.params.id,
            testType: "",
            testValidity: "",
            testResult: "",
            testDate: "",
            testPersonnelName: "",
            testPersonnelSurname: "",
            testPersonnelFC: "",
            testPersonnelPosition: "",
            testLocation: "",
        }

        this.handleChangeResult = this.handleChangeResult.bind(this);
        this.handleChangePersonnelName = this.handleChangePersonnelName.bind(this);
        this.handleChangePersonnelSurname = this.handleChangePersonnelSurname.bind(this);
        this.handleChangeFC = this.handleChangeFC.bind(this);
        this.handleChangePersonnelPosition = this.handleChangePersonnelPosition.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleChangeValidity = this.handleChangeValidity.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeLocation = this.handleChangeLocation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChangeType(e){
        this.setState({
            testType: e.target.value,
        })
    }

    handleChangeResult(e){
        this.setState({
            testResult: e.target.value,
        })
    }

    handleChangePersonnelName(e){
        this.setState({
            testPersonnelName: e.target.value,
        })
    }
    
    handleChangePersonnelSurname(e){
        this.setState({
            testPersonnelSurname: e.target.value,
        })
    }
    
    handleChangeFC(e){
        this.setState({
            testPersonnelFC: e.target.value,
        })
    }

    handleChangePersonnelPosition(e){
        this.setState({
            testPersonnelPosition: e.target.value,
        })
    }

    handleChangeDate(e){
        this.setState({
            testDate: e.target.value,
        })
    }

    handleChangeValidity(e){
        this.setState({
            testValidity: e.target.value,
        })
    }

    handleChangeLocation(e){
        this.setState({
            testLocation: e.target.value,
        })
    }

    onSubmit(e){
        e.preventDefault();

        let newTest = {
            code: this.state.code,
            test: {
                type: this.state.testType,
                validity: this.state.testValidity,
                date: new Date(this.state.testDate).toISOString(),
                result: Boolean(this.state.testResult),
                medicalPersonnel: {
                    name: this.state.testPersonnelName,
                    surname: this.state.testPersonnelSurname,
                    fiscalCode: this.state.testPersonnelFC,
                    position: this.state.testPersonnelPosition,
                },
                location: this.state.testLocation
            }
        }
        axios
            .post("http://localhost:5000/certificates/updateTest", newTest)
            .then((res) => 
                this.props.history.push("/certificate/" + this.state.code)
            );
    }

    render(){
        return (
            <div>
                <h1>{this.state.code} - Insert test dose</h1>
                
                <form onSubmit={this.onSubmit}>
                    <h1 className="display-6">Type of test</h1>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="formUserName">Type</label>
                                <input type="text" className="form-control" id="testType" placeholder="Test type" value={this.state.testType} onChange={this.handleChangeType}/>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="formTestDate">Validity (hours)</label>
                                <input type="number" className="form-control" id="validity" placeholder="Test validity" value={this.state.testValidity} onChange={this.handleChangeValidity}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="formUserSurname">Result</label>
                                <select className="form-select" id="result" value={this.state.testResult} onChange={this.handleChangeResult}>
                                    <option value={false}>Negative</option>
                                    <option value={true}>Positive</option>
                                </select>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="formUserSurname">Date</label>
                                <input type="date" className="form-control" id="date" placeholder="Test date" value={this.state.testDate} onChange={this.handleChangeDate}/>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <h1 className="display-6">Medical Personnel</h1>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="formUserName">Name</label>
                                <input type="text" className="form-control" id="personnelName" placeholder="Personnel name" value={this.state.testPersonnelName} onChange={this.handleChangePersonnelName}/>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="formTestDate">Surname</label>
                                <input type="text" className="form-control" id="personnelSurname" placeholder="Personnel surname" value={this.state.testPersonnelSurname} onChange={this.handleChangePersonnelSurname}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="formUserSurname">Fiscal Code</label>
                                <input type="text" className="form-control" id="personnelFC" placeholder="Personnel fiscal code" value={this.state.testPersonnelFC} onChange={this.handleChangeFC}/>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="formUserSurname">Position</label>
                                <input type="text" className="form-control" id="personnelPosition" placeholder="Personnel position" value={this.state.testPersonnelPosition} onChange={this.handleChangePersonnelPosition}/>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="formUserName">Location ID</label>
                                <input type="number" className="form-control" id="location" placeholder="Location ID" value={this.state.testLocation} onChange={this.handleChangeLocation}/>
                            </div>
                        </div>
                        <div className="col">
                            <br />
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
                <br />
            </div>
        )
    }
}