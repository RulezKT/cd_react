import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { MainScene } from "./components/MainScene/MainScene";

import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

import axios from "axios";

import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";

// import { PlaceAutocomplete } from "./components/GoogleAPIs/PlaceAutocomplete";

import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import Cookies from "js-cookie";

import { Checkbox } from "@/components/ui/checkbox";

// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];

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

import Autocomplete from "react-google-autocomplete";
import { CheckedState } from "@radix-ui/react-checkbox";
import { NewApp } from "./components/NewApp";
import { FETCH_API, FETCH_COOKIES, fetchData } from "./components/FetchData";
import { ReqData } from "./lib/cd_consts";
import { UseCdInfo, useCdInfo } from "./components/cdInfo";
import { UseTypeOfChart, useTypeOfChart } from "./components/typeOfChart";

// require("dotenv").config();

const GOOGLE_MAPS_API_KEY = "AIzaSyBaHb8Qz3QFglWkTHH3Bisf1geUNdxPKys";

// import { GetData } from "./lib/GetData";

// interface BearState {
//   bears: number;
//   increasePopulation: () => void;
// }

// const useStore = create<BearState>()((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
// }));

// const useStore = create((set) => ({
//   cd_data: null,
//   setData: (data) => set((state) => ({ cd_data: data })),
// }));

// const increasePopulation = useStore((state) => state.increasePopulation);
// const bears = useStore((state) => state.bears);

