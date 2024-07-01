


import { useState } from 'react';

import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { Value } from 'node_modules/react-time-picker/dist/esm/shared/types';


export const MyTimePicker = () => {


    const [myTime, setMyTime] = useState<Value>('10:00');

    function onTimeChange(e: Value) {


        // console.log(e);

        setMyTime(e);
    }

    return (

        <div className='w-14'>
            <TimePicker

                clearIcon={null}
                clockIcon={null}
                disableClock={true}
                format='HH:mm'
                onChange={onTimeChange} value={myTime} />
        </div>
    );
}






