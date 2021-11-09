import React, { Component } from "react";
import axios from "axios";

export default class EditTestDate extends Component{
    constructor(props){
        super(props);

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeSurname = this.handleChangeSurname.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            testId: this.props.match.params.id,
            userId: null,
            userName: "",
            userSurname: "",
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/tests/whoTakes/" + this.state.testId)
            .then((res) => {
                this.setState({
                    userId: res.data.user[0].id,
                    userName: res.data.user[0].properties.Name,
                    userSurname: res.data.user[0].properties.Surname,
                });
            })
            .catch((err) => console.log(err));
    }

    handleChangeName(e){
        this.setState({
            userName: e.target.value,
        });
    }

    handleChangeSurname(e){
        this.setState({
            userSurname: e.target.value,
        });
    }

    handleChangeDate(e){
        this.setState({
            testDate: e.target.value,
        })
    }

    onSubmit(e){
        e.preventDefault();
        
        let tempDate = new Date(this.state.testDate);

        const newTest = {
            testId: this.state.testId,
            date: tempDate.getFullYear() + "-" + tempDate.getMonth() + "-" + tempDate.getDate()
        }

        axios
            .post("http://localhost:5000/tests/changeTest", newTest)
            .then((res) => 
                this.props.history.push("/user/" + this.state.userId)
            );
    }

    render(){
        return(
            <div>
                <h1>Edit test date</h1>
                <br />
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="formUserName">Name</label>
                                <input type="text" className="form-control" id="formUserName" placeholder="User name" readOnly={true} value={this.state.userName} onChange={this.handleChangeName}/>
                            </div>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="formTestDate">Test Date</label>
                                <input type="date" className="form-control" id="formTestDate" placeholder="Test date" value={this.state.testDate} onChange={this.handleChangeDate}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="formUserSurname">Surname</label>
                                <input type="text" className="form-control" id="formUserSurname" placeholder="User surname" readOnly={true} value={this.state.userSurname} onChange={this.handleChangeSurname}/>
                            </div>
                            <br />
                            <br />
                            <button type="submit" className="btn btn-lg btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}