const request = require('request-promise-native')
const BASE_API = 'https://api.line.me/v2/bot'

const getOption = ({ method = 'POST', api, accessToken, body = {} } = {}) => ({
    method: `${method}`,
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    uri: `${BASE_API}/${api}`,
    body,
    json: true
})

class LineMessager {
    constructor(accessToken) {
        this.accessToken = accessToken
    }

    async replyMessage(replyToken, messages) {
        messages = Array.isArray(messages) ? messages : [messages]
        let option = getOption({
            api: 'message/reply',
            accessToken: this.accessToken,
            body: { replyToken, messages }
        })
        return request(option)
    }

    async pushMessage(to, messages) {
        messages = Array.isArray(messages) ? messages : [messages]
        let option = getOption({
            api: 'message/push',
            accessToken: this.accessToken,
            body: { to, messages }
        })
        return request(option)
    }

    async multicast(to, messages) {
        messages = Array.isArray(messages) ? messages : [messages]
        let option = getOption({
            api: 'message/multicast',
            accessToken: this.accessToken,
            body: { to, messages }
        })
        return request(option)
    }

    async getContent(messageId) {
        let option = getOption({
            method: 'GET',
            api: `message/${messageId}/content`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    async getProfile(userId) {
        let option = getOption({
            method: 'GET',
            api: `profile/${userId}`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    async getGroupMemberIDs(groupID) {
        let option = getOption({
            method: 'GET',
            api: `group/${groupID}/members/ids`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    async getGroupMemberProfile(groupID, userID) {
        let option = getOption({
            method: 'GET',
            api: `group/${groupID}/member/${userID}`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    async leaveGroup(groupID) {
        let option = getOption({
            api: `group/${groupID}/leave`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    async getRoomMemberIDs(roomID, start = '') {
        let api = start ? `room/${roomID}/members/ids` : `room/${roomID}/members/ids?start=${start}`
        let option = getOption({
            method: 'GET',
            api,
            accessToken: this.accessToken
        })
        return request(option)
    }

    async getRoomMemberProfile(roomID, userID) {
        let option = getOption({
            method: 'GET',
            api: `room/${roomID}/member/${userID}`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    async leaveRoom(roomID) {
        let option = getOption({
            api: `room/${roomID}/leave`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    async getRichMenu(richMenuID) {
        let option = getOption({
            method: 'GET',
            api: `richmenu/${richMenuID}`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    async createRichMenu(body) {
        let option = getOption({
            method: 'POST',
            api: `richmenu`,
            accessToken: this.accessToken,
            body
        })
        return request(option)
    }

    async deleteRichMenu(richMenuID) {
        let option = getOption({
            method: 'DELETE',
            api: `richmenu/${richMenuID}`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    async getRichMenuID(userID) {
        let option = getOption({
            method: 'GET',
            api: `user/${userID}/richmenu`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    async linkRichMenu(userID, richMenuID) {
        let option = getOption({
            api: `user/${userID}/richmenu/${richMenuID}`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    async unlinkRichMenu(userID) {
        let option = getOption({
            method: 'DELETE',
            api: `user/${userID}/richmenu`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    async downloadRichMenuImg(richMenuID) {
        let option = getOption({
            method: 'GET',
            api: `richmenu/${richMenuID}/content`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    // TODO
    // async uploadRichMenuImg(){}

    async getRichMenuList() {
        let option = getOption({
            method: 'GET',
            api: `richmenu/list`,
            accessToken: this.accessToken
        })
        return request(option)
    }
}

const builder = ({ accessToken }) => {
    if (!accessToken || typeof accessToken !== 'string') {
        throw new TypeError(`accessToken should be typeof string.`)
    }

    return new LineMessager(accessToken)
}

module.exports = builder