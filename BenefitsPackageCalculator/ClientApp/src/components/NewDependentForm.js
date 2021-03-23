import React, { Component } from 'react';
import { Label, FormGroup, Input, ButtonToggle } from 'reactstrap';
import './NavMenu.css';

export class NewDependentForm extends Component {
    static displayName = NewDependentForm.name;

    constructor(props) {
        super(props);

        this.state = {            
            dependentFirstName: '',
            dependentLastName: '',
            benefitCost: 0.0
        };
    }

    saveDependent = (i) => {
        this.props.saveCallback(i, this.state.dependentFirstName, this.state.dependentLastName);
    }

    removeDependent = (i) => {
        this.props.deleteCallback(i);
    }

    setDependentFirstName = (e) => {
        this.setState({
            dependentFirstName: e.target.value
        })
    }

    setDependentLastName = (e) => {
        this.setState({
            dependentLastName: e.target.value
        })
    }

    render() {
        let i = this.props.i;
        return (
            <div id={i}>
                <Label>Dependent #{i + 1}</Label>
                <FormGroup>
                    <Label for="txtFirstName">First Name</Label>
                    <Input type="text" name="firstName" id={"txtDependentFirstName-" + i} onChange={(e) => this.setDependentFirstName(e)} placeholder="Depenedent First Name" />
                </FormGroup>
                <FormGroup>
                    <Label for="txtLastName">Last Name</Label>
                    <Input type="text" name="lastName" id={"txtDependentLastName-" + i} onChange={(e) => this.setDependentLastName(e)} placeholder="Depenedent Last Name" />
                </FormGroup>
                <FormGroup>
                    <ButtonToggle color="success" onClick={() => this.saveDependent(i)}>Save</ButtonToggle>{' '}
                    <ButtonToggle color="danger" onClick={() => this.removeDependent(i)}>Remove Dependent</ButtonToggle>{' '}
                </FormGroup>
            </div>
        );
    }
}
