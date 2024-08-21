# social-media-app
 
### Instructions:

1. Start a MySQL server, for this project i used an instance with:
username: root
password: root
port: 3306
db: social_media

If the DB doesn't automatically create when running migration command in backend dir:
```
npx sequelize-cli db:create
```

2. Run the migrations in backend dir
```
npx sequelize-cli db:migrate
```

3. Run seeders in backend dir
```
npx sequelize-cli db:seed:all
```

4. Run dev project in root dir
```
npm run dev
```

### Other commands:

- Undo migrations
```
npx sequelize-cli db:migrate:undo:all
```

- Undo seeders
```
npx sequelize-cli db:seed:undo:all
```