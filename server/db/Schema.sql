
use `users`;

create table userDetails(
`name` varchar(100) not null,
`email` varchar(100) not null,
`password` varchar(200),
`resetPasswordToken` varchar(500),
`resetPasswordExpires` datetime,
primary key(`email`)
)