import React from 'react'
import { Side } from "./Side";
import { Content } from "./Content";
import {AppStateContext} from "./App";

export default function() {
    return (
        <div
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <Side />
            <Content />
        </div>
    )
}