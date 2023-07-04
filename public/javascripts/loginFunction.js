const login = async () => {
    console.log(document.getElementById('email').value)
    await fetch('/clientes/loginCliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById('email').value,
            senha: document.getElementById('senha').value
        })
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
        })
        .then(async (data) => {
            if (data) {
                const { token, clienteId } = data;
                localStorage.setItem('token', token);
                localStorage.setItem('clientId', clienteId);
                window.location.href = `/home?token=${token}`;
            }

        })
        .catch(error => {
            console.error('Ocorreu um erro ao fazer o login:', error);
            alert('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
        });
}