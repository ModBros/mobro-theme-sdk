import React, {Fragment, useEffect} from 'react'
import {failed, fetched, notAskedYet, send} from 'mobro/utils/communication'
import LoadingIndicator from 'mobro/containers/shared/LoadingIndicator'
import AlignCenter from 'mobro/containers/shared/layout/AlignCenter'
import {extractSize} from 'mobro/utils/component'
import {getSocket, hasEditmodeParam} from 'mobro/utils/socket'
import {LAYOUT_MODE_DISPLAY, LAYOUT_MODE_EDIT} from 'mobro/enum/layout'
import {isEditMode} from 'mobro/utils/layout'
import Editmode from 'mobro/containers/edit/Editmode'
import AppContainer from 'mobro/containers/AppContainer'
import {GET_RESOLUTION, UPDATE_RESOLUTION} from 'mobro/enum/endpoints'
import debounce from 'debounce'

function App(props) {
    const {
        layoutFetchingState,
        fetchLayout,
        setLayoutMode,
        settingsFetchingState,
        fetchSettings,
        config,
        layoutMode,
        editmode
    } = props

    useEffect(() => {
        setLayoutMode(hasEditmodeParam() ? LAYOUT_MODE_EDIT : LAYOUT_MODE_DISPLAY)

        const handler = debounce(() => {
            if (!isEditMode(layoutMode)) {
                send(UPDATE_RESOLUTION, {
                    force: false,
                    width: window.innerWidth,
                    height: window.innerHeight
                })
            }
        }, 500)

        handler()

        window.addEventListener('resize', handler)

        getSocket().on('get:resolution', () => {
            send(UPDATE_RESOLUTION, {
                force: true,
                width: window.innerWidth,
                height: window.innerHeight
            })
        })

        return () => {
            window.removeEventListener('resize', handler)
        }
    }, [])

    if (notAskedYet(layoutFetchingState)) {
        fetchLayout()
    }

    if (notAskedYet(settingsFetchingState)) {
        fetchSettings()
    }

    if (failed(layoutFetchingState) || failed(settingsFetchingState)) {
        return (
            <AlignCenter>
                <div className="alert alert-danger">
                    Oh boy, something went wrong while fetching the layout definintion :/
                </div>
            </AlignCenter>
        )
    }

    if (!fetched(layoutFetchingState) || !fetched(settingsFetchingState)) {
        return (
            <AlignCenter>
                <LoadingIndicator/>
            </AlignCenter>
        )
    }

    let styles = {}

    if (editmode && editmode.headerHeight && editmode.sidebarWidth) {
        styles = {
            marginTop: editmode.headerHeight,
            maxWidth: window.innerWidth - editmode.sidebarWidth
        }
    }

    let content = (
        <div
            className={`d-flex w-100 align-items-center justify-content-center ${isEditMode(layoutMode) ? 'editmode-container' : ''}`}
            style={styles}>
            <AppContainer style={extractSize(config)}/>
        </div>
    )

    if (isEditMode(layoutMode)) {
        content = (
            <Fragment>
                <Editmode/>

                {content}
            </Fragment>
        )
    }

    return content
}

export default App