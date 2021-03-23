import React, { Component } from 'react';
import { Container, ButtonToggle, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'
import './BenefitCalculatorForm.css';
import { NewDependentForm } from './NewDependentForm';

export class BenefitCalculatorForm extends Component {
    static displayName = BenefitCalculatorForm.name;
    constructor(props) {
        super(props);

        this.state = {
            employeeFirstName: '',
            employeeLastName: '',
            dependentFirstName: '',
            dependentLastName: '',
            benefitCost: 0.0,
            dependentHtmlArray: [],
            dependentsArray: [],
            dependentsCount: 0
        };
    }

    addDependentHtml = (e) => {
        e.preventDefault();        
        let currentDependentCount = this.state.dependentHtmlArray.length + 1;   
        this.setState({
            dependentsCount: currentDependentCount
        }, console.log(this.state.dependentsCount));
        this.BuildDependentList();
    }

    ElementToDelete = (i) => {
        let oldDependentsHtmlArray = this.state.dependentHtmlArray;
        let oldDependentsArray = this.state.dependentsArray;
        let filteredHtml = oldDependentsHtmlArray.filter(function (htmlBlock) {
            return htmlBlock.props.i !== i;
        });
        let filteredDependents = oldDependentsArray.filter(function (dependent) {
            return oldDependentsArray.indexOf(dependent) !== i;
        });
        let currentCount = this.state.dependentHtmlArray.length;
        this.setState({ dependentHtmlArray: filteredHtml, dependentsCount: currentCount, dependentsArray: filteredDependents });
    }

    SaveDependent = (i, firstName, lastName) => {
        let newDependent = {
            FirstName: firstName,
            LastName: lastName,
            TotalCost: 0.0,
            Dependents: []
        }
        let oldDependentsArray = this.state.dependentsArray;
        if (oldDependentsArray[i]) {
            oldDependentsArray[i] = newDependent;
        }
        else {
            oldDependentsArray.push(newDependent);
        }                
        this.setState({ dependentsArray: oldDependentsArray });
    }

    BuildDependentList = () => {
        let list = [];
        for (let i = 0; i < this.state.dependentsCount; i++) {
            list.push(
                <NewDependentForm i={i} deleteCallback={this.ElementToDelete} saveCallback={this.SaveDependent} />
            );
        }
        this.setState({
            dependentHtmlArray: list
        });
    }

    performBenefitCalculation = () => {  
        let jsonObject = {
            FirstName: this.state.employeeFirstName,
            LastName: this.state.employeeLastName,
            TotalCost: 0.0,
            Dependents: this.state.dependentsArray
        }

        let data = JSON.stringify(jsonObject);
        let self = this;
        let url = 'https://localhost:44331/api/BenefitCalculation/GetCalculationForBenefits/' + data;

        axios.get(
            url
        ).then(function (response) {
            self.setState({
                benefitCost: response.data.TotalCost
            });
        })        
    }

    setFirstName = (e) => {
        this.setState({
            employeeFirstName: e.target.value
        })
    }

    setLastName = (e) => {
        this.setState({
            employeeLastName: e.target.value
        })
    }

    render() {
        return (
            <Container className="border-bottom box-shadow benefitCalculatorForm">
                <Form>
                    <h4 className="display-5">Employee</h4>
                    <FormGroup>
                        <Label for="txtFirstName">First Name</Label>
                        <Input type="text" name="firstName" id="txtFirstName" onChange={(e) => this.setFirstName(e)} placeholder="Employee First Name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="txtLastName">Last Name</Label>
                        <Input type="text" name="lastName" id="txtLastName" onChange={(e) => this.setLastName(e)} placeholder="Employee Last Name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="txtLastName">Cost Of Benefits</Label>
                        <Input type="text" name="cost" id="txtBenefitCost" readOnly value={ this.state.benefitCost } placeholder="Employee Benefit Cost" />
                    </FormGroup>                    
                    <FormGroup>
                        <ButtonToggle color="success" onClick={this.addDependentHtml}>Add Dependent</ButtonToggle>{' '}
                    </FormGroup>
                    {this.state.dependentHtmlArray}
                    <FormGroup>
                        <ButtonToggle color="success" onClick={this.performBenefitCalculation}>Calculate Benefit Cost</ButtonToggle>{' '}
                    </FormGroup>
                </Form>
            </Container>
        );
    }
}