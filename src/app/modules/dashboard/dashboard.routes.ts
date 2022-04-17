export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  id?:string
}
export const dashboardRoutes: RouteInfo[] = [
{ path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '',id:"dashboard" },
{ path: '/categories', title: 'Categories', icon: 'category', class: '',id:"Category" },
{ path: '/books', title: 'Books', icon: 'book', class:'', id: 'book' },
];
