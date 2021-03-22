import React, { Component } from 'react';
import { Label, FormGroup, Input, ButtonToggle } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NewDependentForm extends Component {
    static displayName = NewDependentForm.name;

    constructor(props) {
        super(props);

        this.state = {            
            dependentFirstName: '',
            dependentLastName: '',
            benefitCost: 0.0,
            isDirty: false
        };
    }

    saveDependent = (i) => {
        let dependent = {
            FirstName: this.state.dependentFirstName,
            LastName: this.state.dependentLastName,
            TotalCost: 0.0,
            Dependents: []
        }
        let oldDependentsArray = this.state.dependentsArray;
        oldDependentsArray.push(dependent);
        this.setState({
            dependentsArray: oldDependentsArray,
            isDirty: false
        })
    }

    removeDependent = (i) => {
        let oldDependentsHtmlArray = this.props.dependentHtmlArray;
        oldDependentsHtmlArray.splice(i, 1);
        let oldDependentsArray = this.props.dependentArray;
        oldDependentsArray.splice(i, 1);
        this.setState({ dependentHtmlArray: oldDependentsHtmlArray, dependentsArray: oldDependentsArray });
    }

    setDependentFirstName = (e) => {
        this.setState({
            dependentFirstName: e.target.value,
            isDirty: true
        })
    }

    setDependentLastName = (e) => {
        this.setState({
            dependentLastName: e.target.value,
            isDirty: true
        })
    }

    render() {
        return (
            <div id={this.props.i}>
                <Label>Dependent #{this.props.i + 1}</Label>
                <FormGroup>
                    <Label for="txtFirstName">First Name</Label>
                    <Input type="text" name="firstName" id={"txtDependentFirstName-" + this.props.i} onChange={(e) => this.setDependentFirstName(e)} placeholder="Depenedent First Name" />
                </FormGroup>
                <FormGroup>
                    <Label for="txtLastName">Last Name</Label>
                    <Input type="text" name="lastName" id={"txtDependentLastName-" + this.props.i} onChange={(e) => this.setDependentLastName(e)} placeholder="Depenedent Last Name" />
                </FormGroup>
                <FormGroup>
                    <ButtonToggle color="success" disabled={!this.state.isDirty} onClick={() => this.saveDependent(this.props.i)}>Save</ButtonToggle>{' '}
                    <ButtonToggle color="danger" onClick={() => this.removeDependent(this.props.i)}>Remove Dependent</ButtonToggle>{' '}
                </FormGroup>
            </div>
        );
    }
}
