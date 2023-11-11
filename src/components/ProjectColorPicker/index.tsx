import { Folder } from '@phosphor-icons/react'
import { BoxColors } from './styles'

interface ProjectColorPickerProps {
  togleColorPicker: boolean
  handleChoseColor: (color: string) => void
  setTogleColorPicker: (isOpne: boolean) => void
}

export function ProjectColorPicker({
  handleChoseColor,
  setTogleColorPicker,
  togleColorPicker,
}: ProjectColorPickerProps) {
  return (
    <BoxColors $isOpen={togleColorPicker}>
      <Folder
        weight="fill"
        onClick={() => {
          handleChoseColor('#ef4444')
          setTogleColorPicker(false)
        }}
        size={18}
        color="#ef4444"
      />
      <Folder
        weight="fill"
        onClick={() => {
          handleChoseColor('#f97316')
          setTogleColorPicker(false)
        }}
        size={18}
        color="#f97316"
      />
      <Folder
        weight="fill"
        onClick={() => {
          handleChoseColor('#eab308')
          setTogleColorPicker(false)
        }}
        size={18}
        color="#eab308"
      />
      <Folder
        weight="fill"
        onClick={() => {
          handleChoseColor('#22c55e')
          setTogleColorPicker(false)
        }}
        size={18}
        color="#22c55e"
      />
      <Folder
        weight="fill"
        onClick={() => {
          handleChoseColor('#06b6d4')
          setTogleColorPicker(false)
        }}
        size={18}
        color="#06b6d4"
      />
      <Folder
        weight="fill"
        onClick={() => {
          handleChoseColor('#3b82f6')
          setTogleColorPicker(false)
        }}
        size={18}
        color="#3b82f6"
      />
      <Folder
        weight="fill"
        onClick={() => {
          handleChoseColor('#a855f7')
          setTogleColorPicker(false)
        }}
        size={18}
        color="#a855f7"
      />
      <Folder
        weight="fill"
        onClick={() => {
          handleChoseColor('#ec4899')
          setTogleColorPicker(false)
        }}
        size={18}
        color="#ec4899"
      />
    </BoxColors>
  )
}
