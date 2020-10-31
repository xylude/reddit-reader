export function isImage(url) {
    return !!url.match(/(\.png|\.jpg|\.gif|\.jpeg)$/)
}

export function getVideo(preview) {
    return preview && preview.reddit_video_preview
}

export function decode(html) {
    const el = document.createElement('textarea');
    el.innerHTML = html;
    return el.value;
};