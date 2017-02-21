import React from "react";
import request from "superagent";

class Ankur extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        console.log('component did mount ankur');
    }

    render() {
        return (
            <div>  My name is Ankur   </div>
        )
    }

}

export default Ankur
