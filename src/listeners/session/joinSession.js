const { ObjectId } = require("mongodb")
const { join } = require("../../modules/session")

/**
 * Join-session packet listener
 * @param {{ uid: import("mongoose").ObjectId, username: string }} accountInfo Account information
 * @param {{ id: import("mongoose").ObjectId | null, master: import("mongoose").ObjectId | null, synced: boolean | null, scene: import("mongoose").ObjectId | null }} sessionInfo Session information
 * @param {import("socket.io").Socket} socket
 * @param {string} sessionId
 * @param {() => {}} callback
*/
module.exports = async (accountInfo, sessionInfo, socket, sessionId, callback) => {
    console.debug(`[ ${accountInfo.username} (${accountInfo.username}) ]`, "Package: join-session")
    try {
        // eslint-disable-next-line new-cap
        const res = await join(ObjectId(sessionId), socket, accountInfo.username)

        // eslint-disable-next-line no-underscore-dangle
        sessionInfo.id = res._id
        // TODO: Perhaps change this to isMaster?
        sessionInfo.master = res.master.equals(accountInfo.uid)
        sessionInfo.masterId = res.master // TODO: Type missing
        sessionInfo.synced = res.state.synced
        sessionInfo.scene = res.state.scene
        sessionInfo.users = res.users // TODO: Type missing
        sessionInfo.background = res.background // TODO: Type missing

        console.log(`The user ${accountInfo.username} (${accountInfo.uid}) joined a session (${sessionInfo.id})`)
        callback(true)
    } catch (error) {
        console.error("Failed to join session", error)
        callback(error.message)
    }
}
