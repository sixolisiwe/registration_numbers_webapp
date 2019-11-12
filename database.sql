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

insert into towns (names, Tag) values('Cape Town', 'CA');
insert into towns (names, Tag) values('Belville', 'CJ');
insert into towns (names, Tag) values('Malmesbury', 'CY');