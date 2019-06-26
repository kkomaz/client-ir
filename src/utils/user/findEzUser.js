import EzUser from 'models/ezUser'

const findEzUser = async (username) => {
  const result = await EzUser.findOne({ _id: username })
  return result
}

export default findEzUser
