import * as TooltipPrimitive from '@radix-ui/react-tooltip'

export const TooltipProvider = TooltipPrimitive.Provider
export const TooltipRoot = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger

export function TooltipContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={4}
        className={`z-[200] rounded-lg border border-gray-200 bg-white shadow-lg p-2.5 text-xs outline-none ${className}`}
      >
        {children}
        <TooltipPrimitive.Arrow className="fill-white stroke-gray-200" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}
