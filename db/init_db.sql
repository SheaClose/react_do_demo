create table if not exists todos (
    id serial primary key, 
    todo varchar(56)
  );

insert into todos (todo) values 
('create db'),
('display todos'),
('teach how to host stuff');

select * from todos;