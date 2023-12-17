var DataTypes = require("sequelize").DataTypes;
var _bike = require("./bike");
var _booking = require("./booking");
var _charger = require("./charger");
var _city = require("./city");
var _invoice = require("./invoice");
var _parked_bikes = require("./parked_bikes");
var _parking = require("./parking");
var _price = require("./price");
var _simulate = require("./simulate");
var _user = require("./user");

function initModels(sequelize) {
  var bike = _bike(sequelize, DataTypes);
  var booking = _booking(sequelize, DataTypes);
  var charger = _charger(sequelize, DataTypes);
  var city = _city(sequelize, DataTypes);
  var invoice = _invoice(sequelize, DataTypes);
  var parked_bikes = _parked_bikes(sequelize, DataTypes);
  var parking = _parking(sequelize, DataTypes);
  var price = _price(sequelize, DataTypes);
  var simulate = _simulate(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  booking.belongsTo(bike, { as: "bike", foreignKey: "bike_id"});
  bike.hasMany(booking, { as: "bookings", foreignKey: "bike_id"});
  parked_bikes.belongsTo(bike, { as: "bike", foreignKey: "bike_id"});
  bike.hasMany(parked_bikes, { as: "parked_bikes", foreignKey: "bike_id"});
  invoice.belongsTo(booking, { as: "log", foreignKey: "log_id"});
  booking.hasMany(invoice, { as: "invoices", foreignKey: "log_id"});
  bike.belongsTo(city, { as: "city", foreignKey: "city_id"});
  city.hasMany(bike, { as: "bikes", foreignKey: "city_id"});
  parking.belongsTo(city, { as: "city", foreignKey: "city_id"});
  city.hasMany(parking, { as: "parkings", foreignKey: "city_id"});
  simulate.belongsTo(city, { as: "city", foreignKey: "city_id"});
  city.hasMany(simulate, { as: "simulates", foreignKey: "city_id"});
  parked_bikes.belongsTo(parking, { as: "park", foreignKey: "park_id"});
  parking.hasMany(parked_bikes, { as: "parked_bikes", foreignKey: "park_id"});
  booking.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(booking, { as: "bookings", foreignKey: "user_id"});
  invoice.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(invoice, { as: "invoices", foreignKey: "user_id"});

  return {
    bike,
    booking,
    charger,
    city,
    invoice,
    parked_bikes,
    parking,
    price,
    simulate,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
