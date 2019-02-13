import React from 'react';

class Callback extends React.Component{
    componentDidMount(){
        this.props.auth.handleAuthentication()
    }
    render(){
        return(
            <div>
                <br/><br/><br/><br/>
                 <h1>Loading...</h1>
            </div>

        )
    }
} 
export default Callback