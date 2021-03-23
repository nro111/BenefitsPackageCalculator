import React, { Component } from 'react';
import { Row, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class TopBanner extends Component {
    static displayName = TopBanner.name;

    render() {
        return (
            <header>
                <Container className="ng-white border-bottom box-shadow mb-3 header">
                    <h4 className="display-5 headertext">Employment Benefit Calculator</h4>
                </Container>            
            </header>
        );
    }
}
