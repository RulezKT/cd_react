
export const ShortInfo = (props) => {

    const cdInfo = props.data;
    // const chart = props.chart;
    const calc = props.calc;


    const loc = cdInfo.time.pers_time_utc;
    const loc_time = `${loc.day}.${loc.month}.${loc.year} ${loc.hours}:${loc.minutes}`;
    // const des = cdInfo.time.des_time;
    // const des_time = `${des.day}.${des.month}.${des.year} ${des.hours}:${des.minutes}`;
    const timeString: string = `${loc_time}`; // Design:${des_time} `;

    const nutrString: string = `${cdInfo.hd.specialInfo.nutr_type}.${cdInfo.hd.specialInfo.cognition}.${cdInfo.hd.specialInfo.theme}.${cdInfo.hd.specialInfo.environment}`;
    // | ${cdInfo.hd.specialInfo.motivation}.${cdInfo.hd.specialInfo.mind}`;

    let cross_text = `${cdInfo.hd.specialInfo.cross.first}/${cdInfo.hd.specialInfo.cross.second}|${cdInfo.hd.specialInfo.cross.third}/${cdInfo.hd.specialInfo.cross.fourth}`;
    const varCrossString: string = ` ${cdInfo.hd.specialInfo.variable} ` + cross_text;

    let typeProfDef: string = "";


    // console.log("Calc type", calc)
    if (calc === "full") {


        let type_text = `${cdInfo.hd.generalInfo.type}`;
        switch (type_text) {
            case "Reflector":
                type_text = "R";
                break;
            case "Manifestor":
                type_text = "M";
                break;
            case "Generator":
                type_text = "G";
                break;
            case "Manifesting Generator":
                type_text = "MG";
                break;

            case "Projector":
                type_text = "P";
                break;

            default:
                type_text = "??";
                break;
        }

        let definition = `${cdInfo.hd.generalInfo.definition}`;

        switch (definition) {


            case "No Definition":
                definition = "No";
                break;
            case "Single Definition":
                definition = "Single";
                break;
            case "Split Definition":
                definition = "Split";
                break;
            case "Triple Split Definition":
                definition = "Triple";
                break;
            case "Quadruple Split Definition":
                definition = "Quad";
                break;

            default:
                definition = "???";
                break;
        }



        typeProfDef = `${type_text}.${cdInfo.hd.specialInfo.profile}.${cdInfo.hd.generalInfo.authority}`;
    } else if (calc === "personality") {
        let type_text = `${cdInfo.hd.personality.generalInfo.type}`;
        switch (type_text) {
            case "Reflector":
                type_text = "R";
                break;
            case "Manifestor":
                type_text = "M";
                break;
            case "Generator":
                type_text = "G";
                break;
            case "Manifesting Generator":
                type_text = "MG";
                break;

            case "Projector":
                type_text = "P";
                break;

            default:
                type_text = "??";
                break;
        }


        let definition = `${cdInfo.hd.personality.generalInfo}`;

        switch (definition) {


            case "No Definition":
                definition = "No";
                break;
            case "Single Definition":
                definition = "Single";
                break;
            case "Split Definition":
                definition = "Split";
                break;
            case "Triple Split Definition":
                definition = "Triple";
                break;
            case "Quadruple Split Definition":
                definition = "Quad";
                break;

            default:
                definition = "???";
                break;
        }


        typeProfDef = `${type_text}.${cdInfo.hd.specialInfo.profile}.${cdInfo.hd.personality.generalInfo.authority}`;


    } else if (calc === "design") {


        let type_text = `${cdInfo.hd.design.generalInfo.type}`;
        switch (type_text) {
            case "Reflector":
                type_text = "R";
                break;
            case "Manifestor":
                type_text = "M";
                break;
            case "Generator":
                type_text = "G";
                break;
            case "Manifesting Generator":
                type_text = "MG";
                break;

            case "Projector":
                type_text = "P";
                break;

            default:
                type_text = "??";
                break;
        }


        let definition = `${cdInfo.hd.design.generalInfo.definition}`;

        switch (definition) {


            case "No Definition":
                definition = "No";
                break;
            case "Single Definition":
                definition = "Single";
                break;
            case "Split Definition":
                definition = "Split";
                break;
            case "Triple Split Definition":
                definition = "Triple";
                break;
            case "Quadruple Split Definition":
                definition = "Quad";
                break;

            default:
                definition = "???";
                break;
        }


        typeProfDef = `${type_text}.${cdInfo.hd.specialInfo.profile}.${cdInfo.hd.design.generalInfo.authority}.${definition}`;


    }


    //     MG
    //     1 / 3
    //     Emo
    // Triple Split Definition

    return (

        <div className="ShortInfo flex flex-row w-full">

            <p className="font-extrabold mr-1">{cdInfo.name.slice(0, 10)}</p>
            <p className="mr-1">{timeString}</p>
            <p className=" font-extrabold  text-fuchsia-700"> {typeProfDef}</p>


        </div >
    );
}






