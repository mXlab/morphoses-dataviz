import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { map_range } from '../utils';

const Anchor = ({ id, x, y }, ref) => {
    useImperativeHandle(ref, () => ({
        draw(ctx, dimensions, width, height) {
            ctx.fillStyle = "fuschia";

            ctx.beginPath();
            ctx.arc(
                map_range(x, dimensions.minX, dimensions.maxX, 0, width),
                map_range(y, dimensions.minY, dimensions.maxY, height, 0),
                4, 0, Math.PI * 2
            );
            ctx.fill();
        }
    }))

    return (
        <span className="anchor"></span>
    )
}

export default forwardRef(Anchor);