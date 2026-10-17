/** Single source of truth for every URL in the app. */
export const ROUTES = {
  home: "/",
  about: "/about",
  menu: "/menu",
  product: (id: string) => `/menu/${id}`,
  search: "/search",
  cart: "/cart",
  checkout: "/checkout",
  orders: "/orders",
  contact: "/contact",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  profile: "/profile",
  updateProfile: "/profile/edit",
  updateAddress: "/profile/address",
  admin: {
    dashboard: "/admin",
    login: "/admin/login",
    products: "/admin/products",
    addProduct: "/admin/products/new",
    categories: "/admin/categories",
    orders: "/admin/orders",
    couriers: "/admin/couriers",
    notifications: "/admin/notifications",
  },
} as const;

/** Menu page filtered to one category. */
export const categoryHref = (categoryId: string) => `${ROUTES.menu}?category=${categoryId}`;

