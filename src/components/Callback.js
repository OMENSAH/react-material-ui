import React from 'react';

class Callback extends React.Component{
    componentDidMount(){
        this.props.auth.handleAuthentication()
    }
    render(){
        return(
            <h1>Loading...</h1>
        )
    }
} 
export default Callback