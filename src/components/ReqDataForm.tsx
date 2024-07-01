import { useEffect, useState } from "react";
import axios from "axios";

import { Button, DatePicker } from "antd";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox/Checkbox";
import { Input } from "antd";
import { Select } from "antd";

import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

import Autocomplete from "react-google-autocomplete";

import Cookies from "js-cookie";

import { UseCdInfo, useCdInfo } from "./cdInfo";
import { UseTypeOfChart, useTypeOfChart } from "./typeOfChart";
import { UseCalcType, useCalcType } from "./calcType";

import { ReqData } from "@/lib/cd_consts";
import { fetchData } from "./FetchData";
import { CDinfo } from "@/lib/cd_consts";
import { TypeOfChartRadio } from "./TypeOfChartRadio";



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

  const GOOGLE_MAPS_API_KEY = "AIzaSyBaHb8Qz3QFglWkTHH3Bisf1geUNdxPKys";

  const cdInfo: UseCdInfo = useCdInfo();
  const typeOfChart: UseTypeOfChart = useTypeOfChart();
  const calcType: UseCalcType = useCalcType();

  const [last10, setLast10] = useState<CDinfo[]>([]);
  const [utc, setUTC] = useState("local");
  const [dateTime, setDateTime] = useState<Dayjs>(dayjs());
  //   const [time, setTime] = useState<Dayjs>(dateTime);
  //   const [date, setDate] = useState<Dayjs>(dateTime);
  const [placeState, setPlaceState] = useState(false);

  const [visibState, setVisibState] = useState(false);

  const [hour, setHour] = useState<number>(10);
  const [minutes, setMinutes] = useState<number>(10);

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
      setPlaceState(true);
    } else {
      setUTC("local");
      if (place.name === "" || place.latitude === 90 || place.longitude === 200) {
        setPlaceState(false);
      }

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





  const onChangeHour = (e) => {

    // const time_arr = e.split(":");

    // const tempTime = dateTime
    //   .year(dateTime.year())
    //   .month(dateTime.month())
    //   .date(dateTime.date())
    //   .hour(time_arr[0] ? parseInt(time_arr[0]) : 0)
    //   .minute(time_arr[1] ? parseInt(time_arr[1]) : 0)
    //   .second(0)
    //   .millisecond(0);

    // setDateTime(tempTime);

    // setMyTime(e);

    // setTime(time);

    setHour(e.target.value);



    const tempTime = dateTime
      .year(dateTime.year())
      .month(dateTime.month())
      .date(dateTime.date())
      .hour(e.target.value)
      .minute(dateTime.minute())
      .second(0)
      .millisecond(0);

    setDateTime(tempTime);




    // setHour(parseInt(e.target.value));
    // console.log(e.target.value);
    // console.log(typeof e.target.value);
  };

  const onChangeMinutes = (e) => {

    // const time_arr = e.split(":");

    // const tempTime = dateTime
    //   .year(dateTime.year())
    //   .month(dateTime.month())
    //   .date(dateTime.date())
    //   .hour(time_arr[0] ? parseInt(time_arr[0]) : 0)
    //   .minute(time_arr[1] ? parseInt(time_arr[1]) : 0)
    //   .second(0)
    //   .millisecond(0);

    // setDateTime(tempTime);

    // setMyTime(e);

    // setTime(time);


    setMinutes(e.target.value);

    const tempTime = dateTime
      .year(dateTime.year())
      .month(dateTime.month())
      .date(dateTime.date())
      .hour(dateTime.hour())
      .minute(e.target.value)
      .second(0)
      .millisecond(0);

    setDateTime(tempTime);

    // setHour(parseInt(e.target.value));
    // console.log(e.target.value);
    // console.log(typeof e.target.value);
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
    setHour(d.hour());
    setMinutes(d.minute());

    // setNameValue("Transits");
    typeOfChart.set("bodygraph");
    calcType.set("personality");

    setUTC("local");
    setPlaceState(false);

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


    visibState ? setVisibState(false) : setVisibState(true);

    if (utc === "local" && (place.name === "" || place.latitude === 90 || place.longitude === 200)) {
      setPlaceState(false);
      setVisibState(true);
      return;
    }

    setPlaceState(true);
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


  return (
    <div   >
      {visibState && <div className="flex flex-row my-1 h-8 md:justify-between md:items-center ">


        <Input
          autoFocus={true}
          className="w-24"
          placeholder="Nickname"
          // prefix={<UserOutlined />}
          onChange={(e) => setNameValue(e.target.value)}
          value={nameValue}
        />

        <DatePicker

          required={true}
          className="w-32"
          value={dateTime}
          allowClear={false}
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


        <div className="flex flex-row justify-between">

          {/* <TimePicker
            className='flex w-4'
            clearIcon={null}
            clockIcon={null}
            disableClock={true}
            format='HH:mm'
            onChange={onMyTimeChange} value={myTime} /> */}

          <select name="hour" id="hour-select" value={hour} onChange={onChangeHour}>
            <option value="0">00</option>
            <option value="1">01</option>
            <option value="2">02</option>
            <option value="3">03</option>
            <option value="4">04</option>
            <option value="5">05</option>
            <option value="6">06</option>
            <option value="7">07</option>
            <option value="8">08</option>
            <option value="9">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
          </select>

          <select name="minutes" id="minutes-select" value={minutes} onChange={onChangeMinutes}>
            <option value="0">00</option>
            <option value="1" >01</option>
            <option value="2">02</option>
            <option value="3">03</option>
            <option value="4">04</option>
            <option value="5">05</option>
            <option value="6">06</option>
            <option value="7">07</option>
            <option value="8">08</option>
            <option value="9">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
            <option value="32">32</option>
            <option value="33">33</option>
            <option value="34">34</option>
            <option value="35">35</option>
            <option value="36">36</option>
            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="43">43</option>
            <option value="44">44</option>
            <option value="45">45</option>
            <option value="46">46</option>
            <option value="47">47</option>
            <option value="48">48</option>
            <option value="49">49</option>
            <option value="50">50</option>
            <option value="51">51</option>
            <option value="52">52</option>
            <option value="53">53</option>
            <option value="54">54</option>
            <option value="55">55</option>
            <option value="56">56</option>
            <option value="57">57</option>
            <option value="58">58</option>
            <option value="59">59</option>
          </select>



          <div className="flex flex-col  h-8 items-center">
            <label className="h-3  " htmlFor="utc">UTC</label>
            <Checkbox className="h-3 my-2" id="utc" defaultChecked={utc == "local" ? false : true} onChange={onUtcChange}></Checkbox>
          </div>
        </div>
      </div>}



      <div className="flex flex-row   items-center ">
        {visibState && utc == "local" && <Autocomplete
          className={` w-34 h-8 border-2 rounded  ${placeState ? "border-green-100" : "border-red-500"}`}
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
                  setPlaceState(true);

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
        />}


        <Button type="primary" htmlType="submit" onClick={onSubmit}>
          Calculate
        </Button>

      </div>
      <div className="flex flex-row">


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
        <div className="flex flex-row justify-center items-center space-x-2 space-y-0 m-0">
          <TypeOfChartRadio />
        </div>

      </div>
      {/* <div className="flex flex-row w-full justify-center items-center h-auto text-gray-500 text-base font-extralight">
        <p>
          Choose your nickname, date and time. If you know your UTC time, check
          the box. Otherwise choose your birth place.
        </p>
      </div> */}
    </div>
  );
}
