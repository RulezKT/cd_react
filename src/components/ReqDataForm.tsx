import { useEffect, useState } from "react";
import axios from "axios";

import { Button, DatePicker } from "antd";

// import { Dropdown, MenuProps } from "antd";
// import { DownOutlined } from "@ant-design/icons";

import { Checkbox } from "antd";

import { TimePicker } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";

import Autocomplete from "react-google-autocomplete";
import { CheckboxChangeEvent } from "antd/es/checkbox/Checkbox";

import Cookies from "js-cookie";

import { UseCdInfo, useCdInfo } from "./cdInfo";
import { UseTypeOfChart, useTypeOfChart } from "./typeOfChart";
import { UseCalcType, useCalcType } from "./calcType";

import { ReqData } from "@/lib/cd_consts";
import { fetchData } from "./FetchData";
import { CDinfo } from "@/lib/cd_consts";

import { Select } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";



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

export function ReqDataForm() {

  const { register, handleSubmit, formState } = useForm<IForm>({
    mode: "onChange",
  });

  const timeFormat = "HH:mm";
  const GOOGLE_MAPS_API_KEY = "AIzaSyBaHb8Qz3QFglWkTHH3Bisf1geUNdxPKys";

  const cdInfo: UseCdInfo = useCdInfo();
  const typeOfChart: UseTypeOfChart = useTypeOfChart();
  const calcType: UseCalcType = useCalcType();

  const [last10, setLast10] = useState<CDinfo[]>([]);
  const [utc, setUTC] = useState("local");
  const [dateTime, setDateTime] = useState<Dayjs>(dayjs());
  //   const [time, setTime] = useState<Dayjs>(dateTime);
  //   const [date, setDate] = useState<Dayjs>(dateTime);



  // But if you just want an answer for the maximum bounds for Google Maps:
  //   Latitude: -85 to + 85(actually - 85.05115 for some reason)
  //   Longitude: -180 to + 180
  const [place, setPlace] = useState<Place>({
    name: "",
    latitude: 90,
    longitude: 200,
  });

  const [timeZone, setTimeZone] = useState<TimeZone>({
    dstOffset: 0,
    rawOffset: 0,
    status: "",
    timeZoneId: "",
    timeZoneName: "",
  });
  const [nameValue, setNameValue] = useState("");

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

    // console.log(tempDate);
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

    // console.log(tempTime);
  };

  function setLast10andMenuItems(data: CDinfo[]) {
    setLast10(data);
    // console.log(data);

    // items = data.map((item, index) => ({
    //   key: index,
    //   label: `${item.name}  ${item.time.pers_time_utc.year}-${item.time.pers_time_utc.month}-${item.time.pers_time_utc.day} ${item.time.pers_time_utc.hours}:${item.time.pers_time_utc.minutes} UTC`,
    // }));

    // console.log(items);
  }

  useEffect(() => {
    getTransits();
    getCookies();
  }, []);

  async function getCookies() {
    // Cookies.remove("last10");
    const cookies = Cookies.get("last10");

    if (cookies === undefined || cookies.length === 0) {
      return;
    }

    // console.log(cookies);
    // const cookies_req = {"cookies": [cookies]}
    const json = JSON.parse(cookies);
    // console.log(json);

    // console.log(FETCH_COOKIES);
    const data: CDinfo[] = await fetchData(json, "cookies");

    setLast10andMenuItems(data);
    // console.log(last10);

  }

  async function getTransits() {
    const d = dayjs();
    const offset = Math.abs(dayjs().utcOffset() * 60);

    setDateTime(d);

    // setNameValue("Transits");
    typeOfChart.set("bodygraph");
    calcType.set("personality");

    setUTC("local");

    const reqData: ReqData = {
      name: "Transits",
      year: dateTime.year(),
      month: dateTime.month() + 1,
      day: dateTime.date(),
      hours: dateTime.hour(),
      minutes: dateTime.minute(),
      typeOfTime: 1,
      offset: offset,
      place: "",
      latitude: 0,
      longitude: 0,

    };

    const data = await fetchData(reqData);
    // console.log(data);
    cdInfo.set(data);
  }

  async function onSubmit() {

    if (utc === "local" && place.name === "" && place.latitude === 90 && place.longitude === 200) {

      return;
    }

    // console.log(last10)
    typeOfChart.set("bodygraph");
    calcType.set("full");

    // console.log("onSubmit");
    // console.log(nameValue);
    // console.log(dateTime);
    // console.log(utc);
    // console.log(place);
    // console.log(timeZone);
    // console.log(place.name);
    // console.log(place.latitude);
    // console.log(place.longitude);



    const reqData: ReqData = {
      name: nameValue,
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

    };

    const data = await fetchData(reqData);

    cdInfo.set(data);

    if (data.name != "Transits" && data.name != "") {
      if (last10.length < 10) {
        last10.push(data);
        setLast10andMenuItems(last10);
      } else {
        last10.shift();
        last10.push(data);

        setLast10andMenuItems(last10);
      }

      const json = [];
      for (let i = 0; i < last10.length; i++) {
        const jsonIndex = {
          name: last10[i].name,
          year: last10[i].time.pers_time_utc.year,
          month: last10[i].time.pers_time_utc.month,
          day: last10[i].time.pers_time_utc.day,
          hours: last10[i].time.pers_time_utc.hours,
          minutes: last10[i].time.pers_time_utc.minutes,
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

  // const onChange = (value: string) => {
  //   console.log(`selected ${value}`);
  // };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  function handleLast10Select(index: string) {
    // console.log("inside handleSelectChange");
    // console.log(index);
    typeOfChart.set("bodygraph");
    calcType.set("full");
    cdInfo.set(
      last10[parseInt(index)]
      // last10.find(
      //   (item) =>
      //     item.name === value.name &&
      //     item.time.pers_time_utc === value.time.pers_time_utc
      // )
    );
  }

  const onSubmit2: SubmitHandler<IForm> = (data) => { console.log(data); }
  const emailError = formState.errors.email?.message;

  interface IForm {
    name: string;
    email: string;
    message: string;
  }

  const dateFormat = 'YYYY-MM-DD HH:mm';

  return (
    <div className="flex flex-col">



      <form onSubmit={handleSubmit(onSubmit2)} className="w-full mt-16 px-5">
        <input type="text" placeholder="Name" {...register('name', { required: "this field is required", })} />
        <input type="email" placeholder="email" {...register('email', {
          required: "this field is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "invalid email address"
          }
        })} />
        {emailError && <p className="text-red-900">{emailError}</p>}
        <textarea name="message" placeholder="Message"></textarea>

        <DatePicker
          format={{
            format: dateFormat,
            type: 'mask',

          }}
          components={{

          }}
          showNow={false}
        // minDate={dayjs('2019-08-01 00:00', dateFormat)}
        // maxDate={dayjs('2020-10-31 00:00', dateFormat)}
        // onChange={onChange}
        />








        <button type="submit">Send</button>



      </form>






      <div className="flex flex-row justify-center items-center space-x-2">
        <Input
          autoFocus={true}
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
          maxDate={dayjs('2100-01-01')}
          minDate={dayjs('1900-01-01')}
          format={{
            format: 'YYYY-MM-DD',
            type: 'mask',
          }

          }

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
          placeholder="Birth Place"
          // value={place.name}
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

        <Select
          showSearch
          placeholder="Last 10"
          optionFilterProp="children"
          onChange={handleLast10Select}
          // onValueChange={handleLast10Select}
          onSearch={onSearch}
          // onSelect={handleLast10Select}
          filterOption={filterOption}
          placement="bottomLeft"
          dropdownStyle={{ width: "12rem" }}
          style={{ width: "6rem" }}
          options={last10 && last10.map((item, index) => ({
            label: `${item.name}  ${item.time.pers_time_utc.year}-${item.time.pers_time_utc.month}-${item.time.pers_time_utc.day} ${item.time.pers_time_utc.hours}:${item.time.pers_time_utc.minutes} UTC`,
            value: `${index}`,
          }))}
        />
      </div>
      <div className="flex flex-row w-full justify-center items-center h-auto text-gray-500 text-base font-extralight">
        <p>
          Choose your nickname, date and time. If you know your UTC time, check
          the box. Otherwise choose your birth place.
        </p>
      </div>
    </div>
  );
}
