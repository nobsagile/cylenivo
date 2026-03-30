import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'

type CalendarProps = React.ComponentProps<typeof DayPicker>

export function Calendar({ className = '', ...props }: CalendarProps) {
  return (
    <DayPicker
      className={className}
      classNames={{
        root: 'rdp-root text-sm',
        months: 'flex flex-col',
        month: 'space-y-2',
        month_caption: 'flex justify-center items-center gap-2 h-7 font-medium text-gray-800',
        nav: 'flex items-center justify-between w-full absolute top-0 left-0 px-1',
        button_previous: 'h-7 w-7 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500',
        button_next: 'h-7 w-7 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500',
        weeks: 'space-y-1',
        weekdays: 'flex',
        weekday: 'w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-400',
        week: 'flex',
        day: 'w-8 h-8 flex items-center justify-center',
        day_button: 'w-8 h-8 rounded text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none',
        selected: '[&>button]:bg-violet-600 [&>button]:text-white [&>button]:hover:bg-violet-700',
        today: '[&>button]:font-bold [&>button]:text-violet-600',
        outside: '[&>button]:text-gray-300',
        disabled: '[&>button]:text-gray-200 [&>button]:cursor-not-allowed',
      }}
      {...props}
    />
  )
}
