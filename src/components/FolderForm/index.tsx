import { FormEvent, useEffect, useMemo, useState } from 'react'
import { nanoid } from 'nanoid'

import { Folder, FolderIcon } from '../../entities/Folder'
import { useFolder } from '../../store/folder'

const ICON_OPTIONS: { value: FolderIcon; label: string }[] = [
  { value: 'gallery', label: 'Gallery' },
  { value: 'video', label: 'Video' },
  { value: 'document', label: 'Documents' },
  { value: 'layer', label: 'Projects' },
]

const COLOR_PRESETS = ['#d7e5ff', '#ffe6f1', '#fff0d7', '#e5f8f0', '#e9e9e9', '#d7d7ff']

type Props = {
  folder?: Folder | null
  onSaved?: () => void
}

export default function FolderForm({ folder, onSaved }: Props) {
  const { addFolder, updateFolder } = useFolder()

  const [name, setName] = useState(folder?.name ?? '')
  const [tags, setTags] = useState(folder?.tags.join(', ') ?? '')
  const [icon, setIcon] = useState<FolderIcon>(folder?.icon ?? 'gallery')
  const [color, setColor] = useState(folder?.color ?? COLOR_PRESETS[0])

  useEffect(() => {
    setName(folder?.name ?? '')
    setTags(folder?.tags.join(', ') ?? '')
    setIcon(folder?.icon ?? 'gallery')
    setColor(folder?.color ?? COLOR_PRESETS[0])
  }, [folder?.id])

  const tagsList = useMemo(
    () =>
      tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    [tags]
  )

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!name.trim()) return

    const newFolder: Folder = {
      id: folder?.id ?? nanoid(),
      name: name.trim(),
      tags: tagsList,
      icon,
      color,
    }

    if (folder) {
      updateFolder(newFolder)
    } else {
      addFolder(newFolder)
      setName('')
      setTags('')
      setIcon('gallery')
      setColor(COLOR_PRESETS[0])
    }

    onSaved?.()
  }

  return (
    <form className="Folder-form" onSubmit={handleSubmit}>
      <div className="Folder-form-row">
        <label className="Folder-form-field">
          <span>Folder name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Projects, Inspiration..."
            required
          />
        </label>
        <label className="Folder-form-field">
          <span>Tags</span>
          <input
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="Comma separated"
          />
        </label>
      </div>
      <div className="Folder-form-row">
        <label className="Folder-form-field">
          <span>Icon</span>
          <select value={icon} onChange={(event) => setIcon(event.target.value as FolderIcon)}>
            {ICON_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="Folder-form-field">
          <span>Color</span>
          <div className="Folder-color-picker">
            <input type="color" value={color} onChange={(event) => setColor(event.target.value)} />
            <div className="Folder-color-swatches">
              {COLOR_PRESETS.map((preset) => (
                <button
                  type="button"
                  key={preset}
                  className={`Folder-color-swatch ${preset === color ? 'selected' : ''}`}
                  style={{ backgroundColor: preset }}
                  onClick={() => setColor(preset)}
                />
              ))}
            </div>
          </div>
        </label>
      </div>
      <div className="Folder-form-actions">
        <button className="btn btn-text" type="submit">
          {folder ? 'Save folder' : 'Create folder'}
        </button>
      </div>
    </form>
  )
}
