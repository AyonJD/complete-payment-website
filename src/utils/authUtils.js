import { delStorage } from "./localStorage";

export const isAuthenticated = (user) => {
    if (user && user.token) {
        return true;
    }
    return false;
};

export const isAuthorized = (error) => {
    if (error.response.status === 401) {
        return false;
    }
    return true;
};

export const logout = (navigate) => {
    delStorage("payment_user");
    delStorage("token");
    navigate("/auth/login");
};
