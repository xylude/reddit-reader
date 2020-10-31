import React, { useState, } from 'react'
import ReactMarkdown from "react-markdown";
import {Modal} from "../Modal";

import { isImage, getVideo, decode } from "./util";

import LinkIcon from '@material-ui/icons/Link';
import LaunchIcon from '@material-ui/icons/Launch';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import ImageIcon from '@material-ui/icons/Image';
import VideocamIcon from '@material-ui/icons/Videocam';
import {Action} from "./Action";
import {Icons} from "./Icons";

const iconStyle = {
    width: 15,
};

const buttonStyle = {
    cursor: 'pointer',
    marginLeft: 5,
}

export default function Post(post) {
    const {
        thumbnail,
        permalink,
        url,
        title,
        subreddit_name_prefixed,
        selftext,
        media_embed,
        preview,
        post_id,
    } = post;

    const [ truncated, setTruncated ] = useState(true);
    const [ showEmbed, setShowEmbed ] = useState(false);
    const [ showImage, setShowImage ] = useState(false);
    const [ showVideo, setShowVideo ] = useState( false);

    const imageWidth = preview && preview.images && preview.images.length > 0 ? preview.images[0].source.width : 800;
    const videoData = getVideo(preview);



    return (
        <div
            style={{
                padding: '10px 30px',
                borderBottom: '1px solid #000',
                display: 'flex',
            }}
            id={post_id}
        >
            <div>
                <Action
                    {...post}
                    setShowEmbed={setShowEmbed}
                    setShowImage={setShowImage}
                    setShowVideo={setShowVideo}
                >
                    <img
                        src={thumbnail && thumbnail.startsWith('http') ? thumbnail : 'reddit.png'}
                        style={{
                            marginRight: 10,
                            width: 80,
                        }}
                    />
                </Action>
            </div>
            <div
                style={{
                    width: 1000,
                }}
            >
               <Icons
                   {...post}
                   setShowEmbed={setShowEmbed}
                   setShowImage={setShowImage}
                   setShowVideo={setShowVideo}
               />

                <div
                    style={{
                        fontWeight: 900,
                        padding: '5px 0',
                        maxWidth: 800,
                    }}
                >
                    <Action
                        {...post}
                        setShowEmbed={setShowEmbed}
                        setShowImage={setShowImage}
                        setShowVideo={setShowVideo}
                    >
                        {title}
                    </Action>
                </div>
                <div
                    style={{
                        fontSize: '.8em',
                        fontWeight: 100,
                    }}
                >
                    <a
                        href={`https://www.reddit.com/${subreddit_name_prefixed}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{
                            marginRight: 10,
                        }}
                    >
                        {subreddit_name_prefixed}
                    </a>
                </div>
                {
                    selftext && (
                        <div
                            style={{
                                lineHeight: '1.2em',
                            }}
                        >
                            <div
                                style={{
                                    height: truncated ? '3.6em' : 'auto',
                                    overflow: 'hidden',
                                    width: 800,
                                }}
                            >
                                <ReactMarkdown
                                    source={selftext}
                                    linkTarget='_blank'
                                    escapeHtml={true}
                                />
                            </div>

                            <a
                                href={truncated ? `#${post_id}` : '#'}
                                onClick={() => setTruncated(!truncated)}
                                style={{
                                    fontSize: '.7em',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                }}
                            >
                                {truncated ? 'More' : 'Less'}
                            </a>
                        </div>
                    )
                }
            </div>
            {
                media_embed.content && (
                    <Modal
                        onClickOutside={() => setShowEmbed(false)}
                        visible={showEmbed}
                        style={{ width: media_embed.width + 20, height: media_embed.height + 20 }}
                    >
                        <div
                            style={{
                                width: media_embed.width,
                                height: media_embed.height,
                            }}
                            dangerouslySetInnerHTML={{
                                __html: decode(media_embed.content.replace('position:absolute;', '')),
                            }}
                        />
                    </Modal>
                )
            }

            {
                isImage(url) && (
                    <Modal
                        onClickOutside={() => setShowImage(false)}
                        visible={showImage}
                        style={{
                            width: imageWidth + 20,
                            maxWidth: 820,
                        }}
                    >
                        <img
                            style={{
                                width: imageWidth,
                                maxWidth: 800,
                            }}
                             src={url}
                        />
                    </Modal>
                )
            }

            {
                videoData && (
                    <Modal
                        onClickOutside={() => setShowVideo(false)}
                        visible={showVideo}
                        style={{ width: getVideo(preview).width + 20 }}
                    >
                        <video autoPlay={true} controls width={videoData.width}>
                            <source src={videoData.fallback_url} type='video/webm'/>
                        </video>
                    </Modal>
                )
            }
        </div>
    )
}