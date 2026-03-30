import { useState } from 'react'
import { format, parse, isValid } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Calendar } from './calendar'
import { Button } from './button'

interface DatePickerProps {
  value: string       // 'YYYY-MM-DD' or ''
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function DatePicker({ value, onChange, placeholder = 'Pick a date', className = '' }: DatePickerProps) {
  const [open, setOpen] = useState(false)

  const selected = value ? parse(value, 'yyyy-MM-dd', new Date()) : undefined
  const validSelected = selected && isValid(selected) ? selected : undefined

  function handleSelect(date: Date | undefined) {
    onChange(date ? format(date, 'yyyy-MM-dd') : '')
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-44 justify-start text-left font-normal gap-2 ${!validSelected ? 'text-gray-400' : ''} ${className}`}
        >
          <CalendarIcon className="w-4 h-4 shrink-0" />
          {validSelected ? format(validSelected, 'dd MMM yyyy') : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-3 w-auto">
        <Calendar
          mode="single"
          selected={validSelected}
          onSelect={handleSelect}
          defaultMonth={validSelected}
        />
      </PopoverContent>
    </Popover>
  )
}
