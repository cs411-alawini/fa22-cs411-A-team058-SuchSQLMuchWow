module.exports = (sequelize, DataTypes) => {
    const Tags = sequelize.define("Tag", {  
      id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 

      description: {
        type: DataTypes.STRING
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, {tableName: 'Tag', timestamps: false});

    return Tags;
  };
