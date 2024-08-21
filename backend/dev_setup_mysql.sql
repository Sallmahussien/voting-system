-- Create VotingSystem db
CREATE DATABASE IF NOT EXISTS `VotingSystem`;

CREATE USER IF NOT EXISTS 'VS'@'localhost' IDENTIFIED BY 'VS_pwd';

GRANT ALL PRIVILEGES ON `VotingSystem`.* TO 'VS'@'localhost';
GRANT CREATE, ALTER, DROP, REFERENCES ON *.* TO 'VS'@'localhost';

GRANT SELECT ON `performance_schema`.* TO 'VS'@'localhost';

FLUSH PRIVILEGES;