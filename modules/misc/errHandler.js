const handler = (res, err) => {
    res.json({
        success: false,
        msg: err.message
    });
    // Add Error Logging Code
}

module.exports = handler;