import * as DropDownMenu from '@radix-ui/react-dropdown-menu'
import { DropDownContent, DropDownItem } from './styles'
import { Circle } from '@phosphor-icons/react'

interface ChoseColorDropDownProps {
  choseColor: (colorCode: string) => void
}

export function ChoseColorDropDown({ choseColor }: ChoseColorDropDownProps) {
  return (
    <DropDownMenu.Portal>
      <DropDownContent>
        <DropDownItem
          $circleColor="#ef4444"
          onClick={() => choseColor('#ef4444')}
        >
          <Circle size={20} weight="fill" />
        </DropDownItem>
        <DropDownItem
          $circleColor="#f97316"
          onClick={() => choseColor('#f97316')}
        >
          <Circle size={20} weight="fill" />
        </DropDownItem>
        <DropDownItem
          $circleColor="#eab308"
          onClick={() => choseColor('#eab308')}
        >
          <Circle size={20} weight="fill" />
        </DropDownItem>
        <DropDownItem
          $circleColor="#22c55e"
          onClick={() => choseColor('#22c55e')}
        >
          <Circle size={20} weight="fill" />
        </DropDownItem>
        <DropDownItem
          $circleColor="#3b82f6"
          onClick={() => choseColor('#3b82f6')}
        >
          <Circle size={20} weight="fill" />
        </DropDownItem>
        <DropDownItem
          $circleColor="#a855f7"
          onClick={() => choseColor('#a855f7')}
        >
          <Circle size={20} weight="fill" />
        </DropDownItem>
        <DropDownItem
          $circleColor="#ec4899"
          onClick={() => choseColor('#ec4899')}
        >
          <Circle size={20} weight="fill" />
        </DropDownItem>
        <DropDownItem
          $circleColor="#be123c"
          onClick={() => choseColor('#be123c')}
        >
          <Circle size={20} weight="fill" />
        </DropDownItem>
      </DropDownContent>
    </DropDownMenu.Portal>
  )
}
