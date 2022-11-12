module.exports = (sequelize, DataTypes) => {
    const Ins_Policy = sequelize.define("InsurancePolicy", {  
      id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }, 

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      cover_amt: {
        type: DataTypes.FLOAT,
      }, 
      premium_per_month: {
        type: DataTypes.FLOAT,
      }, 
      premium_per_annum: {
        type: DataTypes.FLOAT,
      }, 
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      
      
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
      
    }, {tableName: 'InsurancePolicy'});
    
    Ins_Policy.associate = (models) => {
      Ins_Policy.belongsTo(models.Company, {foreignKey: 'company_id'});
      Ins_Policy.belongsTo(models.PolicyType, {foreignKey: 'type'})
      Ins_Policy.belongsTo(models.Rating, {foreignKey: 'policy_id'})  
    };
    
    return Ins_Policy;
  };

