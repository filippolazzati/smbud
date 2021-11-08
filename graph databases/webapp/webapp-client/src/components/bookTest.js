import React, { Component } from "react";
import axios from "axios";

export default class BookTest extends Component{
    constructor(props){
        super(props);

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeSurname = this.handleChangeSurname.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);

        this.state = {
            userId: props.match.params.id,
            userName: "",
            userSurname: "",
            testDate: "",
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/users/get/" + this.state.userId)
            .then((res) => {
                this.setState({
                    userName: res.data.Name,
                    userSurname: res.data.Surname,
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
        //TODO
    }

    render(){
        return(
            <div>
                <h1>Book test</h1>
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