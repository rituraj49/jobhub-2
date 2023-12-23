import React, { useContext, useEffect, useReducer, useState } from 'react';
import reducer from './reducer';
import { DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, SETUP_USER_BEGIN, SETUP_USER_SUCCESS, SETUP_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, HANDLE_CHANGE, CLEAR_VALUES, CREATE_JOB_BEGIN, CREATE_JOB_SUCCESS, CREATE_JOB_ERROR, GET_JOBS_BEGIN, GET_JOBS_SUCCESS, SET_EDIT_JOB, DELETE_JOB_BEGIN, EDIT_JOB_BEGIN, EDIT_JOB_ERROR, EDIT_JOB_SUCCESS, UPDATE_AVATAR_ERROR, DELETE_JOB_ERROR, GET_STATS_BEGIN, GET_STATS_SUCCESS, GET_STATS_ERROR, CLEAR_FILTERS, CHANGE_PAGE } from "./actions";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || '',
    showSidebar: false,

    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobLocation: userLocation || '',
    jobTypeOptions: ['part-time', 'full-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'pending', 'declined'],
    status: 'pending',

    search: '',
    searchType: 'all',
    searchStatus: 'all',
    sort: 'newest',
    sortOptions: ['newest', 'oldest', 'ascending', 'descending', 'lastModified'],
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,

    defaultStats: {},
    monthlyApplications: []
}

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    // const [state, setState] = useState(initialState);
    const [state, dispatch] = useReducer(reducer, initialState);

    // axios
    // axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    const authFetch = axios.create({
        baseURL: 'https://jobhub-rituraj.onrender.com/api/v1',
        // headers: {
        //     Authorization: `Bearer ${state.token}`,
        // }
    })

    // request interceptor
    authFetch.interceptors.request.use((config) => {
        // console.log(config, 'interceptor token');
        config.headers['Authorization'] = `Bearer ${state.token}`;
        // console.log(config, 'after adding token');
        return config
        // config.headers.common = { ...(config.headers.common || {}) };
    }, (error) => {
        return console.log('interceptor error', error.response);
    });

    // response interceptor
    authFetch.interceptors.response.use((response) => {
        // console.log('response interceptor');
        //  76, 296
        return response
    }, (error) => {
        console.log(error);
        if (error.response.status === 401) {
            console.log('AUTH ERROR');
            logoutUser();
        }
        return Promise.reject(error);
    });

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
        clearAlert();
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT });
        }, 3000);
    }

    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('location', location);
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('location')
    }

    const registerUser = async (currentUser) => {
        // console.log(currentUser);
        dispatch({ type: REGISTER_USER_BEGIN });
        try {
            const response = await axios.post('/auth/register', currentUser);
            console.log(response);
            const { user, token, location } = response.data;
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: { user, token, location }
            });
            addUserToLocalStorage({ user, token, location });
            // local storage
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: error.response.data.msg }
            })
            // displayAlert();
        }
        clearAlert();
    }

    const loginUser = async (candidateUser) => {
        dispatch({ type: LOGIN_USER_BEGIN });
        try {
            // const { data } = await axios.post('http://localhost:5000/api/v1/auth/login', candidateUser);
            const { data } = await axios.post('/auth/login', candidateUser);
            console.log(data);
            const { user, token, location } = data;
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { user, token, location }
            });
            addUserToLocalStorage({ user, token, location });
            // local storage
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { msg: error.response.data.msg }
            })
            // displayAlert();
        }
        clearAlert();
    }

    const setupUser = async ({ currentUser, endPoint, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN });
        console.log(currentUser);
        try {
            const { data } = await axios.post(`/auth/${endPoint}`, currentUser);
            console.log(data);

            const { user, token, location } = data;
            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: { user, token, location, alertText }
            });
            // local storage
            addUserToLocalStorage({ user, token, location });
        } catch (error) {
            // console.log(`${Object.keys(error)} : ${Object.values(error)}`);
            console.log(error);
            dispatch({
                type: SETUP_USER_ERROR,
                payload: { msg: error.response.data.msg }
            })
            displayAlert();
        }
        clearAlert();
    }

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR });
    }

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER });
        removeUserFromLocalStorage();
    }

    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN });
        console.log(currentUser, 'curr user');
        // console.log(currentUser.entries);
        try {
            // const { data } = await authFetch.patch(`/auth/update`, currentUser);
            // const formData = new FormData();
            // for(const key in currentUser){
            //     formData.append(key, currentUser[key]);
            //     console.log(formData, 'in loop');
            // }
            // const name = currentUser.get('name');
            // const lastName = currentUser.get('lastName');
            // const email = currentUser.get('email');
            // const locationd = currentUser.get('location');
            const file = currentUser.get('avatar');
            if (file.size > 1000000) {
                dispatch({ type: UPDATE_AVATAR_ERROR });
                return null;
            }
            // console.log(currentUser.avatar);

            // console.log(formData, 'form data');
            const { data } = await authFetch(`/auth/update`,
                {
                    method: 'patch',
                    data: currentUser,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            );
            console.log(data);
            const { user, location, token } = data;
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user, location, token }
            });

            addUserToLocalStorage({ user, token, location });
        } catch (error) {
            // console.log(error.response);
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: error.response.data.msg }
                });
            }
        }
        clearAlert();
    }

    const handleChange = ({ name, value }) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload: { name, value }
        });
    }

    const clearValues = () => {
        dispatch({
            type: CLEAR_VALUES
        });
    }

    const createJob = async () => {
        dispatch({ type: CREATE_JOB_BEGIN })
        try {
            const { position, company, jobLocation, jobType, status } = state;
            const { data } = await authFetch.post('/jobs', {
                position,
                company,
                jobLocation,
                jobType,
                status
            });
            console.log(data);
            dispatch({ type: CREATE_JOB_SUCCESS });
            clearValues();
        } catch (error) {
            if (error.response.status === 401) return;
            // console.log(error);
            dispatch({
                type: CREATE_JOB_ERROR,
                payload: { msg: error.response.data.msg }
            });
        }
        clearAlert();
    }

    const getAllJobs = async () => {
        const { page, searchStatus, searchType, sort, search } = state;

        let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort+by=${sort}`;
        if(search){
            url = url+`&search=${search}`
        }
        dispatch({ type: GET_JOBS_BEGIN });
        try {
            const { data } = await authFetch.get(url);
            console.log(data);
            const { jobs, numOfPages, totalJobs } = data;
            dispatch({
                type: GET_JOBS_SUCCESS,
                payload: { jobs, numOfPages, totalJobs }
            })
        } catch (error) {
            console.log(error.response);
            // logoutUser();
            dispatch({
                type: CREATE_JOB_ERROR,
                payload: { msg: error.response.data.msg }
            });
        }
        clearAlert();
    }

    const clearFilters = () => {
        dispatch({
            type: CLEAR_FILTERS
        });
    }

    const changePage = (page) => {
        dispatch({
            type: CHANGE_PAGE,
            payload: { page }
        })
    }

    const setEditJob = (id) => {
        console.log(`set edit job: ${id}`);
        dispatch({
            type: SET_EDIT_JOB,
            payload: { id }
        });
        // editJob();
    }

    const editJob = async () => {
        dispatch({ type: EDIT_JOB_BEGIN });
        console.log("edit job begin");
        try {
            const { position, company, jobLocation, jobType, status, editJobId } = state;
            await authFetch.patch(`/jobs/${editJobId}`, {
                position,
                company,
                jobLocation,
                jobType,
                status
            })
            // console.log("edit job error:-", editJobId);
            dispatch({ type: EDIT_JOB_SUCCESS });
            console.log("edit job success");
            clearValues();
        } catch (error) {
            console.log("edit job error:-", state.editJobId);
            if (error.response.status === 401) return;
            dispatch({
                type: EDIT_JOB_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }
        // console.log('edit job');
    }

    const deleteJob = async (id) => {
        dispatch({ type: DELETE_JOB_BEGIN });
        try {
            await authFetch.delete(`/jobs/${id}`);
            getAllJobs();
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: DELETE_JOB_ERROR,
                payload: { msg: error.response.data.msg }
            })
            logoutUser();
        }
        // console.log(`delete job: ${id}`);
    }

    const getStats = async () => {
        dispatch({ type: GET_STATS_BEGIN });
        console.log("get stats begin");
        try {
            const { data } = await authFetch.get('/jobs/stats');
            console.log(data, "stats data");
            const { defaultStats, monthlyApplications } = data;
            dispatch({
                type: GET_STATS_SUCCESS,
                payload: { defaultStats, monthlyApplications }
            })
        } catch (error) {
            // console.log(error.response);
            console.log("stats error");
            console.log(error);
            // logoutUser();
            dispatch({
                type: GET_STATS_ERROR, //check the action
                payload: { msg: error.response.data.msg }
            });
        }
        clearAlert();
    }

    return (
        <AppContext.Provider
            value={{ ...state, displayAlert, clearAlert, registerUser, loginUser, setupUser, toggleSidebar, logoutUser, updateUser, handleChange, clearValues, createJob, getAllJobs, setEditJob, editJob, deleteJob, getStats, clearFilters, changePage }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
}

export { AppProvider, initialState };
