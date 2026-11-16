const user = required('./../models / User');

exports.signup = async (req, res, next) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        const newUser = await user.create(req.body);
        res.status(201).json(
            {
                message: 'User created successfully',
                data: {
                    user: newUser
                },
                status: 'success'
            });
    }
    catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}