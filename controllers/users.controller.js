const { getUserData } = require("../utils/user")

module.exports.randomUser = (req, res) => {
    let users = getUserData()
    res.status(200).send({
        success: true,
        message: 'Successfully get a rendom user',
        data: users[Math.floor(Math.random() * users.length)]
    })
}
module.exports.allUser = (req, res) => {
    let users = getUserData()
    const { limit } = req.query;
    res.status(200).send({
        success: true,
        message: 'Successfully get users',
        data: limit ? users.slice(0, limit) : users,
    })
}
module.exports.saveUser = (req, res) => {
    const { gender, name, contact, address, photoUrl } = req.body;
    if (gender && name && contact && address && photoUrl) {
        let users = getUserData()
        const user = { id: users[users.length - 1].id + 1, gender, name, contact, address, photoUrl }
        users.push(user);
        saveUserData(users)
        res.status(200).send({
            success: true,
            message: 'Successfully saved user',
            data: user
        })
    } else {
        res.status(400).send({
            success: false,
            message: 'Missing a mandatory argument',
            data: null
        })
    }
}
module.exports.updateUser = (req, res) => {
    const id = req.params.id;
    const user = req.body;
    let users = getUserData();
    let targetedUser = users.find(user => user.id == id);
    if (targetedUser) {
        user.gender && (targetedUser.gender = user.gender)
        user.name && (targetedUser.name = user.name)
        user.contact && (targetedUser.contact = user.contact)
        user.address && (targetedUser.address = user.address)
        user.photoUrl && (targetedUser.photoUrl = user.photoUrl)

        saveUserData(users)
        res.status(200).send({
            success: true,
            message: 'Successfully saved user',
            data: targetedUser
        })
    } else {
        res.status(400).send({
            success: false,
            message: 'No User Found',
            data: null
        })
    }
}
module.exports.bulkUpdate = (req, res) => {
    const { user, userIds } = req.body;
    if (!_.isEmpty(user) && userIds && userIds.length != 0) {
        let users = getUserData();
        let updatedUsers = [];
        userIds.map((id) => {
            let targetedUser = users.find(user => user.id == id);
            if (targetedUser) {
                user.gender && (targetedUser.gender = user.gender)
                user.name && (targetedUser.name = user.name)
                user.contact && (targetedUser.contact = user.contact)
                user.address && (targetedUser.address = user.address)
                user.photoUrl && (targetedUser.photoUrl = user.photoUrl)
                updatedUsers.push(targetedUser)
            }
        })
        saveUserData(users)
        res.status(200).send({
            success: true,
            message: 'Successfully saved user',
            data: updatedUsers
        })
    } else {
        res.status(400).send({
            success: false,
            message: 'No User Found',
            data: null
        })
    }
}
module.exports.deleteUser = (req, res) => {
    const id = req.params.id;
    let users = getUserData();
    let targetedUser = _.findWhere(users, {
        id: Number(id)
    })
    if (targetedUser) {
        let filteredUsers = _.without(users, targetedUser);
        saveUserData(filteredUsers)
        res.status(200).send({
            success: true,
            message: 'Successfully Deleted user',
            data: targetedUser
        })
    } else {
        res.status(400).send({
            success: false,
            message: 'No User Found',
            data: null
        })
    }

}