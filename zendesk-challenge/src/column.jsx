import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 220px;
    display: flex;
    flex-direction: column;
    min-width: 165px;
`;
const Title = styled.div`
    padding: 8px; 
`;
const TaskList = styled.div`
    padding: 8px;
    flex-grow: 1;
    min-height: 100px;
`;
const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
const CountContainer = styled.div`
    padding: 8px;
`;

export default class Column extends React.Component {
    render() {
        return (
            <Container>
                <HeaderContainer>
                    <Title>
                        {this.props.column.title}
                    </Title>
                    <CountContainer>
                        {this.props.column.numTasks} Projects
                    </CountContainer>
                </HeaderContainer>
                <Droppable droppableId={this.props.column.id}>
                    {(provided) => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        )
    }
}