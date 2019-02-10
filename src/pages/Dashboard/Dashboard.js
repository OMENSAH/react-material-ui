import React,{Component} from 'react'
import  {Redirect}from 'react-router-dom'


import { Menu, Icon, Switch, Row, Col} from 'antd';

const SubMenu = Menu.SubMenu;

class Dashboard extends Component {
    state = {
        theme: 'dark',
        current: '1',
      }
    
      changeTheme = (value) => {
        this.setState({
          theme: value ? 'dark' : 'light',
        });
      }
    
      handleClick = (e) => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      }

    componentDidMount() {
        // this.makeRequest('GET', 'https://jsonplaceholder.typicode.com/users').then(function(data){
        //     //console.log(data);
        //     let contacts = JSON.parse(data);
        //     let output = '';
        //     for(let contact of contacts){
        //       output += `
        //       <div class="well" id="contact-${contact.id}">
        //         <h3>${contact.name} <i onClick="removeContact(${contact.id})" class="pull-right fa fa-remove fa-3" aria-hidden="true"></i></h3>
        //         <ul class="list-group">
        //          <li class="list-group-item"><i class="fa fa-envelope fa-3" aria-hidden="true"></i> ${contact.email}</li>
        //          <li class="list-group-item"><i class="fa fa-mobile-phone fa-3" aria-hidden="true"></i> ${contact.phone}</li>
        //          <li class="list-group-item"><i class="fa fa-location-arrow fa-3" aria-hidden="true"></i> ${contact.address.street}, ${contact.address.city}, ${contact.address.zipcode}</li>
        //         </ul>
        //       </div>
        //       `;
        //     }

        // )
    } 
    render() {
        const { isAuthenticated } = this.props.auth;
        
        if(!isAuthenticated()){
            alert("You must  Log In");
            return <Redirect to="/"/>
        }
        return (
            <Row type="flex" justify="start">
                <Col span={4}>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Switch
                        checked={this.state.theme === 'dark'}
                        onChange={this.changeTheme}
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                    />
                    <br />
                    <br />
                    <Menu
                        theme={this.state.theme}
                        onClick={this.handleClick}
                        style={{ width: 256}}
                        defaultOpenKeys={['sub1']}
                        selectedKeys={[this.state.current]}
                        mode="inline"
                        >
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Users</span></span>}>
                            <Menu.Item key="1">Load Users</Menu.Item>
                        </SubMenu>

                        <SubMenu key="sub2" title={<span><Icon type="mail" /><span>Events</span></span>}>
                            <Menu.Item key="2">
                                Add Events
                            </Menu.Item>
                            <Menu.Item key="3">
                                Retrieve Event
                            </Menu.Item>
                            <Menu.Item key="4">
                                Upcoming Events
                            </Menu.Item>
                            <Menu.Item key="5">
                                Previous Events
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Col>  
                <Col span={8}>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                When creating our example grid we specifically defined our column tracks with the grid-template-columns property, but the grid also created rows on its own. These rows are part of the implicit grid. Whereas the explicit grid consists of any rows and columns defined with grid-template-columns or grid-template-rows.

If you place something outside of the defined grid—or due to the amount of content, more grid tracks are needed—then the grid creates rows and columns in the implicit grid. These tracks will be auto-sized by default, resulting in their size being based on the content that is inside them.

You can also define a set size for tracks created in the implicit grid with the grid-auto-rows and grid-auto-columns properties.

In the below example we use grid-auto-rows to ensure that tracks created in the implicit grid are 200 pixels tall.


                
                </Col>

            </Row>
        );
    }
}

export default Dashboard;