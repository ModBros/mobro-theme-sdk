import {createPublicHook} from "mobro/utils/hooks";

export const withWrapper = createPublicHook("hooks.component", hooks => (componentId, WrappedComponent) => {
    return props => {
        let HOCs = hooks[componentId];
        let Component = WrappedComponent

        if (HOCs) {
            HOCs.forEach(HOC => {
                Component = HOC(Component);
            });
        }

        return (<Component {...props}/>)
    }
})