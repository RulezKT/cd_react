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

                            const lat = results[0].geometry.location.lat();
                            const lng = results[0].geometry.location.lng();

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
</div>;
