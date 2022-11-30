module.exports = (sequelize, DataTypes) => {
    const PolicyTag = sequelize.define("PolicyTag", {  
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },

    }, {tableName: 'PolicyTag', timestamps: true});

    return PolicyTag;
  };
