import React, {Component} from 'react';

const ordreSup = WrappedComponent => {
    class OrdreSup extends Component{
        state = {
            value: ""
          }
          handleChange = e => {
            this.setState({
              value: e.target.value
            })
          }

        render(){
            return (
            <WrappedComponent 
                {...this.props}
                state={this.state}
                handleChange={this.handleChange}            
            />
            )
        }
    }

    return OrdreSup
}

export default ordreSup;