import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Alert,
} from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { SiteItem } from '@/lib/types'

const RoutesTable = () => {
  const currentSite: Partial<SiteItem> = {
    rules: []
  }

  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      {currentSite.rules && currentSite.rules.map(r => (
        <AccordionItem value={r.id} key={r.id} className='px-4 border rounded-lg bg-white hover:[data-state=close]:bg-muted'>
          <AccordionTrigger className='hover:no-underline'>
            <div className='flex gap-4 text-muted-foreground text-left'>
              <span className='max-w-[220px] line-clamp-1 text-black'>{r.title}</span>
              <span>|</span>
              <span>{r.route}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2">
              <Label htmlFor="terms">Cache duration
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default RoutesTable