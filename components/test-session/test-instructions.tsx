"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface TestInstructionsProps {
  title: string
  description: string
  instructions: string
}

export function TestInstructions({ title, description, instructions }: TestInstructionsProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Instructions détaillées</h4>
            <CollapsibleTrigger className="p-1 rounded-md hover:bg-muted">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="mt-2 text-sm whitespace-pre-wrap bg-muted p-3 rounded-md">{instructions}</div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}

