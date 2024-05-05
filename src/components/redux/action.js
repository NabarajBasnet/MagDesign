
export const SideNavbarState = (SideNavbarState)=>({
    type:'OPEN_SIDENAVBAR',
    payload:SideNavbarState,
})

export const AdminSidebarState = (adminSidebar)=>({
    type:'OPEN_ADMIN_SIDEBAR',
    payload:adminSidebar
})

export const SearchedQueryAction = (searchedQuery)=>({
    type:'SEARCH_QUERY',
    payload:searchedQuery
})

