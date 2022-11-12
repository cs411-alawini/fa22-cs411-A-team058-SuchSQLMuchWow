module.exports = (sequelize, DataTypes) => {
    const Employs = sequelize.define("Employ", {  
      user_id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
      },

      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }, 

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, {tableName: 'Employs'});

    Employs.associate = (model) => {
        Employs.hasOne(model.User, {foreignKey: 'user_id'})
        Employs.hasMany(model.Company, {foreignKey: 'company_id'})
    }

    return Employs;
  };
