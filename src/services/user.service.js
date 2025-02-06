const User = require('../persistance/user/user.model');
const jwt = require('jsonwebtoken');
const {AppError, NotFoundError, BadRequestError, UnauthorizedError} = require('../middlewares/error/custom.error');

class UserService {

    static async findAll() {
        try {
            return await User.findAll();
        } catch (error) {
            throw new AppError('Error fetching all users', 500);
        }
    }

    static async findByEmail(email) {
        console.log(email)
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            throw new NotFoundError('User not found');
        }
        return user;
    }

    static signToken(email) {
        return jwt.sign({email}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,

        });
    }

    static async signup({email, password, name}) {
            await User.create({
                name,
                email,
                password,
            });
            return this.signToken(email);

    }

    static async signIn({email, password}) {
        if (!email || !password) {
            throw new BadRequestError('Please provide email and password');
        }

        const user = await this.findByEmail(email);

        if (!user || !(password === user.password)) {
            throw new UnauthorizedError('Incorrect email or password');
        }

        return this.signToken(email);

    }
}

module.exports = UserService;