// const useCallGetData = () => {
// const data = GetData("17.05.1978");
// console.log(data);
// };
function App() {
  // console.log("setting useState");

  const cdInfo: UseCdInfo = useCdInfo();
  const typeOfChart: UseTypeOfChart = useTypeOfChart();

  // console.log("cdInfo");
  // console.log(cdInfo);

  const [place, setPlace] = useState<Place>({
    name: "",
    latitude: 0,
    longitude: 0,
  });

  const [dateTime, setDateTime] = useState<Dayjs>(dayjs());

  const [timeZone, setTimeZone] = useState<TimeZone>({
    dstOffset: 0,
    rawOffset: 0,
    status: "",
    timeZoneId: "",
    timeZoneName: "",
  });

  // const [cd_data, setData] = useState(cdInf);
  const [last10, setLast10] = useState([]);

  const [utc, setUTC] = useState("local");

  const [selectedRadioButt, setSelectedRadioButt] = useState("personality");

  // const [selectedRadioTimeType, setSelectedRadioTimeType] = useState("utc");
  const [nameValue, setNameValue] = useState("Transits");

  // console.log(cd_data);

  // const setData = useStore((state) => state.setData);
  // const cd_data = useStore((state) => state.cd_data);

  // const rr = {
  //   year: 1978,
  //   month: 5,
  //   day: 17,
  //   hours: 12,
  //   minutes: 45,
  //   typeOfTime: 0,
  //   offset: 0,
  //   place: "Spb",
  //   latitude: 0,
  //   longitude: 0,
  //   name: "RR",
  // };

  // const vio = {
  //   year: 2012,
  //   month: 10,
  //   day: 1,
  //   hours: 8,
  //   minutes: 30,
  //   typeOfTime: 0,
  //   offset: 0,
  //   place: "Berlin",
  //   latitude: 0,
  //   longitude: 0,
  //   name: "Vio",
  // };

  useEffect(() => {
    getTransits();
    getCookies();
  }, []);

  async function getCookies() {
    const cookies = Cookies.get("last10");
    // console.log(cookies);
    const json = JSON.parse(cookies);

    const data = await fetchData(json, FETCH_COOKIES);

    setLast10(data);
  }
  async function getTransits() {
    // console.log("getTransits");
    // Date.now();
    // const d = new Date();
    // const julianDay = Date.now() / 86400 + 2440587.5;

    const d = dayjs();

    // const timestamp = d.getTime() / 1000;
    // console.log("timestamp", timestamp);

    // const { data: offset_data } = await axios.get(
    //   `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${GOOGLE_MAPS_API_KEY}`
    // );

    // console.log(dayjs().utcOffset());

    // const offset = Math.abs(d.getTimezoneOffset() * 60);
    const offset = Math.abs(dayjs().utcOffset() * 60);

    // setDateTime(jDtoGreg(julianDay));
    // console.log(`offset ${offset}`);

    setDateTime(d);

    setNameValue("Transits");
    onRadioButtValueChange("personality");
    setUTC("local");

    const reqData: ReqData = {
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
      name: nameValue,
    };

    // console.log("reqData");
    // console.log(reqData);

    const data = await fetchData(reqData, FETCH_API);
    // console.log("data");
    // console.log(data);
    // setData(data);
    // console.log("initial data");
    // console.log(cd_data);

    cdInfo.set(data);
  }

  async function onSubmit(values) {
    typeOfChart.set("bodygraph");

    const reqData: ReqData = {
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
    };

    const data = await fetchData(reqData, FETCH_API);

    // setData(data);
    cdInfo.set(data);

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

  const form = useForm();

  // Function to handle the change in radio button selection
  function onRadioButtValueChange(value: string) {
    // Updating the state with the selected radio button's value
    // console.log(`inside onRadioButtValueChange ${value}`);
    setSelectedRadioButt(value);
    // console.log("inside onRadioButtValueChange");

    typeOfChart.set(value);
    // console.log(typeOfChart);
  }

  function onCheckBoxChange(checked: CheckedState) {
    // Updating the state with the selected radio button's value
    if (checked) {
      setUTC("utc");
      // console.log("utc");
    } else {
      setUTC("local");
      // console.log("local");
    }
  }

  function onChangetDateTime(value: Date) {
    // Updating the state with the selected radio button's value

    setDateTime(dayjs(value));
  }

  // function onRadioTimeTypeChange(value: string) {
  //   // Updating the state with the selected radio button's value
  //   setSelectedRadioTimeType(value);
  //   // console.log("inside onRadioButtValueChange");
  // }

  function handleSelectChange(value) {
    // console.log("inside handleSelectChange");
    typeOfChart.set("bodygraph");
    cdInfo.set(
      last10.find(
        (item) =>
          item.name === value.name &&
          item.time.pers_time_utc === value.time.pers_time_utc
      )
    );
  }

  return (
    <>
      <div className="flex flex-col container mx-auto border-solid border-2 border-slate-950 w-full justify-center items-center  p-2   gap-5 m-2 space-x-4">
        <div className="flex flex-row    p-2  items-center align-middle space-x-4">
          <Form {...form}>
            <form
              className="flex flex-row items-center space-x-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="nick and date"
                render={() => (
                  <FormItem className="flex flex-row space-x-4 ">
                    <div className="flex flex-col items-center w-28 space-y-2">
                      <FormLabel>Nickname</FormLabel>
                      <FormControl>
                        <Input
                          className="flex flex-row justify-between w-28 h-7"
                          placeholder="enter your nickname"
                          // {...field}
                          onChange={(e) => setNameValue(e.target.value)}
                          value={nameValue}
                        />
                      </FormControl>
                    </div>

                    <FormControl>
                      <>
                        <div className="flex flex-col items-start">
                          <Label htmlFor="datetime">Date and Time</Label>
                          <DateTimePicker
                            className="rounded"
                            id="datetime"
                            format="dd-MMM-y HH:mm"
                            maxDate={new Date(2100, 12, 31, 23, 59, 59, 999)}
                            minDate={new Date(1900, 1, 1, 0, 0, 0, 0)}
                            clearIcon={null}
                            disableClock={true}
                            disableCalendar={true}
                            onChange={onChangetDateTime}
                            value={dateTime}
                          />
                        </div>
                        {/* <RadioGroup
                          className="flex flex-col p-2 m-2"
                          onValueChange={onRadioTimeTypeChange}
                          defaultValue="local"
                          value={selectedRadioTimeType}
                        >
                          <div className=" ">
                            <RadioGroupItem value="local" id="option-one" />
                            <Label htmlFor="option-one">Local</Label>
                          </div>
                          <div className=" ">
                            <RadioGroupItem value="utc" id="option-two" />
                            <Label htmlFor="option-two">UTC</Label>
                          </div>
                        </RadioGroup> */}

                        <div className="flex flex-col items-start w-48 space-x-4">
                          <div className="flex flex-row p-2 m-2 items-start">
                            <Checkbox
                              id="utc"
                              value={utc}
                              onCheckedChange={onCheckBoxChange}
                            />
                            <Label htmlFor="utc">UTC</Label>
                          </div>

                          <Autocomplete
                            className=" h-10 rounded"
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

                                    const lat =
                                      results[0].geometry.location.lat();
                                    const lng =
                                      results[0].geometry.location.lng();

                                    setPlace({
                                      name: place.formatted_address,
                                      latitude: lat,
                                      longitude: lng,
                                    });
                                    // const timestamp = dateTime.getTime() / 1000;
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
                        </div>
                      </>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center space-x-4">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
          <div className="flex w-24 items-center">
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Last 10" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {last10.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {`${item.name}  ${item.time.pers_time_utc.year}-${item.time.pers_time_utc.month}-${item.time.pers_time_utc.day} ${item.time.pers_time_utc.hours}:${item.time.pers_time_utc.minutes} UTC`}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full">
          <div className="flex flex-col w-full justify-center items-center h-auto text-gray-500 text-base font-extralight">
            <p>
              Choose your nickname, date and time. If you know your UTC time,
              check the box. Otherwise choose the place of birth.
            </p>
          </div>
          {/* <div className="flex flex-row justify-center h-96 items-center">
        <Button onClick={handleClick}>Fetch data </Button>
      </div> */}
          <NewApp />

          <div className="flex flex-col w-full justify-center items-center h-auto">
            <RadioGroup
              className="flex flex-row gap-5 m-10"
              onValueChange={onRadioButtValueChange}
              defaultValue={typeOfChart.typeOfChart}
              value={typeOfChart.typeOfChart}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bodygraph" id="option-one" />
                <Label htmlFor="option-one">Body</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="design" id="option-two" />
                <Label htmlFor="option-two">Design</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personality" id="option-three" />
                <Label htmlFor="option-three">Personality</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="bodytransits"
                  id="option-five"
                  disabled
                />
                <Label htmlFor="option-five">Body+Transits</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mandala" id="option-six" disabled />
                <Label htmlFor="option-six">Mandala</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="composite" id="option-seven" disabled />
                <Label htmlFor="option-seven">Composite</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="numerology" id="option-eight" />
                <Label htmlFor="option-eight">Numerology</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fd" id="option-nine" />
                <Label htmlFor="option-nine">FD</Label>
              </div>
            </RadioGroup>
            <MainScene radiobutt={selectedRadioButt} data={cdInfo.cdInfo} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
