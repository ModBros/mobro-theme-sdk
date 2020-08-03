import {registerPublicEndpoint} from "mobro/utils/public";
import {appendToObjectProperty} from "mobro/utils/object";

export function createEventHook(hooks, Event) {
    return (name, base = null) => {
        return (...args) => {
            const event = new Event(...args);
            const hooksToApply = hooks[name];

            if (base) {
                base(event);
            }

            if (Array.isArray(hooksToApply)) {
                hooksToApply.forEach(hook => {
                    hook(event);
                });
            }

            return event.getData();
        }
    }
}

export function createSingleEventHook(hooks, Event) {
    return (base = null) => {
        return (...args) => {
            const event = new Event(...args);

            if (base) {
                base(event);
            }

            if (Array.isArray(hooks)) {
                hooks.forEach(hook => {
                    hook(event);
                });
            }

            return event.getData();
        }
    }
}

export function createPublicEventHook(endpoint, Event) {
    return createPublicHook(endpoint, hooks => createEventHook(hooks, Event));
}

export function createPublicHook(endpoint, publicHook) {
    const hooks = {};

    registerPublicEndpoint(endpoint, (name, hook) => {
        appendToObjectProperty(hooks, name, hook);
    });

    return publicHook(hooks);
}

export function createPublicSingleEventHook(endpoint, Event) {
    const hooks = [];

    registerPublicEndpoint(endpoint, (hook) => {
        hooks.push(hook);
    });

    return createSingleEventHook(hooks, Event);
}
