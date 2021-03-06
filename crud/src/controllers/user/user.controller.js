const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../../models');

const create = async (request, response) => {
    try {
        const { email, password, firstName, lastName, isAdmin } = request.body;
        const user = await User.findOne({
            where: { email },
        });

        if (user) {
            throw new Error('Usuário já existe');
        }

        const encryptedPassword = crypto.createHash('md5').update(password).digest('hex');

        const doc_content = {
            email,
            firstName,
            lastName,
            password: encryptedPassword,
            isAdmin
        };

        const newUser = await User.create(doc_content);
        delete newUser.dataValues.password
        return response.status(201).json(newUser)
    } catch (error) {
        return response.status(403).json({ error: true, errorMessage: error.message })
    }
};

const login = async (request, response) => {
  try {
    const user = await User.findOne({
      where: { email: request.body.email },
    });
    if (!user) {
      throw new Error('Senha ou email incorreto');
    }
    const reqPass = crypto.createHash('md5').update(request.body.password || '').digest('hex');

    if (reqPass !== user.password) {
      throw new Error('Senha ou email incorreto');
    }
    const token = jwt.sign({
        user: {
          userId: user.id,
          email: user.email,
          createdAt: new Date(),
        },
      },
      '123456', //<--------CHAVE SECRETA PARA CRIAR O TOKEN
    );
    delete user.dataValues.password;
    return response.status(200).json({ user, token });
  } catch (error) {
    return response.status(403).json({ error: true, errorMessage: error.message });
  }
};

module.exports = { create, login }