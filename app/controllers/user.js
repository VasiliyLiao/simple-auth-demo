const { getUser, updateUserName } = require('../repositories/user');

exports.info = async (req, res) => {
    const user = await getUser(req.user.id);
    user.email = req.user.email;
    user.provider = req.user.provider;

    res.render('dashboard', { user });
};

exports.changeName = async (req, res) => {
    const {
        name,
    } = req.body;

    await updateUserName(req.user.id, name);

    res.json({
        name,
    });
};
