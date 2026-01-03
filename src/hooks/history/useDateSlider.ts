import { useState, useMemo, useCallback, useEffect } from 'react';
import { addDays, subDays, isSameDay } from 'date-fns';

export const useDateSlider = (
    initialDate: Date = new Date(),
    onDateChange?: (date: Date) => void
) => {
    const [centerDate, setCenterDate] = useState(initialDate);

    const daysToRender = useMemo(() => {
        return [
            subDays(centerDate, 1),
            centerDate,
            addDays(centerDate, 1)
        ];
    }, [centerDate]);

    const goToNextDay = useCallback(() => setCenterDate((d) => addDays(d, 1)), []);
    const goToPrevDay = useCallback(() => setCenterDate((d) => subDays(d, 1)), []);

    const goToToday = useCallback(() => {
        setCenterDate(new Date());
    }, []);

    const selectDate = useCallback((date: Date) => {
        if (isSameDay(date, centerDate)) return;
        setCenterDate(date);
    }, [centerDate]);

    useEffect(() => {
        if (onDateChange) {
            onDateChange(centerDate);
        }
    }, [centerDate, onDateChange]);

    const isTodaySelected = useMemo(() => isSameDay(centerDate, new Date()), [centerDate]);

    return {
        daysToRender,
        centerDate,
        goToNextDay,
        goToPrevDay,
        goToToday,
        selectDate,
        isTodaySelected,
    };
};