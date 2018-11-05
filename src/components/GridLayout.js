import React, {Component} from 'react';
import {Grid,Row,Col,Nav, NavItem,Badge,DropdownButton,MenuItem} from 'react-bootstrap';
import {Card,CardBody,CardImg,CardTitle,CardSubtitle,CardText,Button,FormGroup,Input} from 'reactstrap';
import Repository from './Repository.js';
import axios from 'axios';
class GridLayout extends Component{
  constructor(props){
    super(props);
    this.state = {
      user:{},
      repos:[],
      q:"",
      type:"",
      language:"",
      userID:"supreetsingh247"
    }
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleLangChange = this.handleLangChange.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }
  componentDidMount(){
    var userID = this.state.userID;
    axios('https://api.github.com/users/'+this.state.userID).then(res => {
      this.setState({
        user : res.data
       });
      console.log(this.state.user);
    });
    axios('https://api.github.com/users/'+this.state.userID+'/repos').then(res => {
      this.setState({
        repos : res.data
       });
      console.log(this.state.repos);
    });

  }
  handleTypeChange(e,eventKey){
    this.setState({
      language : e
    });
    var url = 'https://api.github.com/search/repositories?q='+this.state.q+'+user:'+this.state.userID;
    debugger;
    if(e !== ""){
      url = url+ '+type:'+e;
    }
    if(this.state.language !== ""){
      url = url+ '+language:'+this.state.language;
    }
     axios(url)
      .then(res => {
        this.setState({
          repos : res.data.items
         });
      });
  }
  handleLangChange(e,eventKey){
    debugger;
    this.setState({
      language : e
    });
    var url = 'https://api.github.com/search/repositories?q='+this.state.q+'+user:'+this.state.userID;
    debugger;
    if(e !== ""){
      url = url+ '+language:'+e;
    }
    if(this.state.type !== ""){
      url = url+ '+type:'+this.state.type;
    }
     axios(url)
      .then(res => {
        this.setState({
          repos : res.data.items
         });
      });
  }
  _handleKeyPress(e) {
   if (e.key === 'Enter') {
     this.setState({
       q : e.target.value
     });
     this.query = e.target.value;
     var url = 'https://api.github.com/search/repositories?q='+e.target.value+'+user:'+this.state.userID;
     debugger;
     if(this.state.language !== ""){
       url = url+ '+language:'+this.state.language;
     }
      axios(url)
       .then(res => {
         this.setState({
           repos : res.data.items
          });
       });
   }

 }
  render(){
    return (
      <Grid className="container">
        <Row>
          <Col sm={12} md={5} lg={4}>
          <Card className="card-container">
            <CardImg top width="100%" className="user-img" src={this.state.user.avatar_url} alt="Card image cap" />
            <CardBody className="user-card-body">
              <CardTitle className="user-title">{this.state.user.name}</CardTitle>
              <CardSubtitle className="user-subtitle">{this.state.user.login}</CardSubtitle>
              <Button color="primary">Add a Bio</Button>{' '}
              <hr />
              <CardText>
                {this.state.user.email!==null && <p><span><i className="material-icons size">&#xe158;</i>{this.state.user.email}</span></p>}
                <p><span><i className="material-icons size">&#xe55f;</i></span>{this.state.user.location}</p>
                <p><i className="material-icons size">&#xe7ef;</i>{this.state.user.company}</p>
              </CardText>
            </CardBody>
          </Card>
          </Col>
          <Col sm={12} md={7} lg={8}>
            <Nav bsStyle="tabs" activeKey="2" onSelect={k => this.handleSelect(k)}>
              <NavItem eventKey="1" href="/home">
                Overview
              </NavItem>
              <NavItem eventKey="2" title="Item">
                Repositories  <Badge>{this.state.user.public_repos}</Badge>
              </NavItem>
              <NavItem eventKey="3" disabled>
                Stars  <Badge>42</Badge>
              </NavItem>
              <NavItem eventKey="4" disabled>
                Followers  <Badge>{this.state.user.followers}</Badge>
              </NavItem>
              <NavItem eventKey="5" disabled>
                Following  <Badge>{this.state.user.following}</Badge>
              </NavItem>
            </Nav>
            <div>
              <FormGroup>
                <Input type="search" name="search" id="search_repo" className="search_repo pull-left" placeholder="Find a repository..." onKeyPress={this._handleKeyPress}/>
                  <DropdownButton
                    bsStyle='default'
                    title={'Type :'  +  this.state.type}
                    key="all"
                    id="type_filter"
                    className="type_filter pull-right"
                    onSelect={this.handleTypeChange}
                  >
                    <MenuItem eventKey="" active>All</MenuItem>
                    <MenuItem eventKey="public">Public</MenuItem>
                    <MenuItem eventKey="private">Private</MenuItem>
                    <MenuItem eventKey="sources">Sources</MenuItem>
                    <MenuItem eventKey="forks">Forks</MenuItem>
                    <MenuItem eventKey="archived">Archived</MenuItem>
                    <MenuItem eventKey="member">Mirrors</MenuItem>


                  </DropdownButton>
                  <DropdownButton
                    bsStyle='default'
                    title={'Language :'  +  this.state.language}
                    key=""
                    id="language_filter"
                    className="language_filter pull-right"
                    onSelect={this.handleLangChange}
                  >
                    <MenuItem eventKey="" active>All</MenuItem>
                    <MenuItem eventKey="javascript">Javscript</MenuItem>
                    <MenuItem eventKey="css">CSS</MenuItem>
                    <MenuItem eventKey="python">Python</MenuItem>
                    <MenuItem eventKey="cpp">C++</MenuItem>
                    <MenuItem eventKey="html">HTML</MenuItem>
                  </DropdownButton>
                  <Button color="success" className="new_btn">New</Button>{' '}
              </FormGroup>
              <hr/>
            </div>
            <div className="">
              {this.state.repos.map((repo,index)=>
                  <Repository key={index} data={repo}/>
              )}
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default GridLayout;
