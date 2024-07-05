import { Button } from "antd";
import { UseCdInfo, useCdInfo } from "./cdInfo";
import { UseTypeOfChart, useTypeOfChart } from "./typeOfChart";
import { UseCalcType, useCalcType } from "./calcType";
import { fetchPrevNextNutr } from "./FetchData";
import { useSavedLastCdInfo, UseSavedLastCdInfo } from "./savedLastCdInfo";


export function PrevNextNutr() {

    const cdInfo: UseCdInfo = useCdInfo();
    const savedLastCdInfo: UseSavedLastCdInfo = useSavedLastCdInfo();
    const typeOfChart: UseTypeOfChart = useTypeOfChart();
    const calcType: UseCalcType = useCalcType();


    async function onSubmitPrevNext(direction: string) {

        typeOfChart.set("bodygraph");
        calcType.set("full");


        // console.log(direction)

        const data = await fetchPrevNextNutr(cdInfo.cdInfo, direction);
        // console.log(data)

        cdInfo.set(data);


    }






    return (

        <div>
            <Button type="primary" htmlType="submit" value="previous" onClick={() => onSubmitPrevNext("previous")}>
                Prev.Nutr.
            </Button>
            <Button type="primary" htmlType="submit" value="" onClick={() => cdInfo.set(savedLastCdInfo.cdInfo)} >
                Orig.
            </Button>
            <Button type="primary" htmlType="submit" value="next" onClick={() => onSubmitPrevNext("next")} >
                Next.Nutr.
            </Button>

        </div>

    );

}