import React, { useContext, useState } from 'react'
import { AppStateContext } from "./App";
import {NewProfile} from "./NewProfile";
import {Modal} from "./Modal";
import {Profile} from "./Profile";

export function Side() {

    const { profiles } = useContext(AppStateContext);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div
            style={{
                width: 250,
                borderRight: '1px solid #000',
                flexShrink: 0,
                overflowY: 'auto',
            }}
        >
            {
                profiles.map(p => (
                    <Profile key={p.id} profile={p} />
                ))
            }
            <div
                style={{
                    padding: '10px 5px',
                    cursor: 'pointer',
                }}
                onClick={() => setModalOpen(true)}
            >
                + New Profile
            </div>

            {
                modalOpen && (
                    <Modal style={{ width: 600 }} visible={modalOpen}>
                        <NewProfile onClose={() => setModalOpen(false)}/>
                    </Modal>
                )
            }
        </div>
    )
}