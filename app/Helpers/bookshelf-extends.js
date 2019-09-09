/****************************************************
# bookshelf-extends            
# Page/Class name : bookshelf-extends
# Author : Dilip Kumar Shaw
# Created Date : 11/07/2019
# Functionality : appendTimestamps, createOrUpdate, createOrUpdateWallet, createOrDelete, batchInsert, _createOrUpdate, whereExistIn, getAverageCount
# Purpose : For extends the bookshelf class and add some custom funcation.
*****************************************************/
//==================================================================

module.exports = function (Bookshelf) {

    Bookshelf.Model = Bookshelf.Model.extend({

        appendTimestamps: function (data) {
            var data = _.isArray(data) ? data : [data];
            let timeStampsFields = ['created_at', 'updated_at'];
            let hasTimestamp = false;
            let todayDate = new Date();

            if (_.isBoolean(this.hasTimestamps) && this.hasTimestamps == true) {
                hasTimestamp = true;
            }
            if (_.isArray(this.hasTimestamps)) {
                hasTimestamp = true;
                let timeStampsFields = this.hasTimestamps;
            }

            if (hasTimestamp) {
                var data = _.map(data, function (element) {
                    return _.extend({}, element, {
                        created_at: todayDate.format('mysql'),
                        updated_at: todayDate.format('mysql'),
                    });
                });
            }

            return data;
        },

        createOrUpdate: async function (data, columns) {

            let table = this.tableName;
            let rawData = this.appendTimestamps(data);
            let updateColumn = _.isArray(columns) ? columns : [columns];
            let columnAr = _.keys(_.head(rawData));
            let valueStringAr = [];
            let updateColStringAr = [];

            _.each(rawData, (v) => {

                let string = '';

                _.each(_.values(v), (v) => {
                    string += _.isString(v) ? `'${v}',` : v + ','
                })

                valueStringAr.push(`(${_.rTrim(string, ',')})`);
            });

            _.each(updateColumn, (v) => {
                if (_.indexOf(columnAr, v) >= 0) {
                    updateColStringAr.push(`${v}=VALUES(${v})`);
                }
            })

            let columnString = _.join(columnAr, ',');
            let valueString = _.join(valueStringAr, ',');
            let updateColString = _.join(updateColStringAr, ',');


            let sqlString = `INSERT INTO ${table} (${columnString}) VALUES ${valueString} ON DUPLICATE KEY UPDATE ${updateColString}`;
            return Bookshelf.knex.raw(sqlString);
        },

        createOrUpdateWallet: async function (data, columns) {

            let table = this.tableName;
            let rawData = this.appendTimestamps(data);
            let updateColumn = _.isArray(columns) ? columns : [columns];
            let columnAr = _.keys(_.head(rawData));
            let valueStringAr = [];
            let updateColStringAr = [];

            _.each(rawData, (v) => {

                let string = '';

                _.each(_.values(v), (v) => {
                    string += _.isString(v) ? `'${v}',` : v + ','
                })

                valueStringAr.push(`(${_.rTrim(string, ',')})`);
            });

            _.each(updateColumn, (v) => {
                updateColStringAr.push(`${v}=VALUES(${v})`);
            })

            let columnString = _.join(columnAr, ',');
            let valueString = _.join(valueStringAr, ',');
            let updateColString = _.join(updateColStringAr, ',');


            let sqlString = `INSERT INTO ${table} (${columnString}) VALUES ${valueString} ON DUPLICATE KEY UPDATE ${updateColString}`;
            return Bookshelf.knex.raw(sqlString);

        },

        createOrDelete: async function (cond, data, chunkSize) {

            let hasRows = false;
            let table = this.tableName;
            let primaryKey = this.idAttribute;
            let rawData = this.appendTimestamps(data);

            rawData = _.map(rawData, function (o) { return _.omit(o, primaryKey); });

            await this.where(cond).count('id').then((count) => {
                if (count > 0) {
                    hasRows = true;
                }
            });

            if (hasRows == true) {
                await this.where(cond).destroy();
            }

            return Bookshelf.knex.batchInsert(table, rawData, (chunkSize || 1000)).returning('*');
        },

        batchInsert: async function (data, chunkSize) {

            let rawData = this.appendTimestamps(data);
            let table = this.tableName;

            return Bookshelf.knex.batchInsert(table, rawData, (chunkSize || 1000)).returning('*');
        },

        _createOrUpdate: async function (data, update_cols) {

            update_cols = _.isArray(update_cols) ? update_cols : [update_cols];

            let buildQuery = Bookshelf.knex(this.tableName).insert(data).toString();
            buildQuery += ' on duplicate key update ';
            buildQuery += _.join(_.map(update_cols, (v) => {
                return `${v} = value(${v})`;
            }), ',');

            return Bookshelf.knex.raw(buildQuery);
        },

        whereExistIn: function (relation, conditions) {

            let Model = this.getRelation(relation).toModel();

            if (!Model) {
                throw new Error('Relation belongsToMany does not exist on this model')
            }

            let relationData = Model.relatedData;

            if (relationData.type !== 'belongsToMany') {
                return this;
            }

            let targetTableName = relationData.key('targetTableName');
            let targetIdAttribute = relationData.key('targetIdAttribute');
            let joinTableName = relationData.key('joinTableName');
            let foreignKey = relationData.key('foreignKey');
            let otherKey = relationData.key('otherKey');
            let foreignKeyTarget = relationData.key('foreignKeyTarget');
            let otherKeyTarget = relationData.key('otherKeyTarget');
            let parentId = relationData.key('parentId');
            let parentTableName = relationData.key('parentTableName');
            let parentIdAttribute = relationData.key('parentIdAttribute');


            return this.whereExists(function () {
                let that = this;
                that.from(targetTableName);
                that.innerJoin(joinTableName, `${targetTableName}.${targetIdAttribute}`, `${joinTableName}.${otherKey}`);
                that.whereRaw(`${parentTableName}.${parentIdAttribute} = ${joinTableName}.${foreignKey}`);
                if (_.isObject(conditions)) {
                    _.forOwn(conditions, (value, column) => {
                        if (_.isArray(value)) { that.whereIn(column, value) }
                        if (_.isString(value)) { that.where(column, value) }
                        if (_.isInteger(value)) { that.where(column, value) }
                    })
                }
            });
        },

        getAverageCount: function (cond, data, column) {
            let table = this.tableName;

            let updStrVal = [];

            _.each(data, (value, key) => {
                if (_.indexOf(cond, key) > -1) {
                    let v = `'` + value + `'`;
                    return updStrVal.push(`${key} = ${v}`);
                }
            });
            let qbString = _.join(updStrVal, ' and ');

            let sqlString = `SELECT AVG(${column}) as ${column} FROM ${table} where ${qbString}`;

            return Bookshelf.knex.raw(sqlString)
        }
    });
};

//==================================================================