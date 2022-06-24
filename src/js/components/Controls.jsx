import React from 'react';

class Controls extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="controls">
                {this.props.children}
            </div>
        );
    }
}

export default Controls;