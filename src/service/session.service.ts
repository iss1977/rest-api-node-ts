import { FilterQuery } from "mongoose";
import SessionModel from "../models/session.model";
import type { SessionDocument } from '../models/session.model';

export async function createSession (userId: string, userAgent: string)  {
    const session = await SessionModel.create({
        user: userId,
        userAgent,
    })
    return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>){
    return SessionModel.find(query).lean();
}