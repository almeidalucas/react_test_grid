import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';

const api = 'https://reqres.in/api/users';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      data: {},
      users: []
    }
  }

  componentDidMount() {
    this._receiveUsersPerPage(1);
  }

  _pagination(){
    let paginationComponent = [];
    let i = 1;
    paginationComponent.push(<RaisedButton onClick={() => {
                                  if(this.state.data.page > 1){
                                    this._receiveUsersPerPage(parseInt(this.state.data.page, 10) - 1);
                                  }
                              }}
                              label="<" style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#AAA',
                              }} key={'0'} />);
    for(; i <= this.state.data.total_pages; i++){
      paginationComponent.push(<RaisedButton onClick={(e) => {
                                  if(this.state.data.page !== parseInt(e.currentTarget.textContent, 10)){
                                    this._receiveUsersPerPage(e.currentTarget.textContent);
                                  }
                              }} style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '1px solid black',
                              borderRightWidth: 0,
                              borderTopWidth: 0,
                              borderBottomWidth: 0,
                              borderColor: '#CCC',
                              color: '#AAA',
                              }} key={i} label={i}/>);
    }
    paginationComponent.push(<RaisedButton onClick={() => {
                                  if(this.state.data.page < this.state.data.total_pages){
                                    this._receiveUsersPerPage(parseInt(this.state.data.page, 10) + 1);
                                  }
                              }} style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '1px solid black',
                              borderRightWidth: 0,
                              borderTopWidth: 0,
                              borderBottomWidth: 0,
                              borderColor: '#CCC',
                              color: '#AAA',
                              }} key={i} label=">" />);
    return paginationComponent;
  }

  _receiveUsersPerPage(page){
    return axios.get(api, {
                      params: {
                        page: page
                      }
                    }).then((response) => {
                      this.setState({data: response.data, users: response.data.data});
                    });
  }

  render() {
    return (
      <div className="App" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        }}>
        <div className="App-header" style={{width: 600}}>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Grid Test API</h2>
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-start',}}>
          <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40,}}>ID</span>
          <ListItem style={{width: 400,}}
            leftAvatar={<span></span>}
            primaryText={<span>Nome</span>}
          />
        </div>
        {/** colocar size{number} em avatar */
        this.state.users.map((item, index) => {
          return(
            <List key={index} style={{display: 'flex', justifyContent: 'flex-start',}}>
              <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40,}}>{item.id}</span>
              <ListItem style={{width: 400,}}
                leftAvatar={<Avatar src={item.avatar}/>}
                primaryText={`${item.first_name.charAt(0).toUpperCase() + item.first_name.slice(1)} ${item.last_name.charAt(0).toUpperCase()}`}
              />
            </List>
          )
        })
        }
        <div style={{
          display: 'flex',
          justifyContent: 'flex-start',
          border: '1px solid black',
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          borderColor: '#CCC',
          cursor: 'pointer',
          }}>
          {
            this._pagination()
          }
        </div>
      </div>
    );
  }
}

export default App;
