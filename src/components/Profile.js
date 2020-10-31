import React, { useContext, useState } from 'react';
import {AppStateContext} from "./App";
import { Modal } from "./Modal";
import {EditProfile} from "./EditProfile";

export function Profile({ profile }) {
    const { selectedProfile, setSelectedProfile, updateProfile, deleteProfile: _deleteProfile } = useContext(AppStateContext);

    const [ editing, setEditing ] = useState(false);

    function deleteProfile(profile) {
        if(confirm(`Are you sure you wanna delete ${profile.name}?`)) {
            _deleteProfile(profile.id);
        }
    }

    return (
        <div style={{
            padding: '10px 5px',
            borderBottom: '1px solid #000',
        }}>
            <div
                key={profile.id}
                style={{
                    cursor: 'pointer',
                    fontWeight: selectedProfile.id === profile.id ? 900 : 100,
                }}
                onClick={() => {
                    setSelectedProfile(profile);
                }}
            >
                {profile.name}
            </div>
            <div
                style={{
                    fontSize: '.6em',
                    textDecoration: 'underline',
                }}
            >
                <span
                    onClick={() => deleteProfile(profile)}
                    style={{
                        cursor: 'pointer',
                        marginRight: 5
                    }}
                >
                    Delete
                </span>

                <span
                    onClick={() => setEditing(true)}
                    style={{
                        cursor: 'pointer',
                        marginRight: 5
                    }}
                >
                    Edit
                </span>
            </div>

            <Modal style={{ width: 800 }} visible={editing}>
                <EditProfile
                    profile={profile}
                    onClose={() => setEditing(false)}
                />
            </Modal>
        </div>
    )
}