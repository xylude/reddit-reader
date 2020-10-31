import React, { useState, useEffect } from 'react';
import { Modal } from "../Modal";
import request from 'superagent';
import ReactMarkdown from "react-markdown";

export function Comments({ url, visible, onClose, }) {

    const [comments, setComments] = useState(null);

    useEffect(() => {
        request
            .get(url)
            .then(({ body }) => {
                setComments(body)
            })
    }, []);

    return (
        <Modal visible={visible} onClickOutside={onClose}>
            {
                comments ? (
                    <>
                        {
                            comments.map(({ data }) => (
                                <ReactMarkdown
                                    key={data.id}
                                    source={data.selftext}
                                    linkTarget='_blank'
                                    escapeHtml={true}
                                />
                            ))
                        }
                    </>
                ) : (
                    <div>Loading...</div>
                )
            }
        </Modal>
    )
}