const { ObjectId } = require("mongodb")
const account = require("../../modules/account")

/**
 * Get-user packet listener
 * @param {{ uid: import("mongoose").ObjectId, username: string }} accountInfo Account information
 * @param {{ id: import("mongoose").ObjectId | null, master: import("mongoose").ObjectId | null, synced: boolean | null, scene: import("mongoose").ObjectId | null }} sessionInfo Session information
 * @param {string} imageId
 * @param {() => {}} callback
*/
module.exports = async (accountInfo, sessionInfo, uid, callback) => {
    console.debug(`[ ${accountInfo.username} (${accountInfo.username}) ]`, "Package: get-user")
    try {
        // eslint-disable-next-line new-cap
        const accountData = await account.get(ObjectId(uid))
        callback(true, accountData)
    } catch (error) {
        console.error("Failed to get user", error)
        callback(false, error.message)
    }
}
