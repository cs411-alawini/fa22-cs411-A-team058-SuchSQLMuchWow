module.exports = (sequelize, DataTypes) => {
    const PolicyType = sequelize.define("PolicyType", {  
      id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      type: {
          type: DataTypes.STRING,
          allowNull: false
      },
      
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, {tableName: 'PolicyType'});

    PolicyType.associate = (models) => {

        PolicyType.hasMany(models.InsurancePolicy, {foreignKey: 'type'})

    }
    
    return PolicyType;
  };

