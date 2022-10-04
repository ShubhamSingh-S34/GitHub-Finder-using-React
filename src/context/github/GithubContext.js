import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();


const REACT_APP_GITHUB_URL = "https://api.github.com";
const REACT_APP_GITHUB_TOKEN = "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"


export const GithubProvider = ({ children }) => {



    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState);



    // FETCH USERS FROM GITHUB API(TESTING PURPOSES)
    const searchUsers = async (text) => {
        setLoading();

        const params = new URLSearchParams({
            q: text
        })
        const response = await fetch(`${REACT_APP_GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${REACT_APP_GITHUB_TOKEN}`
            }
        })

        const { items } = await response.json();
        console.log(items);
        dispatch({
            type: "GET_USERS",
            payload: items,
        })
    }



    // FETCH SINGLE USER FROM GITHUB API(TESTING PURPOSES)
    const getUser = async (login) => {
        setLoading();

        const response = await fetch(`${REACT_APP_GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${REACT_APP_GITHUB_TOKEN}`
            }
        })

        if (response.status === 404) {
            window.location = '/notfound'
        } else {
            const data = await response.json();
            console.log(data);
            dispatch({
                type: "GET_USER",
                payload: data,
            })
        }


    }


    //GET USERS REOPS
    const getUserRepos = async (login) => {
        setLoading();

        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10,
        })

        const response = await fetch(`${REACT_APP_GITHUB_URL}/users/${login}/repos?${params}`, {
            headers: {
                Authorization: `token ${REACT_APP_GITHUB_TOKEN}`
            }
        })

        const data = await response.json()
        console.log(data);
        dispatch({
            type: "GET_REPOS",
            payload: data,
        })
    }



    // TO CLEAR SEARCHES
    const clearSearch = () => {
        dispatch({
            type: "CLEAR_SEARCH",
        })
    }



    // SET LOADING FUNCTION
    const setLoading = () => {
        dispatch({ type: "SET_LOADING" })
    }



    return (<GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        repos: state.repos,
        searchUsers,
        clearSearch,
        getUser,
        getUserRepos,
    }}>
        {children}
    </GithubContext.Provider>)


}

export default GithubContext;