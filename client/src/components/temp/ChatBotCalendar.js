import React from 'react';
import { LocalizationProvider, DateCalendar  } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import koLocale from 'date-fns/locale/en-US';

const ChatbotCalendar = ({ selectedDate, setSelectedDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={koLocale}>
      <DateCalendar 
        views={['year', 'month', 'day']}
        value={selectedDate}
        onChange={(newDate) => setSelectedDate(newDate)}
      />
    </LocalizationProvider>
  );
};

export default ChatbotCalendar;