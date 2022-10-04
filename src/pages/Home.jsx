import React from 'react'
import UserResults from '../components/users/UserResults';
import UserSearch from '../components/users/UserSearch';
// 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
function Home() {
    const GITHUB_TOKEN = "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";
    const GITHUB_URL = "https://ap.github.com";
    return (
        <>
            <UserSearch />
            <UserResults />
        </>
    )
}

export default Home