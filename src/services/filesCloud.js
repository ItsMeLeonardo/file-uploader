import axios from 'axios'
import debounce from 'debounce-promise'
const BASE_URL = 'https://file-upload-app.azurewebsites.net/files'

/**
 * @param {FormData} file - File to upload
 * @param {function} callback - Callback function with the load percentage as a param
 * @returns {Promise} - id of file uploaded
 */
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

export const getFiles = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

export const getFilesDebounced = debounce(getFiles, 1000)

export const deleteFile = async ({ id }) => {
  const response = await axios.put(`${BASE_URL}/${id}`)
  return response.data
}

export const deleteAll = async () => {
  const response = await axios.delete(`${BASE_URL}/clear`)
  return response.data
}

/*export const cancelUpload = async () => {
  const response = await axios.delete(`${BASE_URL}/cancel`)
  return response.data
}*/
