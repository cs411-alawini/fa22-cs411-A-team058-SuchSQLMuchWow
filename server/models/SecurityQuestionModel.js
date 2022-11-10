module.exports = (sequelize, DataTypes) => {
    const SecurityQuestion = sequelize.define("SecurityQuestion", {  
      id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      question: {
          type: DataTypes.STRING,
          allowNull: false
      },
      
      
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, {tableName: 'SecurityQuestion'});

    SecurityQuestion.associate = (models) => {

        SecurityQuestion.hasMany(models.User, {foreignKey: 'security_question'})

    }
    
    return SecurityQuestion;
  };

