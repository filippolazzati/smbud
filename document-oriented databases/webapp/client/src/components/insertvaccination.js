import React, { Component } from "react";
import axios from "axios";

export default class InsertVaccination extends Component{
    constructor(props){
        super(props);

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeBrandName = this.handleChangeBrandName.bind(this);
        this.handleChangeLot = this.handleChangeLot.bind(this);
        this.handleChangeProdDate = this.handleChangeProdDate.bind(this);
        this.handleChangePersonnelName = this.handleChangePersonnelName.bind(this);
        this.handleChangePersonnelSurname = this.handleChangePersonnelSurname.bind(this);
        this.handleChangeFC = this.handleChangeFC.bind(this);
        this.handleChangePersonnelPosition = this.handleChangePersonnelPosition.bind(this);
        this.handleChangeDose = this.handleChangeDose.bind(this);
        this.handleChangeValidity = this.handleChangeValidity.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeLocation = this.handleChangeLocation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            code: this.props.match.params.id,
            vaccineName: "",
            vaccineBrandName: "",
            vaccineLot: "",
            vaccineProdDate: "",
            vaccinePersonnelName: "",
            vaccinePersonnelSurname: "",
            vaccinePersonnelFC: "",
            vaccinePersonnelPosition: "",
            vaccineDose: "",
            vaccineValidity: "",
            vaccineDate: "",
            vaccineLocation: "",
        };
    }

    handleChangeName(e){
        this.setState({
            vaccineName: e.target.value,
        })
    }

    handleChangeBrandName(e){
        this.setState({
            vaccineBrandName: e.target.value,
        })
    }

    handleChangeLot(e){
        this.setState({
            vaccineLot: e.target.value,
        })
    }

    handleChangeProdDate(e){
        this.setState({
            vaccineProdDate: e.target.value,
        })
    }

    handleChangePersonnelName(e){
        this.setState({
            vaccinePersonnelName: e.target.value,
        })
    }
    
    handleChangePersonnelSurname(e){
        this.setState({
            vaccinePersonnelSurname: e.target.value,
        })
    }
    
    handleChangeFC(e){
        this.setState({
            vaccinePersonnelFC: e.target.value,
        })
    }

    handleChangePersonnelPosition(e){
        this.setState({
            vaccinePersonnelPosition: e.target.value,
        })
    }

    handleChangeDose(e){
        this.setState({
            vaccineDose: e.target.value,
        })
    }

    handleChangeDate(e){
        this.setState({
            vaccineDate: e.target.value,
        })
    }

    handleChangeValidity(e){
        this.setState({
            vaccineValidity: e.target.value,
        })
    }

    handleChangeLocation(e){
        this.setState({
            vaccineLocation: e.target.value,
        })
    }

    onSubmit(e){
        e.preventDefault();

        let newVaccine = {
            code: this.state.code,
            vaccine: {
                type: {
                    name: this.state.vaccineName,
                    brandName: this.state.vaccineBrandName,
                    lot: this.state.vaccineLot,
                    productionDate: new Date(this.state.vaccineProdDate).toISOString()
                },
                numberOfDose: this.state.vaccineDose,
                validity: this.state.vaccineValidity,
                date: new Date(this.state.vaccineDate).toISOString(),
                medicalPersonnel: {
                    name: this.state.vaccinePersonnelName,
                    surname: this.state.vaccinePersonnelSurname,
                    fiscalCode: this.state.vaccinePersonnelFC,
                    position: this.state.vaccinePersonnelPosition,
                },
                location: this.state.vaccineLocation
            }
        }        
        
        axios
            .post("http://localhost:5000/certificates/updateVaccine", newVaccine)
            .then((res) => 
                this.props.history.push("/certificate/" + this.state.code)
            );
    }

    render(){
        return (
            <div>
                <h1>{this.state.code} - Insert vaccine dose</h1>
                
                <form onSubmit={this.onSubmit}>
                    <h1 className="display-6">Type of vaccine</h1>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="formUserName">Name</label>
                                <input type="text" className="form-control" id="vaccineName" placeholder="Vaccine name" value={this.state.vaccineName} onChange={this.handleChangeName}/>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="formTestDate">Brand name</label>
                                <input type="text" className="form-control" id="vaccineBrandName" placeholder="Test date" value={this.state.vaccineBrandName} onChange={this.handleChangeBrandName}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="formUserSurname">Lot</label>
                                <input type="text" className="form-control" id="vaccineLot" placeholder="Vaccine lot" value={this.state.vaccineLot} onChange={this.handleChangeLot}/>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="formUserSurname">Production date</label>
                                <input type="date" className="form-control" id="vaccineProdDate" placeholder="Vaccine production date" value={this.state.vaccineProdDate} onChange={this.handleChangeProdDate}/>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <h1 className="display-6">Medical Personnel</h1>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="formUserName">Name</label>
                                <input type="text" className="form-control" id="personnelName" placeholder="Personnel name" value={this.state.vaccinePersonnelName} onChange={this.handleChangePersonnelName}/>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="formTestDate">Surname</label>
                                <input type="text" className="form-control" id="personnelSurname" placeholder="Personnel surname" value={this.state.vaccinePersonnelSurname} onChange={this.handleChangePersonnelSurname}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="formUserSurname">Fiscal Code</label>
                                <input type="text" className="form-control" id="personnelFC" placeholder="Personnel fiscal code" value={this.state.vaccinePersonnelFC} onChange={this.handleChangeFC}/>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="formUserSurname">Position</label>
                                <input type="text" className="form-control" id="personnelPosition" placeholder="Personnel position" value={this.state.vaccinePersonnelPosition} onChange={this.handleChangePersonnelPosition}/>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <h1 className="display-6">Vaccine dose</h1>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="formUserName">Number of dose</label>
                                <input type="number" className="form-control" id="numberOfDose" placeholder="Number of dose" value={this.state.vaccineDose} onChange={this.handleChangeDose}/>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="formTestDate">Validity (hours)</label>
                                <input type="number" className="form-control" id="validity" placeholder="Vaccine validity" value={this.state.vaccineValidity} onChange={this.handleChangeValidity}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="formUserSurname">Date</label>
                                <input type="date" className="form-control" id="date" placeholder="Date" value={this.state.vaccineDate} onChange={this.handleChangeDate}/>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="formUserSurname">Location ID</label>
                                <input type="text" className="form-control" id="location" placeholder="Location ID" value={this.state.vaccineLocation} onChange={this.handleChangeLocation}/>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <button type="submit" className="btn btn-lg btn-primary">Submit</button>
                </form>
                <br />
            </div>
        )
    }
}