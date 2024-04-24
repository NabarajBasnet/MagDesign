

const initialState = {
    SideNavbarState:false,
    adminSidebar:true,
}

const reducer = (state=initialState, action)=>
{
    switch(action.type)
    {
        case 'OPEN_SIDENAVBAR':
            return{
                ...state,
                SideNavbarState:!state.SideNavbarState
            }   

        case 'OPEN_ADMIN_SIDEBAR':
            return{
                ...state,
                adminSidebar:!state.adminSidebar
            }

        default:
            return state;
    }
}

export default reducer;