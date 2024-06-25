import { CDinfo, NORTHNODE, SUN } from "@/lib/cd_consts";
export const FullTechInfo = (props) => {

    const cdInfo = props.data;

    const loc = cdInfo.time.pers_time_utc;
    const loc_time = `${loc.day}.${loc.month}.${loc.year} ${loc.hours}:${loc.minutes}`;

    const des = cdInfo.time.des_time;
    const des_time = `${des.day}.${des.month}.${des.year} ${des.hours}:${des.minutes}`;

    const timeString: string = `${cdInfo.name.slice(0, 10)} - Time:${loc_time} Design:${des_time} `;


    let cross_text = `${cdInfo.hd.specialInfo.cross.first}/${cdInfo.hd.specialInfo.cross.second}|${cdInfo.hd.specialInfo.cross.third}/${cdInfo.hd.specialInfo.cross.fourth}`;
    const varCrossString: string = `Variable: ${cdInfo.hd.specialInfo.variable} Cross:` + cross_text;


    const motivString: string = `P.Sun c/t: ${cdInfo.hd.personality.planets_data[SUN].color}.${cdInfo.hd.personality.planets_data[SUN].tone}  Motivation: ${cdInfo.hd.specialInfo.motivation} Mind: ${cdInfo.hd.specialInfo.mind}`;
    const motiveString2: string = `P.Nodes c/t: ${cdInfo.hd.personality.planets_data[NORTHNODE].color}.${cdInfo.hd.personality.planets_data[NORTHNODE].tone}`;


    const nutrString: string = `D.Sun c/t:  ${cdInfo.hd.design.planets_data[SUN].color}.${cdInfo.hd.design.planets_data[SUN].tone} Nutrition: ${cdInfo.hd.specialInfo.nutr_type}  Cognition: ${cdInfo.hd.specialInfo.cognition} Theme: ${cdInfo.hd.specialInfo.theme} D.Nodes c/t: ${cdInfo.hd.design.planets_data[NORTHNODE].color}.${cdInfo.hd.design.planets_data[NORTHNODE].tone} Environment: ${cdInfo.hd.specialInfo.environment} `;

    const transfString: string = ` Motiv.transference: ${cdInfo.hd.specialInfo.motivation_transf} Mind transference ${cdInfo.hd.specialInfo.mind_transf}  Perspective transference ${cdInfo.hd.specialInfo.perspective_transf}  View transference ${cdInfo.hd.specialInfo.view_transf} `;

    const transf2String: string = `Environment transference: ${cdInfo.hd.specialInfo.environment_transf} `;
    const transf3String: string = `Theme transference: ${cdInfo.hd.specialInfo.theme_transf}  Cognition transference: ${cdInfo.hd.specialInfo.cognition_transf}  Nutrition transference: ${cdInfo.hd.specialInfo.nutr_type_transf} `;



    return (

        <div className="TechInfo w-full">
            This is full tech info  page
            <p> {timeString}</p>
            <p> {varCrossString}</p >
            <p> {motivString}</p >
            <p> {motiveString2}</p >
            <p> {nutrString}</p >
            <p> {transfString}</p >
            <p> {transf2String}</p >
            <p> {transf3String}</p >

        </div >
    );
}






