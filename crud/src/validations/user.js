const valid_login = (req, resp, next) => {
    const { email, password } = req.body;
    try {

        //validar se o email e válido e adicionar no if abaixo
        function emailFormat() {

        }

        if (email && password && typeof(email) === 'string' && typeof(password) === 'string') {
            console.log('Login Middleware');
            next();
        } else {
            throw new Error('Senha ou Email incorretos')
        }
    } catch (error) {
        return resp.status(403).json({ error: true, errorMessage: error.message })
    }
}

module.exports = { valid_login }