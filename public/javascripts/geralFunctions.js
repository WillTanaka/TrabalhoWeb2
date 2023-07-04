const home = () => {
    window.location.href = `/home?token=${localStorage.getItem('token')}`;
}
const acessos = async () => {
    await fetch('/clientes/acessos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                response.json().then(data => {
                    const error = data.error;
                    alert(error)
                    document.getElementById("error").textContent = error
                });
            }
        }).then(async (data) => {
            if (data) {
                console.log(data.result)
            }
        })
}
const logout = () => {
    localStorage.clear()
    window.location.href = "/logout"
}