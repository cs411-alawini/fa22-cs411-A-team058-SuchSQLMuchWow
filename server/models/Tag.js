module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define("Tag", {  
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

    Tag.associate = (models) => {
        Tag.belongsToMany(models.InsurancePolicy, {through: models.PolicyTag})  
      };

    return Tag;
  };
