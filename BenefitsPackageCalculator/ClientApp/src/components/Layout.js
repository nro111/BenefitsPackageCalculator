import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { BenefitCalculatorForm } from './BenefitCalculatorForm';
import { TopBanner } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <TopBanner />
                <BenefitCalculatorForm />
            </div>
        );
    }
}
