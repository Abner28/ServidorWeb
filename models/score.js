const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Score', {
        pseudo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        score : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        // Other model options go here
    });
}