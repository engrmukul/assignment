module.exports = (sequelize, Sequelize) => {
  const Property = sequelize.define("property", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return Property;
};
