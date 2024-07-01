import { MOON, NORTHNODE, SUN, EARTH, SOUTHNODE, MERCURY, VENUS, JUPITER, MARS, SATURN, URANUS, NEPTUNE, PLUTO } from "@/lib/cd_consts";
import { defShorten, typeShorten } from "@/lib/auxiliary_fns";

export const FullTechInfo = (props) => {

    const cdInfo = props.data;
    const calc = props.calc;

    const loc = cdInfo.time.pers_time_utc;
    const loc_time = `${loc.day}.${loc.month}.${loc.year} ${loc.hours}:${loc.minutes}`;
    const des = cdInfo.time.des_time;
    const des_time = `${des.day}.${des.month}.${des.year} ${des.hours}:${des.minutes}`;


    let cross_text = `${cdInfo.hd.specialInfo.cross.first}/${cdInfo.hd.specialInfo.cross.second}|${cdInfo.hd.specialInfo.cross.third}/${cdInfo.hd.specialInfo.cross.fourth}`;
    const varCrossString: string = `${cdInfo.hd.specialInfo.variable}.` + cross_text;




    // const nutrString: string = `D.Sun c/t:  ${cdInfo.hd.design.planets_data[SUN].color}.${cdInfo.hd.design.planets_data[SUN].tone} Nutrition: ${cdInfo.hd.specialInfo.nutr_type}  Cognition: ${cdInfo.hd.specialInfo.cognition} Theme: ${cdInfo.hd.specialInfo.theme} D.Nodes c/t: ${cdInfo.hd.design.planets_data[NORTHNODE].color}.${cdInfo.hd.design.planets_data[NORTHNODE].tone} Environment: ${cdInfo.hd.specialInfo.environment} `;





    let typeProfDef = "";
    let type_text = ""
    let definition = ""

    if (calc === "full") {
        type_text = typeShorten(cdInfo.hd.generalInfo.type);
        definition = defShorten(cdInfo.hd.generalInfo.definition);
        typeProfDef = `${type_text}.${cdInfo.hd.specialInfo.profile}.${cdInfo.hd.generalInfo.authority}.${definition}`;
    } else if (calc === "personality") {
        type_text = typeShorten(cdInfo.hd.personality.generalInfo.type);
        definition = defShorten(cdInfo.hd.personality.generalInfo.definition);
        typeProfDef = `${type_text}.${cdInfo.hd.specialInfo.profile}.${cdInfo.hd.personality.generalInfo.authority}.${definition}`;
    } else if (calc === "design") {

        type_text = typeShorten(cdInfo.hd.design.generalInfo.type);
        definition = defShorten(cdInfo.hd.design.generalInfo.definition);
        typeProfDef = `${type_text}.${cdInfo.hd.specialInfo.profile}.${cdInfo.hd.design.generalInfo.authority}.${definition}`

    }



    const motivString: string = `${cdInfo.hd.specialInfo.motivation}.${cdInfo.hd.specialInfo.mind}.${cdInfo.hd.specialInfo.view}.${cdInfo.hd.specialInfo.perspective}`;
    const motivTransf: string = `${cdInfo.hd.specialInfo.motivation_transf}.${cdInfo.hd.specialInfo.mind_transf}.${cdInfo.hd.specialInfo.view_transf}.${cdInfo.hd.specialInfo.perspective_transf} `;

    const nutrStringShort: string = `${cdInfo.hd.specialInfo.nutr_type}.${cdInfo.hd.specialInfo.cognition}.${cdInfo.hd.specialInfo.theme}.${cdInfo.hd.specialInfo.environment}`;
    const nutrTransf: string = `${cdInfo.hd.specialInfo.nutr_type_transf}.${cdInfo.hd.specialInfo.cognition_transf}.${cdInfo.hd.specialInfo.theme_transf}.${cdInfo.hd.specialInfo.environment_transf} `;



    const loc_time_str = `${loc.day}.${loc.month}.${loc.year} ${loc.hours}:${loc.minutes}`


    return (

        <div className="TechInfo flex-col w-80 justify-start items-start m-1 md:m-5">
            <div className="ShortInfo flex flex-row w-full">
                <p className="font-extrabold mr-1">{cdInfo.name.slice(0, 10)}</p>
                <p className="mr-1">{loc_time_str}</p>

            </div >
            <p className=" font-extrabold  text-fuchsia-700"> {typeProfDef}</p>
            <p>  {varCrossString}</p>
            <p className="text-blue-800"> {nutrStringShort}</p>
            <p> {motivString}</p >
            <p className="font-extrabold mr-1"> Nutr./Env. Transference:</p >
            <p className="text-red-600"> {nutrTransf}</p >
            <p className="font-extrabold mr-1"> Motiv./View Transference :</p >
            <p className="text-red-600"> {motivTransf}</p >

            <p>UTC: {loc_time}</p>
            <p>Design: {des_time}</p>


        </div >
    );
}






