import React, {useEffect, useRef, useState} from "react";
import ComponentsBar from "mobro/containers/edit/ComponentsBar";
import AddComponentButton from "mobro/containers/edit/AddComponentButton";
import SidebarContainer from "mobro/containers/edit/SidebarContainer";
import createCache from '@emotion/cache';
import memoizeOne from 'memoize-one';
import {NonceProvider} from "react-select";
import root from "react-shadow";
import editmodeStyles from "mobro/styles/editmode.inline.scss";
import bootstrapStyles from "mobro/styles/bootstrap.inline.scss";
import debounce from "debounce";
import EditmodeHeader from "mobro/containers/edit/EditmodeHeader";
import {getComponentsFromConfig} from "mobro/utils/component";
import {map} from "mobro/utils/helper";
import {getComponentRoots} from "mobro/hooks/components-hooks";

class EmotionProvider extends NonceProvider {
    createEmotionCacheCustom(nonce) {
        return createCache({nonce, key: 'editmode-shadow-root-style', container: this.props.container});
    }

    createEmotionCache = memoizeOne(this.createEmotionCacheCustom);
}

function EditmodeContent(props) {
    const {
        shadowRoot,
        layout,
        updateEditmode
    } = props;

    if (!shadowRoot) {
        // can only render editmode, if shadow root is already available
        // otherwise the container for adding emotion styles is not available which
        // breaks components working with emotion like the react-select
        return null;
    }

    const [headerHeight, setHeaderHeight] = useState(0);
    const header = useRef(null);
    const sidebar = useRef(null);

    useEffect(() => {
        const handleResize = debounce((event) => {
            updateEditmode({
                headerHeight: header.current?.clientHeight,
                sidebarWidth: sidebar.current?.clientWidth
            });

            setHeaderHeight(header.current?.clientHeight);
        });

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    });

    return (
        <EmotionProvider container={shadowRoot}>
            <div className={"editmode"}>
                <div className={"editmode-header text-white p-2 mb-3"} ref={header}>
                    <EditmodeHeader/>
                </div>

                {headerHeight !== 0 && (
                    <div className={"editmode-sidebar d-flex flex-column"} ref={sidebar}
                         style={{paddingTop: headerHeight}}>
                        {map(getComponentRoots(), (root) => {
                            const componentRoot = root ? layout[root] : layout;
                            const path = root ? `.${root}` : root;

                            return (
                                <div className={"mb-4 p-2"} key={root}>
                                    <h5 className={"mb-3 text-white"}>
                                        Your widgets {root ? `[${root}]` : ""}
                                    </h5>

                                    <ComponentsBar path={path} components={getComponentsFromConfig(componentRoot)}/>

                                    <AddComponentButton path={path}/>
                                </div>
                            );
                        })}
                    </div>
                )}

                <SidebarContainer/>
            </div>
        </EmotionProvider>
    );
}

function Editmode(props) {
    // useState instead of useRef, this way the EditmodeContent is rerendered if the shadow root changes and
    // thus becomes available after the first render :)
    const [shadowRoot, setShadowRoot] = useState(null);

    return (
        <root.div>
            <div ref={setShadowRoot}>
                <EditmodeContent {...props} shadowRoot={shadowRoot}/>

                <style type="text/css">
                    {bootstrapStyles}
                </style>

                <style type="text/css">
                    {editmodeStyles}
                </style>
            </div>
        </root.div>
    );
}

export default Editmode;