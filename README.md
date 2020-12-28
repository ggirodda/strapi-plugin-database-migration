# Strapi plugin database-migration

This strapi plugin allow to execute database migrations, using [node-migrate](https://github.com/tj/node-migrate#usage), just replace `migrate` by `strapi-migrate`

If you want to store migrations in database, you can define --store option, and use the `lib/strapi-database-store` in the package. Example:

```javascript
//package.json
// ...
"scripts": {
    // ...
    "strapi-migrate-down": "strapi-migrate-down --store strapi-plugin-database-migration/lib/strapi-database-store",
    "strapi-migrate-list": "strapi-migrate-list --store strapi-plugin-database-migration/lib/strapi-database-store",
    "strapi-migrate-up": "strapi-migrate-up --store strapi-plugin-database-migration/lib/strapi-database-store"
}
// ...
```

