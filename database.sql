create table towns(
	id serial not null primary key,
	names text not null,
	Tag text not null
    
);

create table reg_numbers (
	id serial not null primary key,
	town_id int,
    regNumber text,
	foreign key (town_id) references towns(id)
);