const {Sequelize , DataTypes}  = require('sequelize');

const sequelize = new Sequelize('NEW', 'souvik', 'souvik', {
    dialect: 'mssql',
    host: 'IN-PG02NKJM',
    dialectOptions:{
        encrypt: true
    }

});

sequelize.authenticate().then((err) =>{
    console.log('database connected')
})
.catch((err) => {
    console.log('err', err)
})

module.exports = {sequelize,  DataTypes};