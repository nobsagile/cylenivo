import * as PopoverPrimitive from '@radix-ui/react-popover'

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger

export function PopoverContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        sideOffset={6}
        className={`z-[130] rounded-lg border border-gray-200 bg-white shadow-lg p-3 text-sm ${className}`}
      >
        {children}
        <PopoverPrimitive.Arrow className="fill-white stroke-gray-200" />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
}
