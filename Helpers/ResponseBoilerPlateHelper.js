
export default function response(res, message, success, payload){
    
    return res.json({
        message: message,
        success: success,
        payload: `${payload ? payload : null}`
    });
}