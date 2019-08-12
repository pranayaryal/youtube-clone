import React, { useState, useEffect } from 'react';

import { Grid } from '@material-ui/core';

import { SearchBar, VideoList, VideoDetail } from './components'

import youtube from './api/youtube';

const App = () => {

    const [ videos, setVideos ] = useState([]);
    const [ selectedVideo, setSelectedVideo ] = useState(null);

    useEffect(() => {
        handleSubmit('let it go')
    }, [])

    const handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 5,
                key: 'AIzaSyD8wnHp2w_4a8My6ukgOaiTbOFtLjkSC4o',
                q: searchTerm
            }
        })

        setVideos(response.data.items)
        setSelectedVideo(response.data.items[0])

    }

    const onVideoSelect = (video) => {
        setSelectedVideo(video);
    }

    return (
        <Grid justify="center" container spacing={10}>
            <Grid item xs={12}>
                <Grid container spacing={10}>
                    <Grid item xs={8}>
                        <SearchBar onFormSubmit={handleSubmit} />
                    </Grid>
                    <Grid item xs={8}>
                        <VideoDetail video={selectedVideo} />
                    </Grid>
                    <Grid item xs={4}>
                        <VideoList videos={videos} onVideoSelect={onVideoSelect}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default App;
