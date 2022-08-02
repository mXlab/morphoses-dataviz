import React from 'react';

import Arena from '../components/Arena';
import Controls from '../components/Controls';

const AdminView = (props) => {
    const { registry } = props;

    return (
        <div className="viewer">
            <Arena registry={registry} width={600} height={600} />
            <Controls registry={registry.robots} />
        </div>
    );
};

export default AdminView;