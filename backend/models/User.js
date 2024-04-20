const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
console.log("testing sequelize");
console.log(sequelize);

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
    timestamps : false,
});

module.exports = User;

// async function testUserCreation() {
//     try {
//       const user = await User.create({
//         username: 'testuser',
//         email: 'test@example.com',
//         password: 'hashed_password'
//       });
//       console.log('User created:', user.toJSON());
//     } catch (error) {
//       console.error('Error creating user:', error);
//     }
//   }
  
//   testUserCreation();

// console.log("testing user");
// console.log(User);
