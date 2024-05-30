import axios from "axios";

const FETCH_COOKIES = "http://127.0.0.1:3000/api/cookies";
const FETCH_API = "http://127.0.0.1:3000/api";

async function getCookies() {
  const cookies = Cookies.get("last10");
  // console.log(cookies);
  const json = JSON.parse(cookies);
  // console.log(json);
  // setLast10(json);

  // console.log(`getCookies ${json.length}`);
  const { data } = await axios.post(
    FETCH_COOKIES,
    {
      cookies: json,
    },
    {
      headers: {
        "Content-Type": "application/json",

        Accept: "*/*",
      },
    }
  );

  setLast10(data);
}

async function getTransits() {
  // console.log("getTransits");
  // Date.now();
  // const d = new Date();
  // const julianDay = Date.now() / 86400 + 2440587.5;

  const d = new Date();

  // const timestamp = d.getTime() / 1000;
  // console.log("timestamp", timestamp);

  // const { data: offset_data } = await axios.get(
  //   `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${GOOGLE_MAPS_API_KEY}`
  // );
  const offset = Math.abs(d.getTimezoneOffset() * 60);

  // setDateTime(jDtoGreg(julianDay));
  // console.log(`offset ${offset}`);

  setDateTime(d);
  setPlace({
    name: "",
    latitude: 0,
    longitude: 0,
  });
  setTimeZone({
    dstOffset: 0,
    rawOffset: 0,
    status: "",
    timeZoneId: "",
    timeZoneName: "",
  });

  setNameValue("Transits");
  setSelectedRadioButt("personality");
  setUTC("local");

  // console.log(`dateTime.getFullYear() ${dateTime.getFullYear()}`);
  // console.log(`dateTime.getMonth() ${dateTime.getMonth()}`);
  // console.log(`dateTime.getDate() ${dateTime.getDate()}`);
  // console.log(`dateTime.getHours() ${dateTime.getHours()}`);
  // console.log(`dateTime.getMinutes() ${dateTime.getMinutes()}`);

  const { data } = await axios.post(
    FETCH_API,
    {
      year: dateTime.getFullYear(),
      month: dateTime.getMonth() + 1,
      day: dateTime.getDate(),
      hours: dateTime.getHours(),
      minutes: dateTime.getMinutes(),
      typeOfTime: 1,
      offset: offset,
      place: "",
      latitude: 0,
      longitude: 0,
      name: nameValue,
    },
    {
      headers: {
        "Content-Type": "application/json",

        Accept: "*/*",
      },
    }
  );
  // console.log("data");
  // console.log(data);
  setData(data);
  // console.log("initial data");
  // console.log(cd_data);
}

async function onSubmit(values) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.

  // console.log(nameValue);
  // console.log(dateTime);
  // console.log(place);
  // console.log(timeZone);
  // console.log(selectedRadioTimeType);
  if (utc === "utc") {
    setTimeZone(null);
    setPlace(null);
    // console.log(place);
    // console.log(timeZone);
  }

  onRadioButtValueChange("bodygraph");

  const { data } = await axios.post(
    FETCH_API,
    {
      year: dateTime.getFullYear(),
      month: dateTime.getMonth() + 1,
      day: dateTime.getDate(),
      hours: dateTime.getHours(),
      minutes: dateTime.getMinutes(),
      typeOfTime: utc === "utc" ? 0 : 1,
      offset: utc === "utc" ? 0 : timeZone?.rawOffset + timeZone?.dstOffset,
      place: utc === "utc" ? "" : place.name,
      latitude: utc === "utc" ? 0 : place.latitude,
      longitude: utc === "utc" ? 0 : place.longitude,
      name: nameValue,
    },
    {
      headers: {
        "Content-Type": "application/json",

        Accept: "*/*",
      },
    }
  );

  setData(data);

  if (data.name != "Transits") {
    if (last10.length < 10) {
      last10.push(data);
      setLast10(last10);
    } else {
      last10.shift();
      last10.push(data);

      setLast10(last10);
    }

    const json = [];
    for (let i = 0; i < last10.length; i++) {
      const jsonIndex = {
        name: last10[i].name,
        time: last10[i].time.pers_time_utc,
      };
      json.push(jsonIndex);
      // console.log(json);
    }

    // console.log(json.length);

    // item.name === value.name &&
    // item.time.pers_time_utc === value.time.pers_time_utc
    Cookies.set("last10", JSON.stringify(json));
  }
}
