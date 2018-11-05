import React,{Component} from 'react';
import {Navbar,Nav,NavItem,NavDropdown,MenuItem,FormGroup,FormControl,Button} from 'react-bootstrap';
class Header extends Component{
  render(){
    return (
      <Navbar inverse collapseOnSelect >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand"><img src="./github_icon.png"  className="github-icon"/>  </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
          <Navbar.Collapse>
        <Navbar.Form pullLeft>
          <FormGroup>
            <FormControl type="text" placeholder="Search or jump to" />
          </FormGroup>{' '}
        </Navbar.Form>

          <Nav>
            <NavItem eventKey={1} href="#">
              Pull requests
            </NavItem>
            <NavItem eventKey={2} href="#">
              Issues
            </NavItem>
            <NavItem eventKey={3} href="#">
              Marketplace
            </NavItem>
            <NavItem eventKey={4} href="#">
              Explore
            </NavItem>
          </Nav>
          <Nav pullRight>
          <NavDropdown eventKey={3} title="+" id="basic-nav-dropdown">

            <MenuItem eventKey={3.1}>New Repository</MenuItem>
            <MenuItem eventKey={3.2}>Import Repository</MenuItem>
            <MenuItem eventKey={3.3}>New Gist</MenuItem>
            <MenuItem eventKey={3.3}>New Organisation</MenuItem>
          </NavDropdown>
          <NavDropdown eventKey={3} title="+" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Signed In as <br /> Sourabh</MenuItem>
              <MenuItem divider />
            <MenuItem eventKey={3.2}>Your Profile</MenuItem>
            <MenuItem eventKey={3.3}>Your repositories</MenuItem>
            <MenuItem eventKey={3.4}>Your Stars</MenuItem>
            <MenuItem eventKey={3.5}>Your Gists</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.2}>Help</MenuItem>
              <MenuItem eventKey={3.3}>Settings</MenuItem>
              <MenuItem eventKey={3.4}>Sign Out</MenuItem>
          </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default Header;
