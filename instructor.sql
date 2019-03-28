 
USE instructor;

--
-- Table structure for table `instructors`
--


CREATE TABLE IF NOT EXISTS `instructors` (
  `instructorNumber` int(11) NOT NULL AUTO_INCREMENT,
  `instructorName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) DEFAULT NULL,
  `postalCode` varchar(15) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  PRIMARY KEY (`instructorNumber`)
);

--
-- Dumping data for table `instructors`
--

INSERT INTO `instructors` (`instructorNumber`, `instructorName`, `email`, `city`, `state`, `postalCode`, `country`) VALUES
(103, 'DemoUser1', 'duser1@workstation.example.com', 'Raleigh','NC', '27601', 'United States'),
(112, 'InstructorUser1', 'iuser1@workstation.example.com', 'Rio de Janeiro', 'RJ', '22021-000', 'Brasil'),
(114, 'InstructorUser2', 'iuser2@workstation.example.com', 'Raleigh', 'NC', '27605', 'United States'),
(123, 'InstructorUser3', 'iuser3@workstation.example.com', 'Sao Paulo', 'SP', '01310-000', 'Brasil')
