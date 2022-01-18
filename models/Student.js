const {sequelize, DataTypes} = require('./index');

const Students = sequelize.define("students", {
    RollNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
        
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Dob: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

Students.sync({alter: true})
.then(() => console.log('syncing students'));
module.exports = Students;