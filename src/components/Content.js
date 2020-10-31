import React, { useContext, useState, useEffect, useCallback } from 'react'
import request from 'superagent';
import {AppStateContext} from "./App";
import Post from "./Post";
import union from 'mout/array/union'
import zip from 'mout/array/zip'
import { sortOptions } from "./App";

async function getSubredditJSON(ids, sort) {
    const responses = [];

    for(let i = 0; i < ids.length; i++) {
        console.log('fetching: ', ids[i], sort);
        try {
            const { body } = await request.get(`https://www.reddit.com/r/${ids[i]}/${sort}.json?count=100`);
            responses.push(body.data.children);
        } catch(e) {
            alert(`Could not get subreddit info for "${ids[i]}". Check that the subreddit is spelled correctly and not quarantined.`)
        }
    }

    return union(...zip(...responses)).filter(res => !!res);
}

export function Content() {
    const { selectedProfile, updateProfile } = useContext(AppStateContext);
    const [ posts, setPosts ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const loadContent = useCallback(() => {
        setLoading(true);
        getSubredditJSON(selectedProfile.subreddits, selectedProfile.sort)
            .then(posts => {
                setPosts(posts);
                setLoading(false);
            });
    }, [selectedProfile]);

    useEffect(() => {
        loadContent();
    }, [ selectedProfile ]);

    return (
        <div
            style={{
                flexGrow: 1,
                overflowY: 'scroll',
                position: 'relative',
            }}
        >
            <div
                style={{
                    height: 50,
                    backgroundColor: '#111',
                    padding: 10,
                    position: 'fixed',
                    display: 'flex',
                    alignItems: 'center',
                    right: 0,
                    left: 250,
                }}
            >
                <div
                    style={{
                        flexGrow: 1,
                    }}
                >
                    {
                        selectedProfile.name
                    }
                </div>
                <div
                    style={{
                        marginRight: 20,
                    }}
                >
                    Sort: {' '}
                    <select
                        onChange={e => {
                            updateProfile(selectedProfile.id, {
                                ...selectedProfile,
                                sort: e.target.value,
                            })
                        }}
                        value={selectedProfile.sort}
                    >
                        {
                            sortOptions.map(opt => (
                                <option value={opt} key={opt}>{opt}</option>
                            ))
                        }
                    </select>
                </div>
                <div
                    onClick={() => loadContent()}
                    style={{
                        cursor: 'pointer',
                    }}
                >
                    Refresh
                </div>
            </div>
            <div
                style={{
                    paddingTop: 55,
                }}
            >
                {
                    loading
                        ? (
                            <div
                                style={{
                                    padding: 10,
                                    textAlign: 'center',
                                }}
                            >
                                Loading...
                            </div>
                        )
                        : posts
                            .map((post, idx) => (
                                <Post
                                    key={idx}
                                    post_id={idx.toString()}
                                    {...post.data}
                                />
                            ))
                }
            </div>
        </div>
    )
}