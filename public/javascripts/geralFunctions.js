const home = () => {
    window.location.href = `/home?token=${localStorage.getItem('token')}`;
}

const logout = () => {
    localStorage.clear()
    window.location.href = "/logout"
}