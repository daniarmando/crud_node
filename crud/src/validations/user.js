const valid_login = (req, resp, next) => {
    const { email, password } = req.body;
    try {

        function emailFormat() {            
            return /\S+@\S+\.\S+/.test(email);
        }

        if (emailFormat) {
            throw new Error('Email inválido');
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