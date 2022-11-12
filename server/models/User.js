module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("User", {
      
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        uniqueOne: true
      }, 
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      security_question: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }, 
      security_answer: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      middle_name: {
        type: DataTypes.STRING,
      }, 
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      zip: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      marital_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_type: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, {tableName: 'User'});


    Users.associate = (models) => {
      Users.belongsTo(models.SecurityQuestion, {foreignKey: 'security_question'})
      Users.belongsTo(models.Role, {foreignKey: 'user_type'})
      Users.belongsTo(models.Employ, {foreignKey: 'user_id'})
    }

      return Users;

};
