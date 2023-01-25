import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');

export function signJwt(object: Object, options?: jwt.SignOptions ){

    return jwt.sign(object, ''.concat(privateKey), {
        ... (options && options), // only if options defined
        algorithm: 'RS256'
    })

}


export function verifyJwt(token: string){
    try {
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            expired: false,
            decoded: decoded
        }
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        }
    }
}

export type VerifyJwtVerifyObject = {
    valid: boolean,
    expired : boolean,
    decoded: object | null
}