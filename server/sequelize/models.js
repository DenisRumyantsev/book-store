// MODELS

const sequelize = require('./establish');
const { DataTypes } = require('sequelize');

const { UUID: uuidType, STRING: strType, INTEGER: intType, DECIMAL: decType, ENUM: enumType, DATE: dateType } = DataTypes;

const User = sequelize.define('users', {
    id: { type: uuidType, allowNull: false, unique: true, primaryKey: true },
    lastName: { type: strType, allowNull: false },
    firstName: { type: strType, allowNull: false },
    middleName: { type: strType },
    phoneNumber: { type: strType },
    emailAddress: { type: strType },
    streetAddress: { type: strType },
    createdAt: { type: dateType, allowNull: false, defaultValue: Date() },
    updatedAt: { type: dateType }
}, { timestamps: false });

const Author = sequelize.define('authors', {
    id: { type: uuidType, allowNull: false, unique: true, primaryKey: true },
    firstName: { type: strType, allowNull: false },
    lastName: { type: strType, allowNull: false },
    biography: { type: strType(5000), allowNull: false },
    createdAt: { type: dateType, allowNull: false, defaultValue: Date() },
    updatedAt: { type: dateType }
}, { timestamps: false });

const Category = sequelize.define('categories', {
    id: { type: uuidType, allowNull: false, unique: true, primaryKey: true },
    title: { type: strType, allowNull: false },
    description: { type: strType(5000), allowNull: false }
}, { timestamps: false });

const Book = sequelize.define('books', {
    isbn: { type: strType, allowNull: false, unique: true, primaryKey: true },
    title: { type: strType, allowNull: false },
    year: { type: intType, allowNull: false },
    price: { type: decType, allowNull: false },
    count: { type: intType, allowNull: false },
    star: { type: decType },
    reviewsCount: { type: intType, allowNull: false, defaultValue: 0 },
    annotation: { type: strType(5000), allowNull: false },
    createdAt: { type: dateType, allowNull: false, defaultValue: Date() },
    updatedAt: { type: dateType }
}, { timestamps: false });

const Review = sequelize.define('reviews', {
    id: { type: uuidType, allowNull: false, unique: true, primaryKey: true },
    star: { type: decType, allowNull: false },
    content: { type: strType(5000) },
    createdAt: { type: dateType, allowNull: false, defaultValue: Date() },
    updatedAt: { type: dateType }
}, { timestamps: false });

const UserOrder = sequelize.define('userOrders', {
    id: { type: uuidType, allowNull: false, unique: true, primaryKey: true },
    status: { type: enumType('cart', 'fulfil', 'history'), allowNull: false },
    totalPrice: { type: decType, allowNull: false },
    delivAddress: { type: strType, allowNull: false },
    createdAt: { type: dateType, allowNull: false, defaultValue: Date() },
    updatedAt: { type: dateType }
}, { timestamps: false });

const BookOrder = sequelize.define('bookOrders', {
    id: { type: uuidType, allowNull: false, unique: true, primaryKey: true },
    price: { type: decType, allowNull: false },
    count: { type: intType, allowNull: false },
    createdAt: { type: dateType, allowNull: false, defaultValue: Date() },
    updatedAt: { type: dateType }
}, { timestamps: false });

Author.hasMany(Book);
Book.belongsTo(Author);

Category.hasMany(Book);
Book.belongsTo(Category);

User.hasMany(Review);
Review.belongsTo(User);

Book.hasMany(Review);
Review.belongsTo(Book);

User.hasMany(UserOrder);
UserOrder.belongsTo(User);

Book.hasMany(BookOrder);
BookOrder.belongsTo(Book);

UserOrder.hasMany(BookOrder);
BookOrder.belongsTo(UserOrder);

if (sequelize.config.database === ':memory') {
    const syncDatabase = async () => {
        await sequelize.sync({ force: true });
    };
    syncDatabase();
}

module.exports = sequelize;
