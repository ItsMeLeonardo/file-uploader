import { FormEvent, useEffect, useMemo, useState } from 'react'
import { nanoid } from 'nanoid'

import { Folder, FolderIcon } from '../../entities/Folder'
import { useFolder } from '../../store/folder'
import IconGallery from '../icons/IconGallery'
import IconVideo from '../icons/IconVideo'
import IconDocument from '../icons/IconDocument'
import IconLayer from '../icons/IconLayer'

const ICON_OPTIONS: { value: FolderIcon; label: string; icon: JSX.Element }[] = [
  { value: 'gallery', label: 'Gallery', icon: <IconGallery /> },
  { value: 'video', label: 'Video', icon: <IconVideo /> },
  { value: 'document', label: 'Documents', icon: <IconDocument /> },
  { value: 'layer', label: 'Projects', icon: <IconLayer /> },
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

  const previewIcon = useMemo(() => ICON_OPTIONS.find((option) => option.value === icon)?.icon, [icon])

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
      <div className="Folder-form-header">
        <div className="Folder-form-heading">
          <p className="Folder-form-eyebrow">{folder ? 'Editing folder' : 'Create a folder'}</p>
          <h3 className="Folder-form-title">
            {folder ? 'Update the look & details' : 'Name it, tag it, pick an icon'}
          </h3>
          <p className="Folder-form-subtitle">Match the soft gradients and quick tags from the reference UI.</p>
        </div>
        <div className="Folder-form-preview" style={{ ['--folder-color' as string]: color }}>
          <div className="Folder-preview-icon" aria-hidden>
            <span className="Folder-preview-tab" />
            <span className="Folder-preview-badge">{previewIcon}</span>
          </div>
          <div className="Folder-preview-meta">
            <p className="Folder-preview-name">{name || 'Folder name'}</p>
            <div className="Folder-preview-tags">
              {tagsList.length ? (
                tagsList.map((tag) => (
                  <span key={tag} className="Folder-preview-tag">
                    {tag}
                  </span>
                ))
              ) : (
                <span className="Folder-preview-tag muted">Tags appear here</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="Folder-form-row">
        <label className="Folder-form-field">
          <span>Folder name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Projects, Inspiration..."
            required
          />
          <small>Use a short, descriptive name.</small>
        </label>
        <label className="Folder-form-field">
          <span>Tags</span>
          <input
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="Comma separated"
          />
          <small>Separate with commas to create quick filter chips.</small>
        </label>
      </div>
      <div className="Folder-form-row align-end">
        <div className="Folder-form-field">
          <span>Icon</span>
          <div className="Folder-icon-grid">
            {ICON_OPTIONS.map((option) => (
              <button
                type="button"
                key={option.value}
                className={`Folder-icon-choice ${option.value === icon ? 'selected' : ''}`}
                onClick={() => setIcon(option.value)}
                aria-pressed={option.value === icon}
              >
                <span className="Folder-icon-mark">{option.icon}</span>
                <span className="Folder-icon-label">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="Folder-form-field">
          <span>Color</span>
          <div className="Folder-color-picker">
            <label className="Folder-color-custom">
              <span>Custom</span>
              <input type="color" value={color} onChange={(event) => setColor(event.target.value)} />
            </label>
            <div className="Folder-color-swatches">
              {COLOR_PRESETS.map((preset) => (
                <button
                  type="button"
                  key={preset}
                  className={`Folder-color-swatch ${preset === color ? 'selected' : ''}`}
                  style={{ backgroundColor: preset }}
                  onClick={() => setColor(preset)}
                >
                  {preset === color && <span className="Folder-color-check">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="Folder-form-actions">
        <div className="Folder-form-hint">Tip: drag files into folders after creating them.</div>
        <button className="btn btn-text" type="submit">
          {folder ? 'Save changes' : 'Create folder'}
        </button>
      </div>
    </form>
  )
}
