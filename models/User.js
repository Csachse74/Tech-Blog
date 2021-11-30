const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER
            , primaryKey: true
            , autoIncrement: true
            , allowNull: false
        }
        , username: {
            type: DataTypes.STRING
            , allowNull: false
        }
        , password: {
            type: DataTypes.STRING
            , validate: {
                len: [4]
            }
            , allowNull: false
        }
    }
    , {
        hooks: {
            beforeCreate: async (newUser) => {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            }
            , beforeUpdate: async (updateUser) => {
                updateUser.password = await bcrypt.hash(updateUser.password, 10);
                return updateUser;
            }
        }
        , sequelize
        , timestamps: false
        , freezeTableName: true
        , underscored: true
        , modelName: 'User'
    }
);

module.exports = User;
