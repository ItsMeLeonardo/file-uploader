import axios from 'axios'

const BASE_URL = 'https://file-upload-app.azurewebsites.net/uploads'

export const saveFile = async (file, callback) => {
  const response = await axios.post(BASE_URL, file, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      )
      callback(percentCompleted)
    },
  })

  return response.data
}
