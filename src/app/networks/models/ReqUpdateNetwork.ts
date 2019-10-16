import {IReqCreateNetwork} from "./ReqCreateNetwork";

export interface IReqUpdateNetwork extends IReqCreateNetwork{
    networkId: string;
}
