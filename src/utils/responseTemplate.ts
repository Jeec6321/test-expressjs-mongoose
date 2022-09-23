export const Codes = {
    VALIDATOR_ERROR: 0,
    WHATSAPP_EXISTS: 1,
    EMAIL_EXISTS: 2,
    SUSCRIBE_NOT_FOUND: 3,
    STATION_NOT_FOUND: 4,
    PARAM_IMEI_ERROR: 5,
    LAST_MEASURE_ERROR: 6
}

export const ErrorTemplate = (error_type: number, data: any) => {
    return {
        error_type: error_type,
        data: data
    }
}

export const ResponseTemplate = (status: number, res: any, data: any, success: Boolean) => {
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