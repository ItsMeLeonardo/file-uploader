export const generateVideoThumbnail = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const video = document.createElement('video')

    video.autoplay = true
    video.muted = true
    video.src = URL.createObjectURL(file)

    video.onloadeddata = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject('No canvas context')

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)

      video.pause()

      URL.revokeObjectURL(video.src)

      return resolve(canvas.toDataURL('image/png'))
    }
  })
}
