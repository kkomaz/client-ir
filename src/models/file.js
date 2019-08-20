import { Model } from 'radiks'

export default class File extends Model {
  static className = 'File'

  static schema = {
    blob_id: {
      type: String,
    }
  }
}
