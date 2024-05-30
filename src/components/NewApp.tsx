import { useState } from "react";

import { Button, DatePicker } from "antd";

import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { Checkbox } from "antd";

import { TimePicker } from "antd";
import type { Dayjs } from "dayjs";

import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";

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

  function onChange(e: any) {
    console.log(`checked = ${e.target.checked}`);
  }
  const [time, setTime] = useState<Dayjs | null>(null);

  const onTimeChange = (time: Dayjs) => {
    setTime(time);
  };
  return (
    <div className="flex flex-row justify-center items-center">
      <Input
        className="w-28"
        placeholder="Nickname"
        prefix={<UserOutlined />}
      />
      <DatePicker className="w-28" placeholder="select date" />
      <TimePicker
        className="w-20"
        value={time}
        onChange={onTimeChange}
        format={timeFormat}
      />
      <Checkbox onChange={onChange}>UTC</Checkbox>
      <Button type="primary">PRESS ME</Button>
      <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
        <Button>
          bottomLeft <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}
