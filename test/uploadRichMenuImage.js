const CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN
const messager = require('../index.js')({
    accessToken: CHANNEL_ACCESS_TOKEN
})

const fs = require('fs')
const test = async () => {
    let { richMenuId } = await messager
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


    console.log(richMenuId)
    let image = fs.readFileSync('./test/image.jpg')
    console.log(image)
    let response = await messager.uploadRichMenuImg(richMenuId, image)
    console.log(response)
}

test()