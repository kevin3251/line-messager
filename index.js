const request = require('request-promise-native')
const { Readable } = require('stream')
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
        this.replyMessage = this.replyMessage
        this.pushMessage = this.pushMessage
        this.multicast = this.multicast
        this.getContent = this.getContent
        this.getProfile = this.getProfile
        this.getGroupMemberIDs = this.getGroupMemberIDs
        this.getGroupMemberProfile = this.getGroupMemberProfile
        this.leaveGroup = this.leaveGroup
        this.getRoomMemberIDs = this.getGroupMemberIDs
        this.getRoomMemberProfile = this.getRoomMemberProfile
        this.leaveRoom = this.leaveRoom
        this.getRichMenu = this.getRichMenu
        this.createRichMenu = this.createRichMenu
        this.deleteRichMenu = this.deleteRichMenu
        this.getRichMenuID = this.getRichMenuID
        this.linkRichMenu = this.linkRichMenu
        this.unlinkRichMenu = this.unlinkRichMenu
        this.downloadRichMenuImg = this.downloadRichMenuImg
        this.uploadRichMenuImg = this.uploadRichMenuImg
        this.getRichMenuList = this.getRichMenuList
    }

    replyMessage(replyToken, messages) {
        messages = Array.isArray(messages) ? messages : [messages]
        let option = getOption({
            api: 'message/reply',
            accessToken: this.accessToken,
            body: { replyToken, messages }
        })
        return request(option)
    }

    pushMessage(to, messages) {
        messages = Array.isArray(messages) ? messages : [messages]
        let option = getOption({
            api: 'message/push',
            accessToken: this.accessToken,
            body: { to, messages }
        })
        return request(option)
    }

    multicast(to, messages) {
        to = Array.isArray(to) ? to : [to]
        messages = Array.isArray(messages) ? messages : [messages]
        let option = getOption({
            api: 'message/multicast',
            accessToken: this.accessToken,
            body: { to, messages }
        })
        return request(option)
    }

    getContent(messageId) {
        let option = getOption({
            method: 'GET',
            api: `message/${messageId}/content`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    getProfile(userId) {
        let option = getOption({
            method: 'GET',
            api: `profile/${userId}`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    getGroupMemberIDs(groupID) {
        let option = getOption({
            method: 'GET',
            api: `group/${groupID}/members/ids`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    getGroupMemberProfile(groupID, userID) {
        let option = getOption({
            method: 'GET',
            api: `group/${groupID}/member/${userID}`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    leaveGroup(groupID) {
        let option = getOption({
            api: `group/${groupID}/leave`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    getRoomMemberIDs(roomID, start = '') {
        let api = start ? `room/${roomID}/members/ids` : `room/${roomID}/members/ids?start=${start}`
        let option = getOption({
            method: 'GET',
            api,
            accessToken: this.accessToken
        })
        return request(option)
    }

    getRoomMemberProfile(roomID, userID) {
        let option = getOption({
            method: 'GET',
            api: `room/${roomID}/member/${userID}`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    leaveRoom(roomID) {
        let option = getOption({
            api: `room/${roomID}/leave`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    getRichMenu(richMenuID) {
        let option = getOption({
            method: 'GET',
            api: `richmenu/${richMenuID}`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    createRichMenu(body) {
        let option = getOption({
            method: 'POST',
            api: `richmenu`,
            accessToken: this.accessToken,
            body
        })
        return request(option)
    }

    deleteRichMenu(richMenuID) {
        let option = getOption({
            method: 'DELETE',
            api: `richmenu/${richMenuID}`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    getRichMenuID(userID) {
        let option = getOption({
            method: 'GET',
            api: `user/${userID}/richmenu`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    linkRichMenu(userID, richMenuID) {
        let option = getOption({
            api: `user/${userID}/richmenu/${richMenuID}`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    unlinkRichMenu(userID) {
        let option = getOption({
            method: 'DELETE',
            api: `user/${userID}/richmenu`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    downloadRichMenuImg(richMenuID) {
        let option = getOption({
            method: 'GET',
            api: `richmenu/${richMenuID}/content`,
            accessToken: this.accessToken
        })
        return request(option)
    }

    uploadRichMenuImg(richMenuId, image, contentType = 'image/jpeg') {
        if (!(Buffer.isBuffer(image) || image instanceof Readable)) {
            throw new TypeError('image should be typeof buffer or readable stream')
        }
        let api = `richmenu/${richMenuId}/content`
        let option = {
            method: `POST`,
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
                'Content-Type': contentType
            },
            uri: `${BASE_API}/${api}`,
            body: image
        }


        if (Buffer.isBuffer(image)) {
            option.headers['Content-Length'] = image.byteLength
            return request(option)
        }

        if (image instanceof Readable) {
            let size = 0
            image.on('data', chunk => {
                size += chunk.byteLength
            })

            return new Promise(resolve => {
                image.on('end', async () => {
                    option.headers['Content-Length'] = size
                    resolve(await request(option))
                })
            })
        }
    }

    getRichMenuList() {
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