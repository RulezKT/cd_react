for server query

{
"year": 1978,
"month": 5,
"day": 17,
"hour": 15,
"minutes": 47,
"typeOfTime": 1,  
"offset": 0,
"place": "Spb",
"latitude": 0,
"longitude": 0,
"name": ""
}

ReqData format :

{
year: number;
month: number;
day: number;
hours: number;
minutes: number;
typeOfTime: TypeOfTime; // 1 - local time, 0- UTC Time
offset: number; // offset in seconds to get UTC
place: string;
latitude: number;
longitude: number;
name: string;
}
