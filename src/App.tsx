import { Button } from "@/components/ui/button";
// import { create } from "zustand";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { MainScene } from "./components/MainScene/MainScene";

import axios from "axios";

import { useState } from "react";

import { cdInf } from "./components/cdInf";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";

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

function App() {
  // const increasePopulation = useStore((state) => state.increasePopulation);
  // const bears = useStore((state) => state.bears);

  // const useCallGetData = () => {
  // const data = GetData("17.05.1978");
  // console.log(data);
  // };

  const [cd_data, setData] = useState(cdInf);

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

  const handleClick = async () => {
    const { data } = await axios.post(
      "http://127.0.0.1:3000/api",
      {
        year: 2012,
        month: 10,
        day: 1,
        hours: 8,
        minutes: 30,
        typeOfTime: 0,
        offset: 0,
        place: "Berlin",
        latitude: 0,
        longitude: 0,
        name: "Vio",
      },
      {
        headers: {
          "Content-Type": "application/json",

          // "Access-Control-Allow-Origin": "*",
          Accept: "*/*",

          // "access-control-allow-origin": "*",
          // "Access-Control-Allow-Headers": "Content-Type, Authorization",
          // "Access-Control-Allow-Methods": "*",
        },
      }
    );

    setData(data);
    // console.log(data);
  };

  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const form = useForm();

  // State for storing the selected option. Default is "Male"
  const [selectedRadioButt, setSelectedRadioButt] = useState("bodygraph");

  // Function to handle the change in radio button selection
  function onRadioButtValueChange(value: string) {
    // Updating the state with the selected radio button's value
    setSelectedRadioButt(value);
    // console.log("inside onRadioButtValueChange");
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      {/* <div className="flex flex-row justify-center h-96 items-center">
        <Button onClick={handleClick}>Fetch data </Button>
      </div> */}
      <RadioGroup
        className="flex flex-row gap-5 m-10"
        onValueChange={onRadioButtValueChange}
        defaultValue="bodygraph"
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
          <RadioGroupItem value="transits" id="option-four" disabled />
          <Label htmlFor="option-four">Transits</Label>
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
      </RadioGroup>

      <MainScene radiobutt={selectedRadioButt} data={cd_data} />
    </>
  );
}

export default App;
