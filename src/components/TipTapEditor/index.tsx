import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const extensions = [StarterKit]

const content = 'Adicionar Descrição'

export function TipTapEditor() {
  return (
    <EditorProvider extensions={extensions} content={content}>
      <FloatingMenu>This is the floating menu</FloatingMenu>
      <BubbleMenu>This is the bubble menu</BubbleMenu>
    </EditorProvider>
  )
}
