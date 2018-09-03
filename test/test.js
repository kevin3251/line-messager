const CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN
const messager = require('../index.js')({
    accessToken: CHANNEL_ACCESS_TOKEN
})

const fs = require('fs')
const request = require('request-promise-native')
const assert = require('assert')
const UID = process.env.LINE_UID
const toLineText = (text) => ({ type: 'text', text })

describe('Line-messager', () => {
    describe('pushMessage', () => {
        it('should return {}', (done) => {
            messager
                .pushMessage(UID, toLineText('hello world'))
                .then(response => {
                    assert.deepEqual(response, {})
                    done()
                })
        })
    })
})

describe('Line-messager', () => {
    describe('multicast', () => {
        it('should return {}', (done) => {
            let users = [UID, UID]
            messager
                .multicast(users, toLineText('hello world'))
                .then(response => {
                    assert.deepEqual(response, {})
                    done()
                })
        })
    })
})


describe('Line-messager', () => {
    describe('getProfile', () => {
        it('should return object', (done) => {
            messager
                .getProfile(UID)
                .then(response => {
                    assert.ok(response)
                    done()
                })
        })
    })
})

// describe('Line-messager', () => {
//     describe('getGroupMemberIDs', () => {
//         it('should return object', (done) => {
//             messager
//                 .getGroupMemberIDs("Cdc97433805fd2e3f8fe07977859c66b1")
//                 .then(response => {
//                     assert.ok(response)
//                     done()
//                 })
//         })
//     })
// })

describe('Line-messager', () => {
    describe('getGroupMemberProfile', () => {
        it('should return object', (done) => {
            messager
                .getGroupMemberProfile("Cdc97433805fd2e3f8fe07977859c66b1", UID)
                .then(response => {
                    assert.ok(response)
                    done()
                })
        })
    })
})


// describe('Line-messager', () => {
//     describe('leaveGroup', () => {
//         it('should return {}', (done) => {
//             messager
//                 .leaveGroup("Cdc97433805fd2e3f8fe07977859c66b1")
//                 .then(response => {
//                     assert.ok(response)
//                     done()
//                 })
//         })
//     })
// })


let richMenuId
describe('Line-messager', () => {
    describe('createRichMenu', () => {
        it('should return object', (done) => {
            messager
                .createRichMenu({
                    "size": {
                        "width": 2500,
                        "height": 1686
                    },
                    "selected": false,
                    "name": "Nice richmenu",
                    "chatBarText": "Tap here",
                    "areas": [
                        {
                            "bounds": {
                                "x": 0,
                                "y": 0,
                                "width": 2500,
                                "height": 1686
                            },
                            "action": {
                                "type": "postback",
                                "data": "action=buy&itemid=123"
                            }
                        }
                    ]
                })
                .then(response => {
                    richMenuId = response.richMenuId
                    assert.ok(response)
                    done()
                })
        })
    })
})


describe('Line-messager', () => {
    describe('uploadRichMenuImage', () => {
        it('should return {}', (done) => {
            let imageStream = fs.createReadStream('./test/image.jpg')
            messager
                .uploadRichMenuImg(richMenuId, imageStream)
                .then(response => {
                    assert.ok(response)
                    done()
                })
        })
    })
})


describe('Line-messager', () => {
    describe('getRichMenu', () => {
        it('should return object', (done) => {
            messager
                .getRichMenu(richMenuId)
                .then(response => {
                    assert.ok(response)
                    done()
                })
        })
    })
})

describe('Line-messager', () => {
    describe('linkRichMenu', () => {
        it('should return {}', (done) => {
            messager
                .linkRichMenu(UID, richMenuId)
                .then(response => {
                    assert.ok(response)
                    done()
                })
        })
    })
})

describe('Line-messager', () => {
    describe('getRichMenuIDOfUser', () => {
        it('should return object', (done) => {
            messager
                .getRichMenuID(UID)
                .then(response => {
                    assert.ok(response)
                    done()
                })
        })
    })
})

describe('Line-messager', () => {
    describe('unlinkRichMenu', () => {
        it('should return {}', (done) => {
            messager
                .unlinkRichMenu(UID)
                .then(response => {
                    assert.ok(response)
                    done()
                })
        })
    })
})

describe('Line-messager', () => {
    describe('downloadRichMenuImage', () => {
        it('should return file', (done) => {
            messager
                .downloadRichMenuImg(richMenuId)
                .then(response => {
                    console.log(response)
                    assert.ok(response)
                    done()
                })
        })
    })
})

describe('Line-messager', () => {
    describe('getRichMenuList', () => {
        it('should return object', (done) => {
            messager
                .getRichMenuList()
                .then(response => {
                    assert.ok(response)
                    done()
                })
        })
    })
})

describe('Line-messager', () => {
    describe('deleteRichMenu', () => {
        it('should return {}', (done) => {
            messager
                .deleteRichMenu(richMenuId)
                .then(response => {
                    assert.ok(response)
                    done()
                })
        })
    })
})
