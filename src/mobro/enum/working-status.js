import {registerPublicEndpoint} from "mobro/utils/public";

export const WORKING = "working";
registerPublicEndpoint("enum.working-status.WORKING", WORKING);

export const FAILED = "failed";
registerPublicEndpoint("enum.working-status.FAILED", FAILED);

export const FINISHED = "finished";
registerPublicEndpoint("enum.working-status.FINISHED", FINISHED);