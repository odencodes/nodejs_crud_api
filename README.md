# nodejs_crud_api
This is a sample of api using NodeJS for CRUD with MySQL using SwiftUI.
https://youtu.be/vw9xY18gpuE

1. You have to create mysql database's name "nodejs_api" using phpMyadmin.
```
CREATE TABLE posts (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    post VARCHAR(100) NOT NULL,
    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=INNODB DEFAULT CHARSET=utf8;
```

2. You can run a server using nodemon command below.
```
npm run dev
```

If you want to change it. 
please access package.json file > "scripts" > "dev"
