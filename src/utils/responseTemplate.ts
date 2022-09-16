const ResponseTemplate = (status: number, res: any, data: any, success: Boolean) => {
    let responseJson = {
        success: false,
        data: {}
    };

    if (success) {
        responseJson.success = true;
        responseJson.data = data;
    } else {
        responseJson.success = false;
        responseJson.data = data;
    }

    return res.status(status).json(responseJson)
}

export default ResponseTemplate