module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define("Rating", {  
      user_id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
      },

      policy_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false        
      }, 

      rating: {
          type: DataTypes.INTEGER,
          allowNull: false
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },

    }, {tableName: 'Rating'});

    Rating.associate = (model) => {
        Rating.hasMany(model.User, {foreignKey: 'user_id'})
        Rating.hasMany(model.InsurancePolicy, {foreignKey: 'policy_id'})
    }

    return Rating;
  };
