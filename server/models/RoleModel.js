module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("Role", {  
      id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      role: {
          type: DataTypes.STRING,
          allowNull: false
      },
      
      
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, {tableName: 'Role'});

    Role.associate = (models) => {

        Role.hasMany(models.User, {foreignKey: 'user_type'})

    }
    
    return Role;
  };

