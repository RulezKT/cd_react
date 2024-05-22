https://github.com/shadcn-ui/ui/issues/546

// @H0BB5 thanks so much for this.
// FYI I had to add hidden to the caption_label style field in calendar.tsx
// as the caption was causing some UI shifting:

====================================================================
Step 1:
Import the DayPicker CSS in your component:

// App.tsx
import 'react-day-picker/dist/style.css';
Step 2:
Add these classNames

//Calender.tsx
<DayPicker

---

classNames={{
     ---
     caption_label: 'flex items-center text-sm font-medium',
     dropdown: 'rdp-dropdown bg-card',
     dropdown_icon: 'ml-2',
     dropdown_year: 'rdp-dropdown_year ml-3',
     button: '',
     button_reset: '',
      ---
     }} />
Step 3:
Add captionLayout prop

<Calendar
     mode="single"
     selected={date}
     onSelect={setDate}
     captionLayout="dropdown-buttons"
     fromYear={2015}
     toYear={2025} />

     ====================================================

https://reactdatepicker.com/

https://mui.com/x/react-date-pickers/date-picker/

https://gist.github.com/mjbalcueva/1fbcb1be9ef68a82c14d778b686a04fa

https://flowbite-react.com/docs/components/datepicker

https://reactdatepicker.com/
https://github.com/Hacker0x01/react-datepicker/

https://shadcnui-expansions.typeart.cc/docs/datetime-picker

======================================

https://projects.wojtekmaj.pl/react-datetime-picker/
https://github.com/wojtekmaj/react-datetime-picker

=================
