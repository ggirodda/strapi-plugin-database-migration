function getModel() {
  return strapi.query('migration', 'database-migration').model;
}

function StrapiDatabaseStore() {}

/**
 * Save the migration data.
 *
 * @api public
 */

StrapiDatabaseStore.prototype.save = function (set, fn) {
  getModel()
    .collection()
    .fetchOne()
    .then(async (result) => {
      try {
        const store = {
          lastRun: set.lastRun,
          migrations: set.migrations,
        };
        let model;
        if (result) {
          model = result.set('store', store);
        } else {
          model = getModel().forge({ store });
        }
        await model.save();
        fn();
      } catch (err) {
        fn(err);
      }
    })
    .catch((err) => fn(err));
};

/**
 * Load the migration data and call `fn(err, obj)`.
 *
 * @param {Function} fn
 * @return {Type}
 * @api public
 */

StrapiDatabaseStore.prototype.load = function (fn) {
  console.log("loaded")
  getModel()
    .collection()
    .fetchOne()
    .then((result) => {
      try {
        if (!result) {
          return fn(null, {});
        }
        const store = result.get('store');

        if (
          !store.hasOwnProperty('lastRun') ||
          !store.hasOwnProperty('migrations')
        ) {
          return fn(new Error('Invalid store data'));
        }
        return fn(null, store);
      } catch (err) {
        fn(err);
      }
    })
    .catch(fn);
};

module.exports = StrapiDatabaseStore;
