const session = require("../../modules/session")
const { leave } = require("../../modules/session")

/**
 * leave-session packet listener
 * @param {{ uid: import("mongoose").ObjectId, username: string }} accountInfo Account information
 * @param {{ id: import("mongoose").ObjectId | null, master: boolean, synced: boolean | null, scene: import("mongoose").ObjectId | null }} sessionInfo Session information
 * @param {import("socket.io").Socket} socket
 * @param {import("socket.io").Server} socketServer
 * @param {() => {}} callback
*/
module.exports = async (accountInfo, sessionInfo, socket, socketServer, callback) => {
    console.debug(`[ ${accountInfo.username} (${accountInfo.username}) ]`, "Package: leave-session")
    try {
        await leave(socket, sessionInfo.id, accountInfo.username)
        if (sessionInfo.master) {
            await session.sync(sessionInfo.id, false)
            await session.set(sessionInfo.id, undefined)
            socketServer.to(sessionInfo.id.toString()).emit("change-state", false, "")
        }

        // eslint-disable-next-line no-underscore-dangle
        sessionInfo.id = null
        // TODO: Perhaps change this to isMaster?
        sessionInfo.master = null
        sessionInfo.masterId = null // TODO: Type missing
        sessionInfo.synced = null
        sessionInfo.scene = null
        sessionInfo.users = null // TODO: Type missing
        sessionInfo.background = null // TODO: Type missing

        console.log(`The user ${accountInfo.username} (${accountInfo.uid}) left a session (${sessionInfo.id})`)
        callback(true)
    } catch (error) {
        console.error("Failed to leave session", error)
        callback(error.message)
    }
}
