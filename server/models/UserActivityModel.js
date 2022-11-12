module.exports = (sequelize, DataTypes) => {
    const UserActivity = sequelize.define("UserActivity", {  

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      user_id: {
        type:DataTypes.INTEGER,
        allowNull: false
      },

      policy_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }, 

      search_string: {
          type: DataTypes.STRING,
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, {tableName: 'UserActivity', timestamps: false});

    UserActivity.associate = (model) => {
        UserActivity.hasMany(model.User, {foreignKey: 'user_id'})
        UserActivity.hasMany(model.InsurancePolicy, {foreignKey: 'policy_id'})
    }

    return UserActivity;
  };
