import React from 'react';

import Arena from '../components/Arena';
import Controls from '../components/Controls';

const AdminView = ({ registry, anchorData }) => {
    return (
        <div className="viewer">
            <Arena registry={registry.robots} anchorData={anchorData} width={600} height={600} />
            <Controls registry={registry.robots} />
        </div>
    );
};

export default AdminView;