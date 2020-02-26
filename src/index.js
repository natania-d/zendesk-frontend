import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import data from './data';
import Column from './column';
// import './index.css';

const Container = styled.div`
    margin: 30px;
`;
const Header = styled.div`
    display: flex;
    justify-content: space-between;
`;
const TaskInput = styled.div`
    display: flex;
    margin: 8px;
`;
const TaskInputText = styled.h5``;
const TaskInputField = styled.input`
    margin-left: 8px;
`;
const ColumnContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
const CountContainer = styled.div`
    margin: 8px;
`;

class App extends React.Component {
    state = data;

    onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        
        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        // Same column
        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                },
            };

            this.setState(newState);

            return;
        }

        // Different column
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
            numTasks: start.numTasks - 1,
        }
        
        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
            numTasks: finish.numTasks + 1,
        };
        
        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        this.setState(newState);
    };

    onChange = event => {
        this.setState({ addedProject: event.target.value });
    }

    onEnter = () => {
        const newTask = {
            id: 'task-' + (this.state.taskCounter + 1),
            content: this.state.addedProject
        }
        
        const todoColumn = this.state.columns['column-1'];
        const newTaskIds = Array.from(todoColumn.taskIds);
        newTaskIds.push(newTask.id);

        const newColumn = {
            ...todoColumn,
            taskIds: newTaskIds,
            numTasks: todoColumn.numTasks + 1,
        };
        
        const newState = {
            ...this.state,
            tasks: {
                ...this.state.tasks,
                [newTask.id]: newTask,
            },
            columns: {
                ...this.state.columns,
                [newColumn.id]: newColumn,
            },
            numberOfTasks: this.state.numberOfTasks + 1,
            addedProject: '',
            taskCounter: this.state.taskCounter + 1,
        };

        this.setState(newState);

    }

    onKeyPress = event => {
        if (event.charCode === 13) {
            this.onEnter();
        }
        return;
    }

    render() {
        return (
            <Container>
                <Header>
                    <TaskInput>
                        <TaskInputText>Add Project:</TaskInputText>
                        <TaskInputField 
                            type="text" 
                            value={this.state.addedProject}
                            onKeyPress={this.onKeyPress} 
                            onChange={this.onChange}
                        />
                    </TaskInput>
                    <CountContainer>
                        {this.state.numberOfTasks} Projects
                    </CountContainer>
                </Header>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <ColumnContainer>
                        {this.state.columnOrder.map(columnId => {
                            const column = this.state.columns[columnId];
                            const tasks = column.taskIds.map( taskId => this.state.tasks[taskId]);

                            return <Column key={column.id} column={column} tasks={tasks} />;
                        })}
                    </ColumnContainer>
                </DragDropContext>
            </Container>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));