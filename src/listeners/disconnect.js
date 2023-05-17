const session = require("../modules/session")

/**
 * Disconnect packet listener
 * @param {{ uid: import("mongoose").ObjectId, username: string }} accountInfo Account information
 * @param {{ id: import("mongoose").ObjectId | null, master: import("mongoose").ObjectId | null, synced: boolean | null, scene: import("mongoose").ObjectId | null }} sessionInfo Session information
 * @param {import("socket.io").Server} socketServer
 */
module.exports = async (accountInfo, sessionInfo, socketServer) => {
    console.debug(`[ ${accountInfo.username} (${accountInfo.username}) ]`, "Package: disconnect")
    try {
        if (!sessionInfo.id || !sessionInfo.master) throw new Error("Invalid session")
        await session.sync(sessionInfo.id)
        await session.set(sessionInfo.id, undefined)
        socketServer.to(sessionInfo.id.toString()).emit("change-state", false, "")
        console.log(`${accountInfo.username} (${accountInfo.username}) disconnected.`)
    } catch (error) {
        console.error("Failed to disconnect a session", error)
    }
}
