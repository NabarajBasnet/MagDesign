

const initialState = {
    SideNavbarState: false,
    adminSidebar: false,
    searchedQueryWord: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_SIDENAVBAR':
            return {
                ...state,
                SideNavbarState: !state.SideNavbarState
            }

        case 'OPEN_ADMIN_SIDEBAR':
            return {
                ...state,
                adminSidebar: !state.adminSidebar
            }
        
        case 'SEARCH_QUERY':
            return{
                ...state,
                searchedQueryWord: action.payload
            }


        default:
            return state;
    }
}

export default reducer;