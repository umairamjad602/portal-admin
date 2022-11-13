export enum NavigationType {
    Menu,
    NavigationTitle
}

export const NAVIGATION = [
    {
        id: 1,
        title: 'Dashboard',
        link: '/portal/Dashboard',
        icon: 'fa fa-line-chart',
        type: NavigationType.NavigationTitle
    },
    {
        id: 2,
        title: 'Inventory',
        link: '/portal/Dashboard',
        icon: 'fa fa-sitemap',
        type: NavigationType.NavigationTitle
    }
];