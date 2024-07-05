import { MOON, NORTHNODE, SUN, EARTH, SOUTHNODE, MERCURY, VENUS, JUPITER, MARS, SATURN, URANUS, NEPTUNE, PLUTO } from "@/lib/cd_consts";

export const PlanetsInfo = (props) => {

    const cdInfo = props.data;

    const shortDesPlanets = cdInfo.hd.design.planets_data;
    const shortPersPlanets = cdInfo.hd.personality.planets_data;


    // type UranusOpp struct {
    // UranusOppStartSec int64`json:"uranusOppStartSec"`
    // UranusOppEndSec   int64`json:"uranusOppEndSec"`
    // UranusOppStartUTC GregDate`json:"uranusOppStartUTC"`
    // UranusOppEndUTC   GregDate`json:"uranusOppEndUTC"`






    const shortU = cdInfo.astroInfo.uranusOpp;

    console.log(shortU);

    const uranusOpp = shortU ? `UranusOpp` : "";
    const uranusOpp2 = shortU ? `Start:${shortU.uranusOppStartSec} End: ${shortU.uranusOppEndSec}` : "";

    const shortS = shortU ? shortU.uranusOppStartUTC : 0
    const shortE = shortU ? shortU.uranusOppEndUTC : 0
    const uranusOpp3 = shortU ? `StartUTC: ${shortS.day}.${shortS.month}.${shortS.year} ${shortS.hours}: ${shortS.minutes}` : "";
    const uranusOpp4 = shortU ? `EndUTC: ${shortE.day}.${shortE.month}.${shortE.year} ${shortE.hours}: ${shortE.minutes}` : "";


    const sunStr: string = `☀️ Sun: ${shortDesPlanets[SUN].hex}.${shortDesPlanets[SUN].line
        }.${shortDesPlanets[SUN].color}.${shortDesPlanets[SUN].tone
        }.${shortDesPlanets[SUN].base}-${shortDesPlanets[SUN].direction}${shortDesPlanets[SUN].power
        }   | ${shortPersPlanets[SUN].hex}.${shortPersPlanets[SUN].line
        }.${shortPersPlanets[SUN].color}.${shortPersPlanets[SUN].tone
        }.${shortPersPlanets[SUN].base}-${shortPersPlanets[SUN].direction}${shortPersPlanets[SUN].power
        }`;
    const earthStr: string = `🌎 Earth: ${shortDesPlanets[EARTH].hex}.${shortDesPlanets[EARTH].line
        }.${shortDesPlanets[EARTH].color}.${shortDesPlanets[EARTH].tone
        }.${shortDesPlanets[EARTH].base}-${shortDesPlanets[EARTH].direction}${shortDesPlanets[EARTH].power
        }   | ${shortPersPlanets[EARTH].hex}.${shortPersPlanets[EARTH].line
        }.${shortPersPlanets[EARTH].color}.${shortPersPlanets[EARTH].tone
        }.${shortPersPlanets[EARTH].base}-${shortPersPlanets[EARTH].direction}${shortPersPlanets[EARTH].power
        }`;
    const northNode: string = `☊ N.Node: ${shortDesPlanets[NORTHNODE].hex}.${shortDesPlanets[NORTHNODE].line
        }.${shortDesPlanets[NORTHNODE].color}.${shortDesPlanets[NORTHNODE].tone
        }.${shortDesPlanets[NORTHNODE].base}-${shortDesPlanets[NORTHNODE].direction}${shortDesPlanets[NORTHNODE].power
        }   | ${shortPersPlanets[NORTHNODE].hex}.${shortPersPlanets[NORTHNODE].line
        }.${shortPersPlanets[NORTHNODE].color}.${shortPersPlanets[NORTHNODE].tone
        }.${shortPersPlanets[NORTHNODE].base}-${shortPersPlanets[NORTHNODE].direction}${shortPersPlanets[NORTHNODE].power
        }`;
    const southNode: string = `☋ S.Node: ${shortDesPlanets[SOUTHNODE].hex}.${shortDesPlanets[SOUTHNODE].line
        }.${shortDesPlanets[SOUTHNODE].color}.${shortDesPlanets[SOUTHNODE].tone
        }.${shortDesPlanets[SOUTHNODE].base}-${shortDesPlanets[SOUTHNODE].direction}${shortDesPlanets[SOUTHNODE].power
        }   | ${shortPersPlanets[SOUTHNODE].hex}.${shortPersPlanets[SOUTHNODE].line
        }.${shortPersPlanets[SOUTHNODE].color}.${shortPersPlanets[SOUTHNODE].tone
        }.${shortPersPlanets[SOUTHNODE].base}-${shortPersPlanets[SOUTHNODE].direction}${shortPersPlanets[SOUTHNODE].power
        }`;
    const moonStr: string = `🌙 Moon: ${shortDesPlanets[MOON].hex}.${shortDesPlanets[MOON].line
        }.${shortDesPlanets[MOON].color}.${shortDesPlanets[MOON].tone
        }.${shortDesPlanets[MOON].base}-${shortDesPlanets[MOON].direction}${shortDesPlanets[MOON].power
        }   | ${shortPersPlanets[MOON].hex}.${shortPersPlanets[MOON].line
        }.${shortPersPlanets[MOON].color}.${shortPersPlanets[MOON].tone
        }.${shortPersPlanets[MOON].base}-${shortPersPlanets[MOON].direction}${shortPersPlanets[MOON].power
        }`;
    const mercuryStr: string = `☿️ Mercury: ${shortDesPlanets[MERCURY].hex}.${shortDesPlanets[MERCURY].line
        }.${shortDesPlanets[MERCURY].color}.${shortDesPlanets[MERCURY].tone
        }.${shortDesPlanets[MERCURY].base}-${shortDesPlanets[MERCURY].direction}${shortDesPlanets[MERCURY].power
        }   | ${shortPersPlanets[MERCURY].hex}.${shortPersPlanets[MERCURY].line
        }.${shortPersPlanets[MERCURY].color}.${shortPersPlanets[MERCURY].tone
        }.${shortPersPlanets[MERCURY].base}-${shortPersPlanets[MERCURY].direction}${shortPersPlanets[MERCURY].power
        }`;
    const venusStr: string = `♀️ Venus: ${shortDesPlanets[VENUS].hex}.${shortDesPlanets[VENUS].line
        }.${shortDesPlanets[VENUS].color}.${shortDesPlanets[VENUS].tone
        }.${shortDesPlanets[VENUS].base}-${shortDesPlanets[VENUS].direction}${shortDesPlanets[VENUS].power
        }   | ${shortPersPlanets[VENUS].hex}.${shortPersPlanets[VENUS].line
        }.${shortPersPlanets[VENUS].color}.${shortPersPlanets[VENUS].tone
        }.${shortPersPlanets[VENUS].base}-${shortPersPlanets[VENUS].direction}${shortPersPlanets[VENUS].power
        }`;
    const marsStr: string = `♂️ Mars: ${shortDesPlanets[MARS].hex}.${shortDesPlanets[MARS].line
        }.${shortDesPlanets[MARS].color}.${shortDesPlanets[MARS].tone
        }.${shortDesPlanets[MARS].base}-${shortDesPlanets[MARS].direction}${shortDesPlanets[MARS].power
        }   | ${shortPersPlanets[MARS].hex}.${shortPersPlanets[MARS].line
        }.${shortPersPlanets[MARS].color}.${shortPersPlanets[MARS].tone
        }.${shortPersPlanets[MARS].base}-${shortPersPlanets[MARS].direction}${shortPersPlanets[MARS].power
        }`;
    const jupiterStr: string = `♃ Jupiter: ${shortDesPlanets[JUPITER].hex}.${shortDesPlanets[JUPITER].line
        }.${shortDesPlanets[JUPITER].color}.${shortDesPlanets[JUPITER].tone
        }.${shortDesPlanets[JUPITER].base}-${shortDesPlanets[JUPITER].direction}${shortDesPlanets[JUPITER].power
        }   | ${shortPersPlanets[JUPITER].hex}.${shortPersPlanets[JUPITER].line
        }.${shortPersPlanets[JUPITER].color}.${shortPersPlanets[JUPITER].tone
        }.${shortPersPlanets[JUPITER].base}-${shortPersPlanets[JUPITER].direction}${shortPersPlanets[JUPITER].power
        }`;
    const saturnStr: string = `♄ Saturn: ${shortDesPlanets[SATURN].hex}.${shortDesPlanets[SATURN].line
        }.${shortDesPlanets[SATURN].color}.${shortDesPlanets[SATURN].tone
        }.${shortDesPlanets[SATURN].base}-${shortDesPlanets[SATURN].direction}${shortDesPlanets[SATURN].power
        }   | ${shortPersPlanets[SATURN].hex}.${shortPersPlanets[SATURN].line
        }.${shortPersPlanets[SATURN].color}.${shortPersPlanets[SATURN].tone
        }.${shortPersPlanets[SATURN].base}-${shortPersPlanets[SATURN].direction}${shortPersPlanets[SATURN].power
        }`;
    const uranusStr: string = `♅ Uranus: ${shortDesPlanets[URANUS].hex}.${shortDesPlanets[URANUS].line
        }.${shortDesPlanets[URANUS].color}.${shortDesPlanets[URANUS].tone
        }.${shortDesPlanets[URANUS].base}-${shortDesPlanets[URANUS].direction}${shortDesPlanets[URANUS].power
        }   | ${shortPersPlanets[URANUS].hex}.${shortPersPlanets[URANUS].line
        }.${shortPersPlanets[URANUS].color}.${shortPersPlanets[URANUS].tone
        }.${shortPersPlanets[URANUS].base}-${shortPersPlanets[URANUS].direction}${shortPersPlanets[URANUS].power
        }`;
    const neptuneStr: string = `♆ Neptune: ${shortDesPlanets[NEPTUNE].hex}.${shortDesPlanets[NEPTUNE].line
        }.${shortDesPlanets[NEPTUNE].color}.${shortDesPlanets[NEPTUNE].tone
        }.${shortDesPlanets[NEPTUNE].base}-${shortDesPlanets[NEPTUNE].direction}${shortDesPlanets[NEPTUNE].power
        }   | ${shortPersPlanets[NEPTUNE].hex}.${shortPersPlanets[NEPTUNE].line
        }.${shortPersPlanets[NEPTUNE].color}.${shortPersPlanets[NEPTUNE].tone
        }.${shortPersPlanets[NEPTUNE].base}-${shortPersPlanets[NEPTUNE].direction}${shortPersPlanets[NEPTUNE].power
        }`;
    const plutoStr: string = `♇ Pluto: ${shortDesPlanets[PLUTO].hex}.${shortDesPlanets[PLUTO].line
        }.${shortDesPlanets[PLUTO].color}.${shortDesPlanets[PLUTO].tone
        }.${shortDesPlanets[PLUTO].base}-${shortDesPlanets[PLUTO].direction}${shortDesPlanets[PLUTO].power
        }   | ${shortPersPlanets[PLUTO].hex}.${shortPersPlanets[PLUTO].line
        }.${shortPersPlanets[PLUTO].color}.${shortPersPlanets[PLUTO].tone
        }.${shortPersPlanets[PLUTO].base}-${shortPersPlanets[PLUTO].direction}${shortPersPlanets[PLUTO].power
        }`;





    return (

        <div className="TechInfo flex-col w-80 justify-start items-start m-1 md:m-5">

            <p> {uranusOpp}</p >
            <p> {uranusOpp2}</p >
            <p> {uranusOpp3}</p >
            <p> {uranusOpp4}</p >

            <div className="">
                <p> {sunStr}</p >
                <p> {earthStr}</p >
            </div>
            <p> {northNode}</p >
            <p> {southNode}</p >
            <p> {moonStr}</p >
            <p> {mercuryStr}</p >
            <p> {venusStr}</p >
            <p> {marsStr}</p >
            <p> {jupiterStr}</p >
            <p> {saturnStr}</p >
            <p> {uranusStr}</p >
            <p> {neptuneStr}</p >
            <p> {plutoStr}</p >




        </div >
    );
}






