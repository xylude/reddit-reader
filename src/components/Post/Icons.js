import React from 'react';
import {getVideo, isImage} from "./util";

import LinkIcon from '@material-ui/icons/Link';
import LaunchIcon from '@material-ui/icons/Launch';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import ImageIcon from '@material-ui/icons/Image';
import VideocamIcon from '@material-ui/icons/Videocam';

const iconStyle = {
    width: 15,
};

const buttonStyle = {
    cursor: 'pointer',
    marginLeft: 5,
}

export function Icons({
    url,
    media_embed,
    preview,
    permalink,
    setShowImage,
    setShowVideo,
    setShowEmbed,
}) {
    const videoData = getVideo(preview);

    return (
        <div
            style={{
                float: 'right',
                width: 200,
                textAlign: 'right',
            }}
        >
            {
                isImage(url) && (
                    <span
                        onClick={() => setShowImage(true)}
                        title='View Image'
                        style={buttonStyle}
                    >
                        <ImageIcon style={iconStyle} />
                    </span>
                )
            }
            {
                media_embed.content ? (
                    <span
                        onClick={() => setShowEmbed(true)}
                        title='View Embed'
                        style={buttonStyle}
                    >
                        <OpenInBrowserIcon style={iconStyle} />
                    </span>
                ) : videoData ? (
                    <span
                        onClick={() => setShowVideo(true)}
                        title='View Video'
                        style={buttonStyle}
                    >
                        <VideocamIcon style={iconStyle} />
                    </span>
                ) : null
            }
            <a
                href={`https://www.reddit.com/${permalink}`}
                target='_blank'
                rel='noopener noreferrer'
                title='View post on Reddit'
                style={buttonStyle}
            >
                <LaunchIcon style={iconStyle} />
            </a>
            <a
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                title='Go to Link'
                style={buttonStyle}
            >
                <LinkIcon style={iconStyle} />
            </a>
            {/*Todo: coming soon*/}
            {/*<a*/}
            {/*    href={url}*/}
            {/*    target='_blank'*/}
            {/*    rel='noopener noreferrer'*/}
            {/*    title='Comments (0)'*/}
            {/*    style={buttonStyle}*/}
            {/*>*/}
            {/*    <ChatBubbleIcon style={iconStyle} />*/}
            {/*</a>*/}
        </div>
    )
}