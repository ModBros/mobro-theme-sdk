import FormGroup from "mobro/containers/shared/form/FormGroup";
import IconButton from "mobro/containers/shared/button/IconButton";
import {empty, map} from "mobro/utils/helper";
import {getEditComponent} from "mobro/hooks/components-hooks";
import React from "react";
import {getEditDefaultValues} from "mobro/utils/component";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

function Repeat(props) {
    const {
        name,
        config,
        data,
        onChange,
        path
    } = props;

    if (empty(config.fields)) {
        return null;
    }

    return (
        <FormGroup label={name}>
            <DragDropContext onDragEnd={(event) => {
                const {source, destination} = event;

                if(!source || !destination) {
                    return;
                }

                const newData = [...data];
                newData[destination.index] = data[source.index];
                newData[source.index] = data[destination.index];

                onChange(newData);
            }}>
                <Droppable droppableId={`droppable_repeat_${path}`}>
                    {droppable => (
                        <div {...droppable.droppableProps} ref={droppable.innerRef}>
                            {map(data, (item, i) => {
                                return (
                                    <Draggable key={i} draggableId={`draggable_repeat_${path}_${i}`} index={i}>
                                        {provided => (
                                            <div className={"card mb-3"} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <div className={"card-body p-2"}>
                                                    {map(config.fields, (fieldConfig, fieldName) => {
                                                        const EditComponent = getEditComponent(fieldConfig.type);

                                                        if (!EditComponent) {
                                                            return null;
                                                        }

                                                        return (
                                                            <EditComponent
                                                                key={fieldName}
                                                                name={fieldName}
                                                                config={fieldConfig}
                                                                data={item?.[fieldName] ? item?.[fieldName] : null}
                                                                onChange={(value) => {
                                                                    // set new value on this item (reference)
                                                                    item[fieldName] = value;

                                                                    onChange(data);
                                                                }}
                                                            />
                                                        );
                                                    })}

                                                    <IconButton icon={"trash"} className={"w-100"} size={"sm"} onClick={() => {
                                                        data.splice(i, 1);
                                                        onChange(data);
                                                    }}>
                                                        Remove Item
                                                    </IconButton>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <IconButton icon={"plus"} className={"w-100"} onClick={() => {
                const defaultValues = getEditDefaultValues(config.fields);
                data.push(defaultValues);

                onChange(data);
            }}>
                Add Item
            </IconButton>
        </FormGroup>
    );
}

export default Repeat;