import {registerPublicEndpoint} from "mobro/utils/public";

export const WORKING = "working";
registerPublicEndpoint("enum.workingStatus.WORKING", WORKING);

export const FAILED = "failed";
registerPublicEndpoint("enum.workingStatus.FAILED", FAILED);

export const FINISHED = "finished";
registerPublicEndpoint("enum.workingStatus.FINISHED", FINISHED);