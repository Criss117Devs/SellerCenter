/*
DROP TABLE table-name
*/

CREATE DATABASE sellercenter;
USE sellercenter;
CREATE TABLE users (
    id INT  AUTO_INCREMENT PRIMARY KEY,
    key_value_string VARCHAR(100) NOT NULL,
    c_firstName VARCHAR(100) NOT NULL,
    c_lastName VARCHAR(100) NOT NULL,
    c_password VARCHAR(100) NOT NULL,
    c_status VARCHAR(20) NOT NULL
);
