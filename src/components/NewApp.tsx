import { useState } from "react";
import axios from "axios";

import { Button, DatePicker } from "antd";

import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { Checkbox } from "antd";

import { TimePicker } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";

import Autocomplete from "react-google-autocomplete";
import { CheckboxChangeEvent } from "antd/es/checkbox/Checkbox";

import Cookies from "js-cookie";

import { cdInf } from "./cdInf";

type TimeZone = {
  dstOffset: number;
  rawOffset: number; // seconds
  status: "";
  timeZoneId: "";
  timeZoneName: "";
};

type Place = {
  name: string;
  latitude: number;
  longitude: number;
};

const items = [
  {
    key: "1",
    label: "Option 1",
  },
  {
    key: "2",
    label: "Option 2",
  },
  {
    key: "3",
    label: "Option 3",
  },
];

export function NewApp() {
  const timeFormat = "HH:mm";
  const GOOGLE_MAPS_API_KEY = "AIzaSyBaHb8Qz3QFglWkTHH3Bisf1geUNdxPKys";

  const [cd_data, setData] = useState(cdInf);
  const [utc, setUTC] = useState("local");
  const [dateTime, setDateTime] = useState<Dayjs>(dayjs());
  //   const [time, setTime] = useState<Dayjs>(dateTime);
  //   const [date, setDate] = useState<Dayjs>(dateTime);
  const [place, setPlace] = useState<Place>({
    name: "",
    latitude: 0,
    longitude: 0,
  });

  const [timeZone, setTimeZone] = useState<TimeZone>({
    dstOffset: 0,
    rawOffset: 0,
    status: "",
    timeZoneId: "",
    timeZoneName: "",
  });
  const [nameValue, setNameValue] = useState("Transits");

  function onUtcChange(e: CheckboxChangeEvent) {
    if (e.target.checked) {
      setUTC("utc");
    } else {
      setUTC("local");
    }
    // console.log(`checked = ${e.target.checked}`);
  }

  const onDateChange = (date: Dayjs) => {
    // console.log(date);
    // console.log(date.toDate());
    const tempDate = date
      .year(date.year())
      .month(date.month())
      .date(date.date())
      .hour(dateTime.hour())
      .minute(dateTime.minute())
      .second(0)
      .millisecond(0);

    setDateTime(tempDate);

    // setDate(date);

    console.log(tempDate);
  };

  const onTimeChange = (time: Dayjs) => {
    const tempTime = time
      .year(dateTime.year())
      .month(dateTime.month())
      .date(dateTime.date())
      .hour(time.hour())
      .minute(time.minute())
      .second(0)
      .millisecond(0);

    setDateTime(tempTime);

    // setTime(time);

    console.log(tempTime);
  };

  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log("values", values);
    // console.log(nameValue);
    // console.log(dateTime);
    // console.log(place);
    // console.log(timeZone);
    // console.log(selectedRadioTimeType);

    // onRadioButtValueChange("bodygraph");

    const { data } = await axios.post(
      "http://127.0.0.1:3000/api",
      {
        year: dateTime.year(),
        month: dateTime.month() + 1,
        day: dateTime.date(),
        hours: dateTime.hour(),
        minutes: dateTime.minute(),
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

  return (
    <div className="flex flex-row justify-center items-center space-x-2">
      <Input
        className="w-28"
        placeholder="Nickname"
        prefix={<UserOutlined />}
        onChange={(e) => setNameValue(e.target.value)}
        value={nameValue}
      />

      <DatePicker
        required={true}
        className="w-32"
        value={dateTime}
        onChange={onDateChange}
        placeholder="select date"
      />

      <TimePicker
        required={true}
        className="w-20"
        value={dateTime}
        onChange={onTimeChange}
        format={timeFormat}
      />

      <Checkbox onChange={onUtcChange}>UTC</Checkbox>

      <Autocomplete
        className=" w-34 h-8 rounded"
        required={utc === "local" ? true : false}
        disabled={utc === "utc" ? true : false}
        apiKey={GOOGLE_MAPS_API_KEY}
        onPlaceSelected={(place) => {
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode(
            { address: place.formatted_address },
            async function (results, status) {
              if (status == "OK") {
                // console.log("📍 Coordinates: ", results);
                // console.log(
                //   "📍 Coordinates: ",
                //   results[0].geometry.location.lat()
                // );
                // console.log(
                //   "📍 Coordinates: ",
                //   results[0].geometry.location.lng()
                // );

                const lat = results[0].geometry.location.lat();
                const lng = results[0].geometry.location.lng();

                setPlace({
                  name: place.formatted_address,
                  latitude: lat,
                  longitude: lng,
                });

                // console.log(time.hour());
                // console.log(time.minute());
                const timestamp = dateTime.unix();
                // console.log("timestamp", timestamp);

                const { data } = await axios.get(
                  `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${GOOGLE_MAPS_API_KEY}`
                );

                setTimeZone(data);
                // console.log(data);
              } else {
                console.log(
                  "Geocode was not successful for the following reason: " +
                    status
                );
              }
            }
          );
          // console.log(place);
        }}
      />

      <Button type="primary" htmlType="submit" onClick={onSubmit}>
        Calculate
      </Button>

      <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
        <Button>
          Last 10 <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}
