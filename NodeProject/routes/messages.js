const router = require("express").Router()
const Message = require("../models/Message")

router.post('/', async (req, res) => {
    const newMessage = new Message(req.body)
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:conversationId', async (req, res) => {
    try {
        const allmessages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(allmessages);

    }
    catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router;