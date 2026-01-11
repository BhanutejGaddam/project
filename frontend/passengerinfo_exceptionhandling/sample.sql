create function Find_passenger_detail 
(
   @passid varchar(50)
)
returns varchar(60)
as 
begin
   declare @result varchar(60);
   if exists (
      select 1
    --   select @result = p.Pass_Name + ' booked the flight for ' + convert(varchar,b.Booking_date,23)
      from Passengers p 
      join Booking_Details bd on p.Pass_id = bd.Pass_id
      join Booking b on bd.Booking_id = b.Booking_id
      where p.Pass_id = @passid
      )
      begin 
         select @result = p.Pass_Name + ' booked the flight for ' + convert(varchar,b.Booking_date,23)
          from Passengers p 
          join Booking_Details bd on p.Pass_id = bd.Pass_id
          join Booking b on bd.Booking_id = b.Booking_id
          where p.Pass_id = @passid;
      end
      else 
      begin 
           set @result = 'There are no passengers available';
      end 
    
    return @result;
end;
go 