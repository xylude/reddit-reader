import React, { useState, useEffect, useCallback, createContext } from 'react'

export const AppStateContext = createContext(null);

export const distributionOptions = [
    'mixed',
    'separate',
];

export const sortOptions = [
    'best',
    'hot',
    'new',
    'rising',
    'controversial',
    'top',
    'gilded',
];

const defaultProfile = {
    id: '7980e00a-f456-4ec0-8ddc-a2ca65e7a1e5',
    name: 'Silly',
    subreddits: [
        'awww',
        'funny',
        'memes',
        'wallpapers'
    ],
    sort: 'best',
    distribute: 'mixed',
    priority: 0,
};

// provides storage context and styling info
export function App({ children }) {
    const stored = window.localStorage.getItem('profiles');

    const [ profiles, setProfiles ] = useState(
         stored ? JSON.parse(window.localStorage.getItem('profiles')) :
        [ defaultProfile ]
    );

    const [ selectedProfile, setSelectedProfile ] = useState(
        stored ? JSON.parse(window.localStorage.getItem('profiles'))[0] : defaultProfile
    );

    const deleteProfile = useCallback((id) => {
        const new_profiles = profiles
            .filter(p => p.id !== id);

        setProfiles(new_profiles);
        if(id === selectedProfile.id) {
            setSelectedProfile(new_profiles[0]);
        }
        window.localStorage.setItem('profiles', JSON.stringify(new_profiles));
    }, [profiles]);

    const addProfile = useCallback((profile) => {
        const new_profiles = [profile, ...profiles]
            .map(profile => ({
                ...profile,
                priority: profile.priority || 0
            }))
            .sort((a,b) => b.priority - a.priority);
        setProfiles(new_profiles);
        window.localStorage.setItem('profiles', JSON.stringify(new_profiles));
    }, [profiles]);

    const updateProfile = useCallback((id, profile) => {
        const new_profiles = profiles
            .map(p => {
                if(p.id === id) {
                    return profile;
                }
                return p;
            })
            .map(profile => ({
                ...profile,
                priority: profile.priority || 0
            }))
            .sort((a,b) => b.priority - a.priority);

        console.log('setting profiles', JSON.stringify(new_profiles));
        setProfiles(new_profiles);
        if(id === selectedProfile.id) {
            setSelectedProfile(profile);
        }
        window.localStorage.setItem('profiles', JSON.stringify(new_profiles));
    }, [profiles]);

    const getProfile = useCallback((id) => {
        return profiles
            .filter(p => p.id === id)[0];
    }, [profiles]);

    useEffect(() => {
        const defaultProfileString = JSON.stringify([defaultProfile]);
        if(!window.localStorage.getItem('profiles')) {
            window.localStorage.setItem('profiles', defaultProfileString);
        }
    }, []);

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#222',
                color: '#aaa',
                overflow: 'auto',
            }}
        >
            {
                profiles && (
                    <AppStateContext.Provider
                        value={{
                            profiles,
                            getProfile,
                            addProfile,
                            deleteProfile,
                            updateProfile,
                            selectedProfile,
                            setSelectedProfile,
                        }}
                    >
                        { children }
                    </AppStateContext.Provider>
                )
            }
        </div>
    )
}