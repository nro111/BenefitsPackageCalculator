import React, { Component } from 'react';
import { Row, Container, Col, ButtonToggle, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'
import './BenefitCalculatorForm.css';

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
            showDependentSection: false,
            dependentHtmlArray: [],
            dependentsArray: [],
            dependentsCount: 0
        };
    }

    showDependentSection = () => {
        this.setState({
            showDependentSection: true
        }, () => console.log(this.state.showDependentSection));
    }

    hideDependentSection = () => {
        this.setState({
            showDependentSection: false
        }, () => console.log(this.state.showDependentSection));
    }

    addDependent = (e) => {
        e.preventDefault();        
        let currentDependentCount = this.state.dependentsCount + 1;        
        this.setState({
            dependentsCount: currentDependentCount
        }, console.log(this.state.dependentsCount));
        this.BuildDependentList();
    }

    BuildDependentList = () => {
        let list = [];
        for (let i = 0; i < this.state.dependentsCount; i++) {
            list.push(
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
        this.setState({
            dependentHtmlArray: list
        });
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
            dependentsArray: oldDependentsArray
        })
    }

    removeDependent = (i) => {
        let oldDependentsHtmlArray = this.state.dependentHtmlArray;
        let filtered = oldDependentsHtmlArray.filter(function (htmlBlock) {
            return htmlBlock.props.id !== i;
        });
        let currentCount = this.state.dependentHtmlArray.length;
        this.setState({ dependentHtmlArray: filtered, dependentsCount: currentCount });
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
                    <FormGroup tag="fieldset" row>
                        <legend className="col-form-label col-sm-2">Has Dependents</legend>
                        <Col sm={10}>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" id="rbYesDependents" name="Dependents" onClick={this.showDependentSection} />{' '}
                                    Yes
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" id="rbNoDependents" name="Dependents" onClick={this.hideDependentSection} />{' '}
                                    No
                                </Label>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for="txtLastName">Cost Of Benefits</Label>
                        <Input type="text" name="cost" id="txtBenefitCost" readOnly value={ this.state.benefitCost } placeholder="Employee Benefit Cost" />
                    </FormGroup>                    
                    {
                        this.state.showDependentSection ? 
                            <div>
                                <FormGroup>
                                    <ButtonToggle color="success" onClick={ this.addDependent }>Add Dependent</ButtonToggle>{' '}                                                            
                                </FormGroup>
                                {this.state.dependentHtmlArray}
                            </div> :
                            null
                    }   
                    <FormGroup>
                        <ButtonToggle color="success" onClick={this.performBenefitCalculation}>Calculate Benefit Cost</ButtonToggle>{' '}
                    </FormGroup>
                </Form>
            </Container>
        );
    }
}