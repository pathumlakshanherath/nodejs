const Customer = require('../models/customer.model');
const jwt = require('jsonwebtoken');
const {NotFoundError, BadRequestError, UnauthorizedError} = require('../middlewares/error/custom.error');

class CustomerService {

    static async findByEmail(email) {
        console.log(email)
        const user = await Customer.findOne({where: {email: email}});
        if (!user) {
            throw new NotFoundError('Customer not found');
        }
        return user;
    }

    static signToken(email) {
        return jwt.sign({email}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,

        });
    }

    static async signup({email, password, name, mobile}) {
        await Customer.create({
            name, email, password, mobile
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

module.exports = CustomerService;