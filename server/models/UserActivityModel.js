module.exports = (sequelize, DataTypes) => {
    const UserActivity = sequelize.define("UserActivity", {  

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      search_string: {
          type: DataTypes.STRING,
      },

      // createdAt: {
      //   type: DataTypes.DATE,
      //   defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      // },

      // updatedAt: {
      //   type: DataTypes.DATE,
      //   defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      // },

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, {tableName: 'UserActivity', timestamps: true});

    // UserActivity.associate = (model) => {
    //     UserActivity.hasMany(model.User, {foreignKey: 'user_id'})
    //     UserActivity.hasMany(model.InsurancePolicy, {foreignKey: 'policy_id'})
    // }

    return UserActivity;
  };
