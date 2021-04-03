export function Logout() {
    localStorage.clear();
    console.log("storage cleared");

    return window.location.href = '/login';
}