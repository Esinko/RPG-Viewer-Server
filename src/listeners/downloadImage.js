const { ObjectId } = require("mongodb")
const networking = require("../modules/networking")

/**
 * Download-image packet listener
 * @param {{ uid: import("mongoose").ObjectId, username: string }} accountInfo Account information
 * @param {{ id: import("mongoose").ObjectId | null, master: import("mongoose").ObjectId | null, synced: boolean | null, scene: import("mongoose").ObjectId | null }} sessionInfo Session information
 * @param {string} imageId
 * @param {() => {}} callback
*/
module.exports = async (accountInfo, sessionInfo, imageId, callback) => {
    console.debug(`[ ${accountInfo.username} (${accountInfo.username}) ]`, "Package: download-image")
    try {
        // eslint-disable-next-line new-cap
        const buffer = await networking.downloadFile(ObjectId(imageId))
        console.debug(`[ ${accountInfo.username} (${accountInfo.username}) ]`, `Asset load: ${imageId}, size: ${buffer.size}`)
        callback(true, buffer)
    } catch (error) {
        console.error("Failed to download and send an image", error)
        callback(false, error.message)
    }
}
