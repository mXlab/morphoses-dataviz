import React from 'react';
import SimpleBar from 'simplebar-react';

class Panel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='panel'>
                <SimpleBar style={{ maxHeight: 600 }}>
                    {this.props.children}
                </SimpleBar>
            </div>
        )
    }
}

export default Panel;