
CREATE TABLE resource(
  id integer primary key autoincrement not null,
  number char(15) unique not null,
  count int default 0,
  paidprice real default 0.0,
  retailprice real default 0.0,
  saleprice real default 0.0
)

insert into resource (number, count, paidprice, retailprice, saleprice)
values('4000R',0,10,15,20)

select * from resource

drop table resource