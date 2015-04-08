
CREATE TABLE resource(
  id integer primary key autoincrement not null,
  number char(15) unique not null,
  count int default 0,
  paidprice real default 0.0,
  retailprice real default 0.0,
  saleprice real default 0.0,
  description text
)

CREATE TABLE eventtype(
  id integer primary key not null,
  name char(15)
)


SELECT datetime('now');

select strftime('%Y-%m-%dT%H:%M:%f', 'now')

CREATE TABLE eventlog(
    resourceid integer,
    eventtypeid integer,
    datetime char(20),
    userid char(15) not null,
    FOREIGN KEY(eventtypeid) REFERENCES eventtype(id),
    FOREIGN KEY(resourceid) REFERENCES resource(id)
)

insert into eventtype(id, name) values ( 1, 'sale');
insert into eventlog(resourceid, eventtypeid, datetime, userid) values(1,1, strftime('%Y-%m-%dT%H:%M:%f', 'now'), 'userid')


insert into resource (number, count, paidprice, retailprice, saleprice, description)
values('4000R',4,10,15,20,'description...')

insert into resource (number, count, paidprice, retailprice, saleprice, description)
values('4001R',2,10,15,20,'description...')

insert into resource (number, count, paidprice, retailprice, saleprice, description)
values('4002R',5,10,15,20,'description...')

insert into resource (number, count, paidprice, retailprice, saleprice, description)
values('4000N',2,10,15,20,'description...')

insert into resource (number, count, paidprice, retailprice, saleprice, description)
values('4000F',1,10,15,20,'description...')

insert into resource (number, count, paidprice, retailprice, saleprice, description)
values('8554A',0,10,15,20,'description...')



select * from resource
select * from eventlog order by datetime;
select * from eventtype

drop table resource
drop table eventlog
drop table eventtype