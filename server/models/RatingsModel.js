module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define("Rating", {  
      rating: {
          type: DataTypes.INTEGER,
          allowNull: false
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },

    }, {tableName: 'Rating'});


    return Rating;
  };
