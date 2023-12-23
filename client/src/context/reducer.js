import { DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, SETUP_USER_BEGIN, SETUP_USER_SUCCESS, SETUP_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, HANDLE_CHANGE, CLEAR_VALUES, CREATE_JOB_BEGIN, CREATE_JOB_SUCCESS, CREATE_JOB_ERROR, GET_JOBS_BEGIN, GET_JOBS_SUCCESS, SET_EDIT_JOB, DELETE_JOB_BEGIN, EDIT_JOB_BEGIN, EDIT_JOB_SUCCESS, EDIT_JOB_ERROR, UPDATE_AVATAR_ERROR, DELETE_JOB_ERROR, GET_STATS_BEGIN, GET_STATS_SUCCESS, GET_STATS_ERROR, CLEAR_FILTERS, CHANGE_PAGE } from "./actions";
import { initialState } from './appContext';

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            // alertType: 'error',
            alertText: 'Please provide all values!'
        }
    }
    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: ''
        }
    }
    if (action.type === REGISTER_USER_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            token: action.payload.token,
            userLocation: action.payload.userLocation,
            jobLocation: action.payload.jobLocation,
            showAlert: true,
            alertType: 'success',
            alertText: 'User created! Redirecting...'
        }
    }

    if (action.type === REGISTER_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === LOGIN_USER_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            token: action.payload.token,
            userLocation: action.payload.userLocation,
            jobLocation: action.payload.jobLocation,
            showAlert: true,
            alertType: 'success',
            alertText: 'Login successful! Redirecting...'
        }
    }

    if (action.type === LOGIN_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === SETUP_USER_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === SETUP_USER_SUCCESS) {
        const { user, token, userLocation, jobLocation, alertText } = action.payload
        return {
            ...state,
            isLoading: false,
            user: user,
            token: token,
            userLocation: userLocation,
            jobLocation: jobLocation,
            showAlert: true,
            alertType: 'success',
            alertText: alertText
        }
    }

    if (action.type === SETUP_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            // alertText: action.payload.msg
            alertText: action.payload.msg
        }
    }

    if (action.type === TOGGLE_SIDEBAR) {
        return { ...state, showSidebar: !state.showSidebar }
    }

    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null,
            userLocation: '',
            jobLocation: '',
        }
    }

    if (action.type === UPDATE_USER_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === UPDATE_USER_SUCCESS) {
        const { user, token, userLocation, jobLocation, alertText } = action.payload
        return {
            ...state,
            isLoading: false,
            user: user,
            token: token,
            userLocation: userLocation,
            jobLocation: jobLocation,
            showAlert: true,
            alertType: 'success',
            alertText: 'User updated successfully...'
        }
    }

    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            // alertText: action.payload.msg
            alertText: action.payload.msg
        }
    }

    if (action.type === UPDATE_AVATAR_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            // alertText: action.payload.msg
            alertText: 'image size should not be greater than 1 mb'
        }
    }

    if (action.type === HANDLE_CHANGE) {
        return {
            ...state,
            page: 1,
            [action.payload.name]: action.payload.value
        }
    }

    if (action.type === CLEAR_VALUES) {
        const initialState = {
            isEditing: false,
            editJobId: '',
            position: '',
            company: '',
            jobLocation: state.userLocation,
            jobType: 'full-time',
            status: 'pending'
        }
        return { ...state, ...initialState }
    }

    if (action.type === CREATE_JOB_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === CREATE_JOB_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New Job Created!'
        }
    }

    if (action.type === CREATE_JOB_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === GET_JOBS_BEGIN) {
        return { ...state, isLoading: true, showAlert: false }
    }

    if (action.type === GET_JOBS_SUCCESS) {
        const { jobs, totalJobs, numOfPages } = action.payload
        return {
            ...state,
            isLoading: false,
            jobs: jobs,
            numOfPages: numOfPages,
            totalJobs: totalJobs,
        }
    }

    if (action.type === SET_EDIT_JOB) {
        const job = state.jobs.find((item) => item._id === action.payload.id);
        console.log(job, "reducer");
        const { _id, company, position, jobType, jobLocation, status } = job;
        return {
            ...state,
            isEditing: true,
            editJobId: _id,
            position,
            company,
            jobType,
            jobLocation,
            status,
        }
    }

    if (action.type === DELETE_JOB_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === DELETE_JOB_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === EDIT_JOB_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === EDIT_JOB_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Job updated'
        }
    }

    if (action.type === EDIT_JOB_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === GET_STATS_BEGIN) {
        return { ...state, isLoading: true, showAlert: false }
    }

    if (action.type === GET_STATS_SUCCESS) {
        const { defaultStats, monthlyApplications } = action.payload
        return {
            ...state,
            isLoading: false,
            defaultStats: defaultStats, 
            monthlyApplications: monthlyApplications
        }
    }

    if (action.type === GET_STATS_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }
    if(action.type === CLEAR_FILTERS){
        return {
            ...state,
            search: '',
            searchType: 'all',
            searchStatus: 'all',
            sort: 'newest',
        }
    }

    if(action.type === CHANGE_PAGE){
        return {
            ...state,
            page: action.payload.page
        }
    }

    throw new Error(`no such action: ${action.type}`)
}

export default reducer;