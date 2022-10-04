import React from 'react'
import { useContext } from 'react'
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import GithubContext from '../../context/github/GithubContext';

function UserResults() {

    const REACT_APP_GITHUB_URL = "https://api.github.com";
    const REACT_APP_GITHUB_TOKEN = "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"

    const { users, loading } = useContext(GithubContext)



    if (!loading) {
        return (
            <div className='grid grid-colss-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
                {users.map((user) => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        )
    } else {
        return <Spinner />
    }

}

export default UserResults