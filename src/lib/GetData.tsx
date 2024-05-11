import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface Data {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const GetData = (data_to_send) => {
  const { data } = useQuery({
    queryKey: ["fetch CD data"],
    queryFn: async () => {
      const { data } = await axios.post(
        "http://127.0.0.1:8080/api",
        data_to_send
      );
      return data as Data;
    },
  });

  console.log(data);

  return (
    <div className="flex flex-row justify-center h-96 items-center">
      <Button>Fetch data GetData </Button>
    </div>
  );
};
