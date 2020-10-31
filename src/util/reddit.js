import request from 'superagent'

const buildURL = (subreddit, sort, after, count) => {
    let url = 'https://www.reddit.com/r/';
    url += `${subreddit}/`;
    if(sort) {
        url += sort;
    }
    if(last_post || count) {
        var qs = {
            after,
            count
        };

        url += '?' + Object.keys(qs).filter(k => qs[k]).map(k => `${k}=${qs[k]}`).join('&');
    }
    return url;
}

export async function getPosts(subreddit, page, count = 25) {
    //`https://www.reddit.com/r/${ids[i]}/${sort}?count=25.json`
    const { body } = await request.get(buildUrl(subreddit, null, null, count));
}