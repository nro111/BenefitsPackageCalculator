import React, { Component } from 'react';
import { BenefitCalculatorForm } from './BenefitCalculatorForm';
import { TopBanner } from './TopBanner';

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
