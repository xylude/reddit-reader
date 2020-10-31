import React from 'react';
import {getVideo, isImage} from "./util";

export function Action({
    children,
    url,
    media_embed,
    preview,
    setShowEmbed,
    setShowVideo,
    setShowImage,
}) {
    const videoData = getVideo(preview);

    return  media_embed.content ? (
        <span
            style={{
                textDecoration: 'underline',
                cursor: 'pointer'
            }}
            onClick={() => setShowEmbed(true)}
        >
            {children}
        </span>
    ) : videoData ? (
        <span
            style={{
                textDecoration: 'underline',
                cursor: 'pointer'
            }}
            onClick={() => setShowVideo(true)}
        >
            {children}
        </span>
    ) : isImage(url) ? (
        <span
            style={{
                textDecoration: 'underline',
                cursor: 'pointer'
            }}
            onClick={() => setShowImage(true)}
        >
            {children}
        </span>
    )  : (
        <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
        >
            {children}
        </a>
    );
}