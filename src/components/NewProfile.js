import React, { useContext, useState } from 'react'
import uuid from 'uuid/v4'
import {AppStateContext} from "./App";

export function NewProfile({ onClose }) {
    const { addProfile } = useContext(AppStateContext);

    const [name, setName] = useState('');
    const [priority, setPriority] = useState(0);
    const [subreddits, setSubreddits] = useState('');

    return (
        <>
            <div style={{
                fontWeight: 900,
                fontSize: '1.2em',
                padding: '10px 0',
            }}>
                New Profile
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
                            addProfile({
                                id: uuid(),
                                name,
                                subreddits: subreddits.split(',').map(sub => sub.trim()),
                                sort: 'hot',
                                priority,
                            });

                            onClose();
                        }}
                    />
                </p>
            </div>
        </>
    )
}
//conspiracy, alternatehistory, ufo, ufos, alien_theory, fringetheory, highstrangeness, tartaria