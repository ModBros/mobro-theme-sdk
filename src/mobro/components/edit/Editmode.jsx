import React, {useRef, useEffect, useState} from "react";
import ComponentsBar from "mobro/containers/edit/ComponentsBar";
import AddComponentButton from "mobro/containers/edit/AddComponentButton";
import TriggerGlobalConfigButton from "mobro/containers/edit/TriggerGlobalConfigButton";
import SidebarContainer from "mobro/containers/edit/SidebarContainer";
import createCache from '@emotion/cache';
import memoizeOne from 'memoize-one';
import {NonceProvider} from "react-select";
import root from "react-shadow";
import editmodeStyles from "mobro/styles/editmode.inline.scss";
import bootstrapStyles from "mobro/styles/bootstrap.inline.scss";
import debounce from "debounce";

class EmotionProvider extends NonceProvider {
    createEmotionCacheCustom(nonce) {
        return createCache({nonce, key: 'editmode-shadow-root-style', container: this.props.container});
    }

    createEmotionCache = memoizeOne(this.createEmotionCacheCustom);
}

function EditmodeContent(props) {
    const {
        shadowRoot,
        components,
        updateEditmode
    } = props;

    if(!shadowRoot.current) {
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

    console.log(headerHeight);

    return (
        <EmotionProvider container={shadowRoot.current}>
            <div className={"editmode"}>
                <div className={"editmode-header text-white p-2 mb-3 d-flex align-items-center"} ref={header}>
                    <small className={"flex-fill"}>
                        MoBro Theme Explorer
                    </small>

                    <small>
                        <TriggerGlobalConfigButton/>
                    </small>
                </div>

                <div className={"editmode-sidebar d-flex flex-column"} ref={sidebar} style={{paddingTop: headerHeight}}>
                    <div className={"flex-fill editmode-sidebar-body"}>
                        <ComponentsBar components={components}/>
                    </div>

                    <div className={"editmode-sidebar-footer card-footer"}>
                        <AddComponentButton/>
                    </div>
                </div>

                <SidebarContainer/>
            </div>
        </EmotionProvider>
    );
}

function Editmode(props) {
    const shadowRoot = useRef(null);

    return (
        <root.div>
            <div ref={shadowRoot}>
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