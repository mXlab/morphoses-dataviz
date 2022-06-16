import React from 'react';

class Panel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='panel'>{this.props.children}</div>
        )
    }
}

export default Panel;