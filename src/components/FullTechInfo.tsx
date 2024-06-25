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




    const pers_sun_color_transf = pers_sun_color > 3 ? pers_sun_color - 3 : pers_sun_color + 3;
    const pers_sun_tone_transf = pers_sun_tone > 3 ? pers_sun_tone - 3 : pers_sun_tone + 3;
    const pers_node_color_transf = pers_node_color > 3 ? pers_node_color - 3 : pers_node_color + 3;
    const pers_node_tone_transf = pers_node_tone > 3 ? pers_node_tone - 3 : pers_node_tone + 3;






    `P.Sun transference: ${pers_sun_color}.${pers_sun_tone} `,
        "black"
    text_arr = this.spInfo.motivation_transf;
    `Motiv.transference:${text_arr} `);
    pers_y += 20;
    appendText(svg, pers_x, pers_y, text_arr[1]);
    pers_y += 20;
    appendText(
        svg,
        pers_x,
        pers_y,
        `P.Nodes transference: ${pers_node_color}.${pers_node_tone} `,
        "black"
    );
    pers_y += 20;
    // text_arr = this.perspective(pers_sun_color, pers_sun_tone);

    appendText(
        svg,
        des_x,
        des_y,
        `D.Sun c / t: ${des_sun_color}.${des_sun_tone} `,
        "red"
    );
    des_y += 20;
    let text_arr = nutrition(des_sun_color, des_sun_tone);
    appendText(svg, des_x, des_y, text_arr[0]);
    des_y += 20;
    appendText(svg, des_x, des_y, text_arr[1]);
    des_y += 20;
    appendText(svg, des_x, des_y, text_arr[2]);
    des_y += 20;
    appendText(
        svg,
        des_x,
        des_y,
        `D.Nodes c / t: ${des_node_color}.${des_node_tone} `,
        "red"
    );
    des_y += 20;
    appendText(
        svg,
        des_x,
        des_y,
        `Env.: ${environment(des_node_color, des_node_tone)} `
    );

    //add transference
    des_x = this.pers_x + width - 10;
    des_y = this.pers_y + 100;

    des_sun_color = des_sun_color > 3 ? des_sun_color - 3 : des_sun_color + 3;
    des_sun_tone = des_sun_tone > 3 ? des_sun_tone - 3 : des_sun_tone + 3;

    des_node_color = des_node_color > 3 ? des_node_color - 3 : des_node_color + 3;
    des_node_tone = des_node_tone > 3 ? des_node_tone - 3 : des_node_tone + 3;

    appendText(
        svg,
        des_x,
        des_y,
        `D.Sun transference: ${des_sun_color}.${des_sun_tone} `,
        "red",
        "end"
    );
    des_y += 20;

    text_arr = nutrition(des_sun_color, des_sun_tone);
    appendText(svg, des_x, des_y, text_arr[0], "black", "end");
    des_y += 20;
    appendText(svg, des_x, des_y, text_arr[1], "black", "end");
    des_y += 20;
    appendText(svg, des_x, des_y, text_arr[2], "black", "end");
    des_y += 20;

    appendText(
        svg,
        des_x,
        des_y,
        `D.Nodes transference: ${des_node_color}.${des_node_tone} `,
        "red",
        "end"
    );
    des_y += 20;
    appendText(
        svg,
        des_x,
        des_y,
        `Env.transference: ${environment(des_node_color, des_node_tone)} `,
        "black",
        "end"
    );



    return (

        <div className="TechInfo w-full">
            This is full tech info  page
            <p> {timeString}</p>
            <p> {varCrossString}</p >
            <p> {motivString}</p >
            <p> {motiveString2}</p >
            <p> {nutrString}</p >
        </div >
    );
}






