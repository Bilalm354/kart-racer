import * as React from "react";
import ReactDOM from "react-dom";

// parsing error
class Welcome extends React.Component {
    render() {
        return <h1>hello</h1>;
    }
}

ReactDOM.render(<Welcome />, document.body);
// end of error
