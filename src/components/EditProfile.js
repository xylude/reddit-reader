import React, { useContext, useState } from 'react'
import {AppStateContext} from "./App";

export function EditProfile({ profile, onClose }) {
    const { updateProfile, selectedProfile, setSelectedProfile } = useContext(AppStateContext);

    const [name, setName] = useState(profile.name);
    const [priority, setPriority] = useState(profile.priority || 0);
    const [subreddits, setSubreddits] = useState(profile.subreddits.join(', '));

    return (
        <>
            <div style={{
                fontWeight: 900,
                fontSize: '1.2em',
                padding: '10px 0',
            }}>
                Edit Profile
            </div>
            <div>
                <p>
                    <input
                        type="text"
                        placeholder='Profile Name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </p>
                <p>
                    <textarea
                        placeholder='Subreddits (no /r/), comma separated'
                        value={subreddits}
                        onChange={e => setSubreddits(e.target.value)}
                        style={{
                            width: '100%',
                            height: 200,
                        }}
                    />
                </p>
                <p>
                    Priority (higher = top of list)<br />
                    <input
                        type="number"
                        value={priority}
                        onChange={e => setPriority(e.target.value)}
                    />
                </p>
                <p>
                    <input type="button" value="Cancel" onClick={onClose}/>
                    <input
                        type="button"
                        value='Save'
                        onClick={() => {
                            const new_profile =  {
                                id: profile.id,
                                name,
                                subreddits: subreddits.split(',').map(sub => sub.trim()),
                                sort: 'best',
                                priority,
                            };

                            updateProfile(profile.id, new_profile);

                            if(selectedProfile.id === profile.id) {
                                setSelectedProfile(new_profile);
                            }

                            onClose();
                        }}
                    />
                </p>
            </div>
        </>
    )
}
//conspiracy, alternatehistory, ufo, ufos, alien_theory, fringetheory, highstrangeness, tartaria