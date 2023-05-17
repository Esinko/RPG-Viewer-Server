/**
 * Some packet listener
 * @param {{ uid: import("mongoose").ObjectId, username: string }} accountInfo Account information
 * @param {{ id: import("mongoose").ObjectId | null, master: import("mongoose").ObjectId | null, synced: boolean | null, scene: import("mongoose").ObjectId | null }} sessionInfo Session information
 * @param {import("socket.io").Server} socketServer
*/
module.exports = async (accountInfo, sessionInfo, socketServer) => {

}
