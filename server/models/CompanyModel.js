module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define("Company", {  
      id: {
        type:DataTypes.INTEGER,
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
      address: {
        type: DataTypes.STRING,
        allowNull: false
      }, 
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      }, 
      website: {
        type: DataTypes.STRING,
        allowNull: false
      }, 
      description: {
        type: DataTypes.STRING,
      },
      
      
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, {tableName: 'Company'});

    Company.associate = (models) => {

        Company.hasMany(models.InsurancePolicy, {foreignKey: 'company_id', onDelete: 'CASCADE', OnUpdate: "CASCADE"})
        Company.belongsTo(models.Employ, {foreignKey: 'company_id'})
    }
    
    return Company;
  };

