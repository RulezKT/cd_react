import { Button } from "@/components/ui/button";
// import { create } from "zustand";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { MainScene } from "./components/MainScene/MainScene";

import axios from "axios";

import { useEffect, useState } from "react";

import { cdInf } from "./components/cdInf";

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

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

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

  const [place, setPlace] = useState<Place>({
    name: "",
    latitude: 0,
    longitude: 0,
  });

  const [dateTime, setDateTime] = useState<Value>(new Date());

  const [timeZone, setTimeZone] = useState<TimeZone>({
    dstOffset: 0,
    rawOffset: 0,
    status: "",
    timeZoneId: "",
    timeZoneName: "",
  });

  const [cd_data, setData] = useState(cdInf);
  const [last10, setLast10] = useState([]);

  const [selectedRadioButt, setSelectedRadioButt] = useState("personality");
  const [selectedRadioTimeType, setSelectedRadioTimeType] = useState("utc");
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
  }, []);

  async function getTransits() {
    // console.log("getTransits");
    // Date.now();
    // const d = new Date();
    // const julianDay = Date.now() / 86400 + 2440587.5;

    const d = new Date();
    const offset = Math.abs(d.getTimezoneOffset() * 60);

    // setDateTime(jDtoGreg(julianDay));
    // console.log(dateTime);

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
    setSelectedRadioTimeType("local");

    // console.log(`dateTime.getFullYear() ${dateTime.getFullYear()}`);
    // console.log(`dateTime.getMonth() ${dateTime.getMonth()}`);
    // console.log(`dateTime.getDate() ${dateTime.getDate()}`);
    // console.log(`dateTime.getHours() ${dateTime.getHours()}`);
    // console.log(`dateTime.getMinutes() ${dateTime.getMinutes()}`);

    const { data } = await axios.post(
      "http://127.0.0.1:3000/api",
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
    if (selectedRadioTimeType === "utc") {
      setTimeZone(null);
      setPlace(null);
      // console.log(place);
      // console.log(timeZone);
    }

    const { data } = await axios.post(
      "http://127.0.0.1:3000/api",
      {
        year: dateTime.getFullYear(),
        month: dateTime.getMonth() + 1,
        day: dateTime.getDate(),
        hours: dateTime.getHours(),
        minutes: dateTime.getMinutes(),
        typeOfTime: selectedRadioTimeType === "utc" ? 0 : 1,
        offset:
          selectedRadioTimeType === "utc"
            ? 0
            : timeZone?.rawOffset + timeZone?.dstOffset,
        place: selectedRadioTimeType === "utc" ? "" : place.name,
        latitude: selectedRadioTimeType === "utc" ? 0 : place.latitude,
        longitude: selectedRadioTimeType === "utc" ? 0 : place.longitude,
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
    if (last10.length < 10) {
      setLast10([...last10, data]);
    } else {
      last10.shift();
      setLast10([...last10, data]);
    }

    // await Cookies.set("last10", JSON.parse(last10));
    // const cookies_now = await Cookies.get("last10");
    // console.log(cookies_now);
  }

  const form = useForm();

  // Function to handle the change in radio button selection
  function onRadioButtValueChange(value: string) {
    // Updating the state with the selected radio button's value
    setSelectedRadioButt(value);
    // console.log("inside onRadioButtValueChange");
  }

  function onRadioTimeTypeChange(value: string) {
    // Updating the state with the selected radio button's value
    setSelectedRadioTimeType(value);
    // console.log("inside onRadioButtValueChange");
  }

  function handleSelectChange(value) {
    // console.log("inside handleSelectChange");
    setSelectedRadioButt("bodygraph");
    setData(last10.find((item) => item.name === value));
  }

  return (
    <>
      <div className="flex flex-row  ">
        <Form {...form}>
          <form
            className="flex flex-row w-full space-x-2 gap-4 m-8 justify-center items-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="nick and date"
              render={() => (
                <FormItem className="flex flex-row  ">
                  <div className="flex flex-col items-start">
                    <FormLabel>Nickname</FormLabel>
                    <FormControl>
                      <Input
                        className="flex flex-row w-40 justify-between"
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
                          id="datetime"
                          format="dd-MMM-y HH:mm"
                          clearIcon={null}
                          disableClock={true}
                          disableCalendar={true}
                          onChange={setDateTime}
                          value={dateTime}
                        />
                      </div>

                      <RadioGroup
                        className="flex flex-row "
                        onValueChange={onRadioTimeTypeChange}
                        defaultValue="local"
                      >
                        <div className=" ">
                          <RadioGroupItem value="local" id="option-one" />
                          <Label htmlFor="option-one">Local</Label>
                        </div>
                        <div className=" ">
                          <RadioGroupItem value="utc" id="option-two" />
                          <Label htmlFor="option-two">UTC</Label>
                        </div>
                      </RadioGroup>
                      <Autocomplete
                        disabled={
                          selectedRadioTimeType === "utc" ? true : false
                        }
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
                                const timestamp = dateTime.getTime() / 1000;
                                // console.log("timestamp", timestamp);

                                const { data } = await axios.get(
                                  `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${GOOGLE_MAPS_API_KEY}`
                                );

                                setTimeZone(data);
                                console.log(data);
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
                    </>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-start items-start">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="flex flex-row w-full justify-center items-center h-auto">
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Last 10" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {last10.map((item, index) => (
                <SelectItem key={index} value={item.name}>
                  {`${item.name} : ${JSON.stringify(item.time.pers_time_utc)}`}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row w-full justify-center items-center h-auto">
        <p>
          Please choose your nickname, date and time. If you know your UTC time,
          just check the UTC box. Otherwise choose the place of birth.
        </p>
      </div>
      {/* <div className="flex flex-row justify-center h-96 items-center">
        <Button onClick={handleClick}>Fetch data </Button>
      </div> */}
      <div className="flex flex-col w-full justify-center items-center h-auto">
        <RadioGroup
          className="flex flex-row gap-5 m-10"
          onValueChange={onRadioButtValueChange}
          defaultValue="personality"
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
            <RadioGroupItem value="bodytransits" id="option-five" disabled />
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
        <MainScene radiobutt={selectedRadioButt} data={cd_data} />
      </div>
    </>
  );
}

export default App;
