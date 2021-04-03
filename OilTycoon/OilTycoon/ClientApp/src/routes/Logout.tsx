export function Logout() {
    localStorage.clear();
    console.log("storage cleared");

    window.location.href = '/login';

    return null;
}