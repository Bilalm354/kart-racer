import * as React from "react";
import ReactDOM from "react-dom";

class Welcome extends React.Component {
    render() {
        return <h1>hello</h1>;
    }
}

ReactDOM.render(<Welcome />, document.body);

// I think this needs to go in the index. Or atleast something react so that other componenets can be child elements.
